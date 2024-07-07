"use client";
import { AuthProvider } from "@common/AuthProvider";
import { WagmiConfig, createConfig, sepolia } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_API_KEY, // or infuraId
    walletConnectProjectId: process.env.CONNECT_KIT_PROJECT_ID!,
    chains: [sepolia],
    // Required
    appName: "My Gasless NFT Minter",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's logo,no bigger than 1024x1024px (max. 1MB)
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <WagmiConfig config={config}>
          <ConnectKitProvider mode="dark">
            <body>
              <div style={{ display: "flex", flexDirection: "column", minHeight: "105vh" }}>
                <div style={{ flexGrow: 1 }}>{children}</div>
              </div>
            </body>
          </ConnectKitProvider>
        </WagmiConfig>
      </AuthProvider>
    </html>
  );
}
