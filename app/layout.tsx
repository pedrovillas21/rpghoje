import type { Metadata } from "next";
import { Shippori_Mincho_B1, Zen_Kaku_Gothic_New } from "next/font/google";
import { AudioProvider } from "@/components/AudioProvider";
import { MotionRoot } from "@/components/MotionRoot";
import { SoundControl } from "@/components/SoundControl";
import "./globals.css";

const shippori = Shippori_Mincho_B1({
  variable: "--font-shippori",
  weight: ["500", "700", "800"],
  subsets: ["latin"],
});

const zen = Zen_Kaku_Gothic_New({
  variable: "--font-zen",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Por que devemos ter RPG hoje",
  description: "Um apelo formal ao mestre: a mesa precisa acontecer neste sábado.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${shippori.variable} ${zen.variable} antialiased`}>
      <body className="grain min-h-svh">
        <AudioProvider>
          <MotionRoot>
            <SoundControl />
            {children}
          </MotionRoot>
        </AudioProvider>
      </body>
    </html>
  );
}
