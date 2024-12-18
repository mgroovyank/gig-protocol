import { Fragment } from "react";
import type { AppProps } from "next/app";
import "./styles/global.css";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";

import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";

import { createThirdwebClient } from "thirdweb";
import NavbarSpacer from "@/src/app/components/navbar-spacer1";

import { Metadata } from "next";
import { AuthProvider } from "./providers/auth";

export const metadata: Metadata = {
  title: "gigfreehire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider>
          <Fragment>
            <AuthProvider>
              <NavbarSpacer />
              {children}
            </AuthProvider>
          </Fragment>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
