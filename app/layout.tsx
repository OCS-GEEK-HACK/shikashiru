import { UIProvider } from "@yamada-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import theme from "@/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "シカシる",
  description: "シカのみぞシる、そんなサイト",
};

export default function RootLayouet({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UIProvider theme={theme}>{children}</UIProvider>
      </body>
    </html>
  );
}
