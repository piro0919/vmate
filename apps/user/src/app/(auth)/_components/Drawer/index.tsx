import { useClerk } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { ComponentProps } from "react";

const ReactModernDrawer = dynamic(() => import("react-modern-drawer"), {
  ssr: false,
});

export type DrawerProps = Pick<
  ComponentProps<typeof ReactModernDrawer>,
  "onClose" | "open"
>;

export default function Drawer({ onClose, open }: DrawerProps): JSX.Element {
  const { signOut } = useClerk();

  return (
    <ReactModernDrawer direction="right" onClose={onClose} open={open}>
      <button onClick={() => signOut({ redirectUrl: "/" })}>
        サインアウト
      </button>
    </ReactModernDrawer>
  );
}
