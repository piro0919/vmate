"use client";
import { SkyWayStreamFactory } from "@skyway-sdk/core";
import {
  LocalAudioStream,
  LocalVideoStream,
  RemoteVideoStream,
  RoomPublication,
  SfuRoom,
  SfuRoomInit,
  SkyWayContext,
  SkyWayRoom,
} from "@skyway-sdk/room";
import { useEffect, useRef, useState } from "react";

interface TokenResponse {
  token: string;
}

function isTokenResponse(data: unknown): data is TokenResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "token" in data &&
    typeof (data as TokenResponse).token === "string"
  );
}

function LiveStream(): JSX.Element {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contextRef = useRef<SkyWayContext | null>(null);
  const roomRef = useRef<SfuRoom | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    let localVideo: LocalVideoStream | null = null;
    let localAudio: LocalAudioStream | null = null;

    async function initSkyWay(): Promise<void> {
      if (typeof window === "undefined") return;

      try {
        setIsLoading(true);

        const response = await fetch("/api/skyway-token");

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const data = await response.json();

        if (!isTokenResponse(data)) {
          throw new Error("Invalid token response");
        }

        const { token } = data;
        const context = await SkyWayContext.Create(token);

        contextRef.current = context;

        context.onTokenUpdateReminder.add(() => {
          void context.updateAuthToken(token);
        });

        const roomInit: SfuRoomInit = {
          name: `room-${Date.now()}`,
          type: "sfu",
        };
        const room = await SkyWayRoom.FindOrCreate(context, roomInit);

        if (room) {
          roomRef.current = room;
        } else {
          throw new Error("Room not found or created.");
        }

        const { audio, video } =
          await SkyWayStreamFactory.createMicrophoneAudioAndCameraStream();
        const sfuMember = await room.join();

        localAudio = audio;
        localVideo = video;

        if (localVideo) await sfuMember.publish(localVideo);
        if (localAudio) await sfuMember.publish(localAudio);

        const checkVideoRef = (): void => {
          if (videoRef.current instanceof HTMLVideoElement) {
            localVideo?.attach(videoRef.current);
            void videoRef.current.play();
          } else {
            animationFrameIdRef.current = requestAnimationFrame(checkVideoRef);
          }
        };

        animationFrameIdRef.current = requestAnimationFrame(checkVideoRef);

        // remote stream subscription
        room.onStreamPublished.add(
          async (e: { publication: RoomPublication }) => {
            const { publication } = e;

            if (publication.contentType === "video") {
              try {
                const remoteStream =
                  await sfuMember.subscribe<RemoteVideoStream>(publication.id);

                if (remoteStream && videoRef.current) {
                  const mediaStream = new MediaStream([
                    remoteStream.stream.track,
                  ]);

                  videoRef.current.srcObject = mediaStream;
                  void videoRef.current.play();
                }
              } catch (subscribeErr) {
                console.error(
                  "Failed to subscribe to remote stream:",
                  subscribeErr,
                );
              }
            }
          },
        );

        setIsLoading(false);
      } catch (err) {
        console.error("SkyWay initialization error:", err);
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        setError(`ビデオストリームの初期化に失敗しました ${err}`);
        setIsLoading(false);
      }
    }

    void initSkyWay();

    const cleanupVideo = videoRef.current;

    return (): void => {
      if (cleanupVideo) {
        cleanupVideo.srcObject = null;
        localVideo?.detach();
        cleanupVideo.pause();
      }

      if (localVideo) {
        localVideo.track.enabled = false;
        localVideo.track.stop();
        localVideo.detach();
      }

      if (localAudio) {
        localAudio.track.enabled = false;
        localAudio.track.stop();
      }

      try {
        if (roomRef.current) {
          const member = roomRef.current.members.find(
            (m) => m.name === roomRef.current?.name,
          );

          if (member) {
            void member.leave();
          }

          void roomRef.current.dispose();
        }
      } catch (err) {
        console.error("Failed to cleanup room:", err);
      }

      try {
        if (contextRef.current) {
          contextRef.current.dispose();
        }
      } catch (err) {
        console.error("Failed to dispose context:", err);
      }

      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  if (error) {
    return (
      <div>
        <video
          autoPlay={true}
          muted={true}
          playsInline={true}
          ref={videoRef}
          style={{ height: 300, width: 600 }}
        />
        {error}
      </div>
    );
  }

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <video
        autoPlay={true}
        height={300}
        muted={true}
        playsInline={true}
        ref={videoRef}
        width={400}
      />
    </div>
  );
}

export default LiveStream;
