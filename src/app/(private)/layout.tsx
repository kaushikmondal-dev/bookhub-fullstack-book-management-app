import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { LayoutProps } from "@/lib/types";
const Privatelayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Privatelayout;
