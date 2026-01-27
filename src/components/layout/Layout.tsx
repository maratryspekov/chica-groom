import Header from "./Header";
import Footer from "./Footer";
import FloatingContactButton from "../common/FloatingContactButton";
import type { ReactNode } from "react";
import styles from "./Layout.module.scss";
import { useState, useEffect } from "react";
import scrollTopIcon from "../../assets/icons/icon-arrow-top.svg";

type LayoutProps = {
  children: ReactNode;
};

function Layout(props: LayoutProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.layout}>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className={styles.layout__main}>
        {props.children}
      </main>
      <Footer />
      {/* Floating Contact Button */}
      <FloatingContactButton />
      {/* Scroll to top button */}
      {isVisible && (
        <button
          className={styles["scroll-top"]}
          type="button"
          onClick={handleScrollTop}
          aria-label="Nach oben scrollen"
        >
          <img
            src={scrollTopIcon}
            alt="Nach oben"
            className={styles["scroll-top__icon"]}
          />
        </button>
      )}
    </div>
  );
}

export default Layout;
