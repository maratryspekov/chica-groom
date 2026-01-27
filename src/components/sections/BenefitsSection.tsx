import Container from "../../components/common/Container";
import { useTranslation } from "react-i18next";
import styles from "./BenefitsSection.module.scss";

import qualityImage from "../../assets/images/image-quality.svg";
import atmosphereImage from "../../assets/images/image-atmosphere.svg";
import healthImage from "../../assets/images/image-health.svg";
import cosmeticsImage from "../../assets/images/image-cosmetics.svg";

function BenefitsSection() {
  const { t } = useTranslation();

  return (
    <section className={styles.benefits} aria-labelledby="benefits-title">
      <Container>
        <div className={styles["benefits__inner"]}>
          <h2 id="benefits-title" className={styles["benefits__title"]}>
            {t("benefits.title")}
          </h2>

          <div className={styles["benefits__grid"]}>
            <article className={styles["benefits__card"]}>
              <img
                className={styles["benefits__card-img"]}
                src={qualityImage}
                alt={t("benefits.quality")}
              />
              <p className={styles["benefits__card-text"]}>
                {t("benefits.quality")}
              </p>
            </article>

            <article className={styles["benefits__card"]}>
              <img
                className={styles["benefits__card-img"]}
                src={atmosphereImage}
                alt={t("benefits.atmosphere")}
              />
              <p className={styles["benefits__card-text"]}>
                {t("benefits.atmosphere")}
              </p>
            </article>

            <article className={styles["benefits__card"]}>
              <img
                className={styles["benefits__card-img"]}
                src={healthImage}
                alt={t("benefits.procedures")}
              />
              <p className={styles["benefits__card-text"]}>
                {t("benefits.procedures")}
              </p>
            </article>

            <article className={styles["benefits__card"]}>
              <img
                className={styles["benefits__card-img"]}
                src={cosmeticsImage}
                alt={t("benefits.cosmetics")}
              />
              <p className={styles["benefits__card-text"]}>
                {t("benefits.cosmetics")}
              </p>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BenefitsSection;
