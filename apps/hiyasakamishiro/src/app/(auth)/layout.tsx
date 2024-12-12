import { ReactNode } from "react";
import AuthLayout from "./_components/AuthLayout";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): React.JSX.Element {
  return <AuthLayout>{children}</AuthLayout>;
}
