import AuthLayout from "./_components/AuthLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return <AuthLayout>{children}</AuthLayout>;
}
