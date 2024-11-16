import dynamic from "next/dynamic";

const LiveStream = dynamic(() => import("../components/LiveStream"), {
  ssr: false,
});

export default function Page() {
  return <LiveStream />;
}
