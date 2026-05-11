import { TokenValidator } from "@/components";

export default function PrivateRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TokenValidator />
      {children}
    </>
  );
}
