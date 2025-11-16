
import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { Poppins } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { SidebarProvider } from "@/context/SidebarContext";
import ClerkProviderClient from '@/components/ClerkProviderClient';
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/userContext";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // jitne weights chahiye
});

export const metadata: Metadata = {
  title: "Hevina's Perfume",
  description: "Long-lasting perfumes at reasonable prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {/* ClerkProvider must be inside the body as a client component */}
          <SidebarProvider>
            <UserProvider>
            <CartProvider>
              <TopBar />
              <Navbar />
              {children}
              <Toaster/>
              <Footer />
            </CartProvider>
            </UserProvider>
          </SidebarProvider>
      </body>
    </html>
  );
}

