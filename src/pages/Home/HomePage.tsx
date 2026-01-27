import styles from "./HomePage.module.scss";
import Container from "../../components/common/Container";
import heroImage from "../../assets/images/hero-image.webp";
import Button from "../../components/common/Button";
import BenefitsSection from "../../components/sections/BenefitsSection";
import AboutUsSection from "../../components/sections/AboutUsSection";
import BeforeAfterSection from "../../components/sections/BeforeAfterSection";
import PricesSection from "../../components/sections/PricesSection";
import ReviewsSection from "../../components/sections/ReviewsSection";
import OpportunitiesSection from "../../components/sections/OpportunitiesSection";
import BookingSection from "../../components/sections/BookingSection";
import InstagramSection from "../../components/sections/InstagramSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HomePage() {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);
  const handleScrollToBooking = () => {
    const el = document.getElementById("booking");

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToPrices = () => {
    const el = document.getElementById("prices");

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* HERO */}
      <section className={styles.hero} id="hero">
        <Container>
          <div className={styles["hero__inner"]}>
            <div className={styles["hero__left"]}>
              <a
                className={styles["hero__rating"]}
                href="https://www.google.com/maps/place/Hundesalon+Chica+Groom/@52.5415216,13.4206316,1036m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47a84dfa45c51e01:0x9e0989f5649842b3!8m2!3d52.5415216!4d13.4232119!16s%2Fg%2F11vy6mgtvc?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bewertung 5.0 von 5 bei Google Maps"
              >
                5.0 <span className={styles["hero__stars"]}>★★★★★</span>
              </a>
              <h1 className={styles["hero__title"]}>
                {t("hero.title").split(" ").slice(0, 1).join(" ")} <br />
                {t("hero.title").split(" ").slice(1).join(" ")}
              </h1>
              <p className={styles["hero__text"]}>
                {t("hero.subtitle").split(" ").slice(0, 5).join(" ")} <br />
                {t("hero.subtitle").split(" ").slice(5).join(" ")}
              </p>
              <div className={styles["hero__btn-wrapper"]}>
                <Button
                  className={styles["hero__button"]}
                  variant="primary"
                  size="md"
                  onClick={handleScrollToBooking}
                >
                  {t("hero.buttonBooking")}
                </Button>
                <Button
                  className={styles["hero__button"]}
                  variant="primary"
                  size="md"
                  onClick={handleScrollToPrices}
                >
                  {t("hero.buttonPrices")}
                </Button>
              </div>
            </div>

            <div className={styles["hero__right"]}>
              <img
                className={styles["hero__image"]}
                src={heroImage}
                alt="styled dog in Chica Groom Salon"
              />
            </div>
          </div>
        </Container>
      </section>
      {/* Paws line*/}
      <section className={styles.paws} aria-hidden="true">
        <div className={styles["paws__track"]}>
          {/* First set of paws */}
          {Array.from({ length: 30 }).map((_, index) => (
            <span key={index} className={styles["paws__item"]}>
              🐾
            </span>
          ))}

          {Array.from({ length: 30 }).map((_, index) => (
            <span key={`clone-${index}`} className={styles["paws__item"]}>
              🐾
            </span>
          ))}
        </div>
      </section>
      <BenefitsSection />
      <AboutUsSection />
      <BeforeAfterSection />
      <PricesSection />
      <ReviewsSection />
      <OpportunitiesSection />
      <BookingSection />
      <InstagramSection />
    </>
  );
}

export default HomePage;
