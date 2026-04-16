import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import ReturnToTop from "@/components/ReturnToTop";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="pt-[100px] sm:pt-[110px] md:pt-[120px] bg-bg-blue">
        {children}
      </main>
      <ChatBot />
      <ReturnToTop />
      <Footer />
    </>
  );
}
