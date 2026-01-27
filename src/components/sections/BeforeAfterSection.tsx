import Container from "../common/Container";
import styles from "./BeforeAfterSection.module.scss";

import beforeDog from "../../assets/images/image-before.png";
import afterDog from "../../assets/images/image-after.png";
import BeforeAfterSlider from "../common/BeforeAfterSlider";
import { useTranslation } from "react-i18next";

function BeforeAfterSection() {
  const { t } = useTranslation();

  return (
    <section className={styles["before-after"]}>
      <Container>
        <div className={styles["before-after__inner"]}>
          <article className={styles["before-after__card"]}>
            <BeforeAfterSlider
              beforeSrc={beforeDog}
              afterSrc={afterDog}
              beforeAlt={t("beforeAfter.altBefore")}
              afterAlt={t("beforeAfter.altAfter")}
            />
          </article>
        </div>
      </Container>
    </section>
  );
}

export default BeforeAfterSection;
