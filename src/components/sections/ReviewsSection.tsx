// src/components/sections/ReviewsSection.tsx
import { useState } from "react";
import Container from "../common/Container";
import styles from "./ReviewsSection.module.scss";
import { useTranslation } from "react-i18next";

import review1 from "../../assets/images/image-review-1.jpg";
import review2 from "../../assets/images/image-review-2.jpg";
import review3 from "../../assets/images/image-review-3.jpg";

type Review = {
  id: string;
  image: string;
  textKey: string;
  authorKey: string;
};

const REVIEWS: Review[] = [
  {
    id: "elena",
    image: review1,
    textKey: "reviews.review1",
    authorKey: "reviews.author1",
  },
  {
    id: "markus",
    image: review2,
    textKey: "reviews.review2",
    authorKey: "reviews.author2",
  },
  {
    id: "anna",
    image: review3,
    textKey: "reviews.review3",
    authorKey: "reviews.author3",
  },
];

function ReviewsSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = REVIEWS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className={styles.reviews}>
      <Container>
        <h2 className={styles["reviews__title"]}>{t("reviews.title")}</h2>

        <div className={styles["reviews__slider"]}>
          {/* left part with a pic*/}
          <div className={styles["reviews__image-wrapper"]}>
            <img
              className={styles["reviews__image"]}
              src={activeReview.image}
              alt={`${t("reviews.altImage")} ${t(activeReview.authorKey)}`}
            />
          </div>

          {/* right part with text */}
          <div className={styles["reviews__content"]}>
            <p className={styles["reviews__text"]}>{t(activeReview.textKey)}</p>
            <p className={styles["reviews__author"]}>
              {t(activeReview.authorKey)}
            </p>
          </div>

          {/* left arrow */}
          <button
            type="button"
            className={`${styles["reviews__arrow"]} ${styles["reviews__arrow--prev"]}`}
            onClick={handlePrev}
            aria-label={t("reviews.prevButton")}
          >
            ‹
          </button>

          {/* right arrow*/}
          <button
            type="button"
            className={`${styles["reviews__arrow"]} ${styles["reviews__arrow--next"]}`}
            onClick={handleNext}
            aria-label={t("reviews.nextButton")}
          >
            ›
          </button>
        </div>

        {/* review dots*/}
        <div className={styles["reviews__dots"]}>
          {REVIEWS.map((review, index) => (
            <button
              key={review.id}
              type="button"
              className={
                index === activeIndex
                  ? `${styles["reviews__dot"]} ${styles["reviews__dot--active"]}`
                  : styles["reviews__dot"]
              }
              onClick={() => setActiveIndex(index)}
              aria-label={`${t("reviews.dotLabel")} ${index + 1}`}
            />
          ))}
        </div>

        <div className={styles["reviews__google-wrapper"]}>
          <a
            href="https://www.google.com/maps/place/Hundesalon+Chica+Groom/@52.5415216,13.4206316,517m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47a84dfa45c51e01:0x9e0989f5649842b3!8m2!3d52.5415216!4d13.4232119!16s%2Fg%2F11vy6mgtvc?authuser=0&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["reviews__google-btn"]}
          >
            {t("reviews.googleButton")}
          </a>
        </div>
      </Container>
    </section>
  );
}

export default ReviewsSection;
