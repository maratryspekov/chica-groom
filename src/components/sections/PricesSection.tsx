import Container from "../common/Container";
import Button from "../common/Button";
import styles from "./PricesSection.module.scss";
import priceDog from "../../assets/images/image-prices-dog.jpg.webp";
import priceProcess from "../../assets/images/image-prices-process.jpg.webp";
import priceGroomer from "../../assets/images/image-prices-groomer.jpg";
import { useTranslation } from "react-i18next";

type WeightPrice = {
  rangeKey: string;
  priceKey: string;
};

type Plan = {
  id: string;
  name: string;
  durationKey: string;
  priceKey: string;
  includesKeys: string[];
  excludesKeys: string[];
  weights: WeightPrice[];
};

const PLANS: Plan[] = [
  {
    id: "easy",
    name: "EASY",
    durationKey: "prices.easyDuration",
    priceKey: "prices.easyPrice",
    includesKeys: [
      "prices.washing",
      "prices.drying",
      "prices.brushing",
      "prices.eyeCare",
      "prices.earCare",
      "prices.clawCare",
    ],
    excludesKeys: ["prices.haircut", "prices.spa", "prices.dentalCleaning"],
    weights: [
      { rangeKey: "prices.weightUpTo2", priceKey: "prices.priceFrom59" },
      { rangeKey: "prices.weight2to5", priceKey: "prices.priceFrom79" },
      { rangeKey: "prices.weight5to10", priceKey: "prices.priceFrom89" },
      { rangeKey: "prices.weight10to20", priceKey: "prices.priceFrom109" },
      { rangeKey: "prices.weight20to30", priceKey: "prices.priceFrom159" },
    ],
  },
  {
    id: "groom",
    name: "GROOM",
    durationKey: "prices.groomDuration",
    priceKey: "prices.groomPrice",
    includesKeys: [
      "prices.washing",
      "prices.drying",
      "prices.brushing",
      "prices.eyeCare",
      "prices.earCare",
      "prices.clawCare",
      "prices.haircut",
      "prices.dentalCleaning",
    ],
    excludesKeys: ["prices.spa"],
    weights: [
      { rangeKey: "prices.weightUpTo2", priceKey: "prices.priceFrom79" },
      { rangeKey: "prices.weight2to5", priceKey: "prices.priceFrom99" },
      { rangeKey: "prices.weight5to10", priceKey: "prices.priceFrom109" },
      { rangeKey: "prices.weight10to20", priceKey: "prices.priceFrom129" },
      { rangeKey: "prices.weight20to30", priceKey: "prices.priceFrom179" },
    ],
  },
  {
    id: "spa",
    name: "SPA",
    durationKey: "prices.spaDuration",
    priceKey: "prices.spaPrice",
    includesKeys: [
      "prices.washing",
      "prices.drying",
      "prices.brushing",
      "prices.eyeCare",
      "prices.earCare",
      "prices.clawCare",
      "prices.haircut",
      "prices.dentalCleaning",
      "prices.spa",
    ],
    excludesKeys: [],
    weights: [
      { rangeKey: "prices.weightUpTo2", priceKey: "prices.priceFrom99" },
      { rangeKey: "prices.weight2to5", priceKey: "prices.priceFrom119" },
      { rangeKey: "prices.weight5to10", priceKey: "prices.priceFrom129" },
      { rangeKey: "prices.weight10to20", priceKey: "prices.priceFrom149" },
      { rangeKey: "prices.weight20to30", priceKey: "prices.priceFrom209" },
    ],
  },
];

function PricesSection() {
  const { t } = useTranslation();

  return (
    <section id="prices" className={styles.prices}>
      <Container>
        <header className={styles["prices__header"]}>
          <h2 className={styles["prices__title"]}>{t("prices.title")}</h2>
          <p className={styles["prices__subtitle"]}>{t("prices.subtitle")}</p>
        </header>

        <ul className={styles["prices__list"]}>
          {PLANS.map((plan) => (
            <li key={plan.id} className={styles["prices__item"]}>
              <article className={styles["prices-card"]}>
                <div className={styles["prices-card__top"]}>
                  <h3 className={styles["prices-card__name"]}>
                    {plan.name}
                    <span className={styles["prices-card__duration"]}>
                      {t(plan.durationKey)}
                    </span>
                  </h3>

                  <p className={styles["prices-card__price"]}>
                    {t(plan.priceKey)}
                  </p>

                  <ul className={styles["prices-card__includes"]}>
                    {plan.includesKeys.map((itemKey) => (
                      <li
                        key={itemKey}
                        className={styles["prices-card__includes-item"]}
                      >
                        ✓ {t(itemKey)}
                      </li>
                    ))}
                  </ul>

                  {plan.excludesKeys.length > 0 && (
                    <div className={styles["prices-card__excludes"]}>
                      <span className={styles["prices-card__excludes-title"]}>
                        {t("prices.notIncluded")}
                      </span>
                      <ul className={styles["prices-card__excludes-list"]}>
                        {plan.excludesKeys.map((itemKey) => (
                          <li
                            key={itemKey}
                            className={styles["prices-card__excludes-item"]}
                          >
                            ✗ {t(itemKey)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className={styles["prices-card__bottom"]}>
                  <ul className={styles["prices-card__weights"]}>
                    {plan.weights.map((line) => (
                      <li
                        key={line.rangeKey}
                        className={styles["prices-card__weights-item"]}
                      >
                        <span className={styles["prices-card__weights-range"]}>
                          {t(line.rangeKey)}
                        </span>{" "}
                        -{" "}
                        <span className={styles["prices-card__weights-price"]}>
                          {t(line.priceKey)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className={styles["prices-card__note"]}>
                    {t("prices.note")}
                  </p>

                  <Button
                    variant="primary"
                    size="md"
                    className={styles["prices-card__button"]}
                    onClick={() => {}}
                  >
                    {t("prices.bookButton")}
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>

      {/* Beige block with text and photos */}
      <div className={styles["prices__info"]}>
        <Container>
          <div className={styles["prices__info-inner"]}>
            <p className={styles["prices__info-text"]}>
              {t("prices.infoText1")}
            </p>
            <p className={styles["prices__info-text"]}>
              {t("prices.infoText2")}
            </p>

            <div className={styles["prices__info-gallery"]}>
              <img
                className={styles["prices__info-image"]}
                src={priceDog}
                alt={t("prices.altDogAfter")}
              />
              <img
                className={styles["prices__info-image"]}
                src={priceProcess}
                alt={t("prices.altProcess")}
              />
              <img
                className={styles["prices__info-image"]}
                src={priceGroomer}
                alt={t("prices.altGroomer")}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default PricesSection;
