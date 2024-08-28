import { UIProvider } from "@yamada-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { FilterProvider } from "@/contexts/filter-context";
import { GoogleMapRefProvider } from "@/contexts/map-ref-context";
import theme from "@/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "シカシる",
  description: "シカのみぞシる、そんなサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UIProvider theme={theme}>
          <GoogleMapRefProvider>
            <FilterProvider>{children}</FilterProvider>
          </GoogleMapRefProvider>
        </UIProvider>
      </body>
    </html>
  );
}
