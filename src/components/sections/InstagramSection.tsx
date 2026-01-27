import Container from "../common/Container";
import styles from "./InstagramSection.module.scss";
import { useTranslation } from "react-i18next";

function InstagramSection() {
  const { t } = useTranslation();

  return (
    <section id="instagram">
      <Container>
        <div className={styles["instagram-card"]}>
          <div className={styles["instagram-card__content"]}>
            <h2 className={styles["instagram-card__content-title"]}>
              {t("instagram.title")}
            </h2>
            <p className={styles["instagram-card__content-description"]}>
              {t("instagram.description")}
            </p>

            <a
              className={styles["instagram-card__content-link"]}
              href="https://www.instagram.com/chica_groom"
            >
              {t("instagram.link")}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default InstagramSection;
