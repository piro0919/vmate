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

        // トークンの取得とコンテキストの初期化
        const response = await fetch("/api/skyway-token");

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        function isTokenResponse(data: unknown): data is TokenResponse {
          return (
            typeof data === "object" &&
            data !== null &&
            "token" in data &&
            typeof (data as TokenResponse).token === "string"
          );
        }

        const data = await response.json();

        if (!isTokenResponse(data)) {
          throw new Error("Invalid token response");
        }

        const { token } = data;
        const context = await SkyWayContext.Create(token);

        context.onTokenUpdateReminder.add(() => {
          context.updateAuthToken(token);
        });
        contextRef.current = context;

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

        // ローカルストリームの取得と公開
        const { audio, video } =
          await SkyWayStreamFactory.createMicrophoneAudioAndCameraStream();
        const sfuMember = await room.join();

        localAudio = audio;
        localVideo = video;

        if (localVideo) await sfuMember.publish(localVideo);
        if (localAudio) await sfuMember.publish(localAudio);

        const checkVideoRef = () => {
          if (videoRef.current instanceof HTMLVideoElement) {
            localVideo?.attach(videoRef.current);
            videoRef.current.play();
          } else {
            animationFrameIdRef.current = requestAnimationFrame(checkVideoRef);
          }
        };

        animationFrameIdRef.current = requestAnimationFrame(checkVideoRef);

        // リモートストリームの購読設定
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
                  videoRef.current.play();
                  console.log("Remote stream received:", remoteStream);

                  // ストリームの状態監視用のログ
                  remoteStream.stream.track.onended = () => {
                    console.log("Remote video track ended.");
                  };

                  remoteStream.stream.track.onmute = () => {
                    console.log("Remote video track muted.");
                  };

                  remoteStream.stream.track.onunmute = () => {
                    console.log("Remote video track unmuted.");
                  };
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
        setError(`ビデオストリームの初期化に失敗しました ${err}`);
        setIsLoading(false);
      }
    }

    initSkyWay();

    return (): void => {
      if (localVideo) {
        localVideo.track.enabled = false;
      }

      if (localAudio) {
        localAudio.track.enabled = false;
      }

      if (videoRef.current) {
        localVideo?.detach();
        videoRef.current?.pause();
        videoRef.current.srcObject = null;
      }

      roomRef.current?.dispose();
      contextRef.current?.dispose();

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
