import Container from "../common/Container";
import { useTranslation } from "react-i18next";
import styles from "./AboutUsSection.module.scss";
import aboutUsImage from "../../assets/images/image-about-us.webp";

function AboutUsSection() {
  const { t } = useTranslation();

  return (
    <section className={styles["about-us"]} id="about-us">
      <Container>
        <div className={styles["about-us__wrapper"]}>
          <img
            className={styles["about-us__img"]}
            src={aboutUsImage}
            alt="the owner with a dog on his arms"
          />
          <p className={styles["about-us__description"]}>
            {t("aboutUs.description")}
          </p>
        </div>
      </Container>
    </section>
  );
}

export default AboutUsSection;
