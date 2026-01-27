import styles from "./Footer.module.scss";
import instagramIcon from "../../assets/icons/icon-instagram.svg";
import visaIcon from "../../assets/icons/icon-visa.svg";
import mastercardIcon from "../../assets/icons/icon-mastercard.svg";
import maestroIcon from "../../assets/icons/icon-maestro.svg";
import Container from "../common/Container";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles["footer__top"]}>
          {/* Left column: email, phone, hours, instagram */}
          <div className={styles["footer__left"]}>
            <a
              href="mailto:chicagroom@gmail.com"
              className={styles["footer__email"]}
            >
              {t("footer.email")}
            </a>

            <a href="tel:+4915202433344" className={styles["footer__phone"]}>
              {t("footer.phone")}
            </a>

            <ul className={styles["footer__hours-list"]}>
              <li className={styles["footer__hours-item"]}>
                {t("footer.hours1")}
              </li>
              <li className={styles["footer__hours-item"]}>
                {t("footer.hours2")}
              </li>
            </ul>

            <div className={styles["footer__social"]}>
              <a
                href="https://www.instagram.com/chica_groom?igsh=cmd5cDYxYzMwNHg0&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className={styles["footer__social-link"]}
              >
                <img
                  src={instagramIcon}
                  alt={t("footer.instagramAlt")}
                  className={styles["footer__social-icon"]}
                />
              </a>
            </div>
          </div>

          {/* Right column: address, rating, maps */}
          <div className={styles["footer__right"]}>
            <address className={styles["footer__address"]}>
              <a
                href="https://www.google.com/maps/place/Hundesalon+Chica+Groom/@52.5415216,13.4206316,1036m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47a84dfa45c51e01:0x9e0989f5649842b3!8m2!3d52.5415216!4d13.4232119!16s%2Fg%2F11vy6mgtvc?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className={styles["footer__address-link"]}
              >
                {t("footer.address")}
              </a>
            </address>

            <a
              href="https://www.google.com/maps/place/Hundesalon+Chica+Groom/@52.5415216,13.4206316,1036m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47a84dfa45c51e01:0x9e0989f5649842b3!8m2!3d52.5415216!4d13.4232119!16s%2Fg%2F11vy6mgtvc?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["footer__rating"]}
            >
              5.0 <span className={styles["footer__stars"]}>★★★★★</span>
            </a>

            <div className={styles["footer__payments"]}>
              <img
                src={visaIcon}
                alt={t("footer.visaAlt")}
                className={styles["footer__payment"]}
              />
              <img
                src={mastercardIcon}
                alt={t("footer.mastercardAlt")}
                className={styles["footer__payment"]}
              />
              <img
                src={maestroIcon}
                alt={t("footer.maestroAlt")}
                className={styles["footer__payment"]}
              />
            </div>
          </div>
        </div>

        <div className={styles["footer__bottom"]}>
          <p className={styles["footer__bottom-text"]}>
            {t("footer.copyright")} ·{" "}
            <a href="/impressum" className={styles["footer__bottom-link"]}>
              {t("footer.impressum")}
            </a>{" "}
            ·{" "}
            <a href="/datenschutz" className={styles["footer__bottom-link"]}>
              {t("footer.datenschutz")}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
