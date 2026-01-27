import logo from "../../assets/icons/icon-logo.svg";
import styles from "./Header.module.scss";
import Container from "../common/Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = (menu: string) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
    setCloseTimeout(timeout);
  };

  const { t, i18n } = useTranslation();

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles["header__container"]}>
          <div className={styles["header__left"]}>
            <Link to="/">
              <img
                src={logo}
                alt="Chica Groom logo"
                className={styles["header__logo"]}
              />
            </Link>
          </div>

          {/* Languages centered between logo and hamburger */}
          <div
            className={styles["header__mobile-lang"]}
            role="group"
            aria-label="Change language"
          >
            <button
              type="button"
              onClick={() => i18n.changeLanguage("de")}
              className={`${styles["header__lang"]} ${
                i18n.language === "de" ? styles["header__lang--active"] : ""
              }`}
              aria-label="Switch to German"
              aria-pressed={i18n.language === "de"}
            >
              DE
            </button>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("en")}
              className={`${styles["header__lang"]} ${
                i18n.language === "en" ? styles["header__lang--active"] : ""
              }`}
              aria-label="Switch to English"
              aria-pressed={i18n.language === "en"}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("ru")}
              className={`${styles["header__lang"]} ${
                i18n.language === "ru" ? styles["header__lang--active"] : ""
              }`}
              aria-label="Switch to Russian"
              aria-pressed={i18n.language === "ru"}
            >
              RU
            </button>
          </div>

          {/* Hamburger menu button */}
          <button
            type="button"
            className={`${styles["header__hamburger"]} ${
              isMobileMenuOpen ? styles["header__hamburger--open"] : ""
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles["header__hamburger-line"]}></span>
            <span className={styles["header__hamburger-line"]}></span>
            <span className={styles["header__hamburger-line"]}></span>
          </button>

          <nav
            className={`${styles["header__nav"]} ${
              isMobileMenuOpen ? styles["header__nav--open"] : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ul className={styles["header__list"]}>
              {/* Services Dropdown */}
              <li
                className={styles["header__item"]}
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
              >
                <span className={styles["header__dropdown-trigger"]}>
                  {t("header.services")} ▼
                </span>
                {openDropdown === "services" && (
                  <ul
                    className={styles["header__dropdown"]}
                    onMouseEnter={() => handleMouseEnter("services")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <li>
                      <Link to="/#prices">{t("header.prices")}</Link>
                    </li>
                    <li>
                      <Link to="/#booking">{t("header.booking")}</Link>
                    </li>
                    <li>
                      <Link to="/workplace">{t("header.workplace")}</Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* About Us */}
              <li className={styles["header__item"]}>
                <Link to="/#about-us">{t("header.aboutUs")}</Link>
              </li>

              {/* Education Dropdown */}
              <li
                className={styles["header__item"]}
                onMouseEnter={() => handleMouseEnter("bildung")}
                onMouseLeave={handleMouseLeave}
              >
                <span className={styles["header__dropdown-trigger"]}>
                  {t("header.education")} ▼
                </span>
                {openDropdown === "bildung" && (
                  <ul
                    className={styles["header__dropdown"]}
                    onMouseEnter={() => handleMouseEnter("bildung")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <li>
                      <Link to="/courses">{t("header.courses")}</Link>
                    </li>
                    <li>
                      <Link to="/practice">{t("header.practice")}</Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Franchise */}
              <li className={styles["header__item"]}>
                <Link to="/franchise">{t("header.franchise")}</Link>
              </li>

              {/* Jobs */}
              <li className={styles["header__item"]}>
                <Link to="/jobs">{t("header.jobs")}</Link>
              </li>
            </ul>
          </nav>

          <div className={styles["header__right"]}>
            <a href="tel:+4915202433344" className={styles["header__phone"]}>
              +49 152 02433344
            </a>

            <div
              className={styles["header__lang-switcher"]}
              role="group"
              aria-label="Change language"
            >
              <button
                type="button"
                onClick={() => i18n.changeLanguage("de")}
                className={`${styles["header__lang"]} ${
                  i18n.language === "de" ? styles["header__lang--active"] : ""
                }`}
                aria-label="Switch to German"
                aria-pressed={i18n.language === "de"}
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => i18n.changeLanguage("en")}
                className={`${styles["header__lang"]} ${
                  i18n.language === "en" ? styles["header__lang--active"] : ""
                }`}
                aria-label="Switch to English"
                aria-pressed={i18n.language === "en"}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => i18n.changeLanguage("ru")}
                className={`${styles["header__lang"]} ${
                  i18n.language === "ru" ? styles["header__lang--active"] : ""
                }`}
                aria-label="Switch to Russian"
                aria-pressed={i18n.language === "ru"}
              >
                RU
              </button>
            </div>
          </div>

          {/* Overlay to dim background when menu is open */}
          {isMobileMenuOpen && (
            <div
              className={`${styles["header__overlay"]} ${
                isMobileMenuOpen ? styles["header__overlay--visible"] : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}
        </div>
      </Container>
    </header>
  );
}

export default Header;
