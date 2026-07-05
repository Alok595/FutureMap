import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import BackgroundParticles from "@/components/layout/BackgroundParticles";
import AuthProvider from "@/components/providers/AuthProvider";
import ClientLayoutUI from "@/components/layout/ClientLayoutUI";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://futuremap.com'),
  title: {
    default: "FutureMap - Premier Career Mentorship & Guidance",
    template: "%s | FutureMap"
  },
  description: "Guiding students to choose their careers properly across domains like JEE, NEET, Government Exams, and UCEED. Connect with top mentors today.",
  keywords: ["Career Guidance", "Mentorship India", "JEE", "NEET", "Study Abroad", "Student Counseling", "FutureMap"],
  authors: [{ name: "FutureMap Team" }],
  openGraph: {
    title: "FutureMap - Premier Career Mentorship",
    description: "Expert career guidance and mentorship for students across multiple domains including JEE, NEET, and UCEED.",
    url: "https://futuremap.com",
    siteName: "FutureMap",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FutureMap - Premier Career Mentorship",
    description: "Expert career guidance and mentorship for students.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${montserrat.variable} font-sans antialiased bg-[#faf9f6] text-[#2c2c2c] relative`}
      >
        <AuthProvider>
          <BackgroundParticles />
          <SmoothScroll>
            <ClientLayoutUI>
              {children}
            </ClientLayoutUI>
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
