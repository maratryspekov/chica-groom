import BookingForm from "../booking/BookingForm";
import Container from "../common/Container";
import styles from "./BookingSection.module.scss";
import { useTranslation } from "react-i18next";

function BookingSection() {
  const { t } = useTranslation();

  return (
    <section id="booking" className={styles.booking}>
      <Container>
        <header className={styles["booking__header"]}>
          <h2 className={styles["booking__title"]}>
            {t("bookingSection.title")}
          </h2>
          <p className={styles["booking__description"]}>
            {t("bookingSection.description")}
          </p>
        </header>
        <BookingForm />
      </Container>
    </section>
  );
}

export default BookingSection;
