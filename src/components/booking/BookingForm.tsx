import styles from "./BookingForm.module.scss";
import Button from "../common/Button";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { API_ENDPOINTS } from "../../config/api";

type BookingFormData = {
  email: string;
  phone: string;
  ownerName: string;
  dogName: string;
  dogBreed: string;
  dogWeight: number;
  dogAge: number;
  servicePackage: "EASY" | "GROOM" | "SPA";
  privacyConsent: boolean;
};

function BookingForm() {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(false);

    const form = formRef.current;
    if (!form) {
      console.error("Form-Ref ist null");
      return;
    }

    const formData = new FormData(form);

    const bookingData: BookingFormData = {
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      ownerName: String(formData.get("ownerName") || ""),
      dogName: String(formData.get("dogName") || ""),
      dogBreed: String(formData.get("dogBreed") || ""),
      dogWeight: Number(formData.get("dogWeight") || 0),
      dogAge: Number(formData.get("dogAge") || 0),
      servicePackage: (formData.get("servicePackage") || "GROOM") as
        | "EASY"
        | "GROOM"
        | "SPA",
      privacyConsent: Boolean(formData.get("privacyConsent")),
    };

    try {
      const response = await fetch(API_ENDPOINTS.BOOKING, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        console.error("Fehler beim Senden", await response.text());
        return;
      }

      form.reset();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Netzwerkfehler:", error);
    }
  };

  return (
    <form
      ref={formRef}
      className={styles["booking-form"]}
      onSubmit={handleSubmit}
    >
      <div className={styles["booking-form__contacts"]}>
        <div className={styles["booking-form__field"]}>
          <label htmlFor="email" className={styles["booking-form__label"]}>
            {t("bookingForm.email")}
          </label>
          <input
            className={styles["booking-form__input"]}
            id="email"
            name="email"
            type="email"
            required
          />
        </div>

        <div className={styles["booking-form__field"]}>
          <label htmlFor="phone" className={styles["booking-form__label"]}>
            {t("bookingForm.phone")}
          </label>
          <input
            className={styles["booking-form__input"]}
            id="phone"
            name="phone"
            type="tel"
            required
          />
        </div>

        <div className={styles["booking-form__field"]}>
          <label htmlFor="ownerName" className={styles["booking-form__label"]}>
            {t("bookingForm.ownerName")}
          </label>
          <input
            className={styles["booking-form__input"]}
            id="ownerName"
            name="ownerName"
            type="text"
            required
          />
        </div>
      </div>

      <div className={styles["booking-form__dogs-info"]}>
        <div className={styles["booking-form__field"]}>
          <label htmlFor="dogName" className={styles["booking-form__label"]}>
            {t("bookingForm.dogName")}
          </label>
          <input
            className={styles["booking-form__input"]}
            id="dogName"
            name="dogName"
            type="text"
            required
          />
        </div>
        <div className={styles["booking-form__field"]}>
          <label htmlFor="dogBreed" className={styles["booking-form__label"]}>
            {t("bookingForm.dogBreed")}
          </label>
          <input
            className={styles["booking-form__input"]}
            id="dogBreed"
            name="dogBreed"
            type="text"
            required
          />
        </div>
        <div className={styles["booking-form__field"]}>
          <label htmlFor="dogWeight" className={styles["booking-form__label"]}>
            {t("bookingForm.dogWeight")}
          </label>
          <input
            className={styles["booking-form__input"]}
            id="dogWeight"
            name="dogWeight"
            type="number"
            min="0"
            required
          />
        </div>
        <div className={styles["booking-form__field"]}>
          <label htmlFor="dogAge" className={styles["booking-form__label"]}>
            {t("bookingForm.dogAge")}
          </label>
          <input
            className={styles["booking-form__input"]}
            id="dogAge"
            name="dogAge"
            type="number"
            min="0"
            required
          />
        </div>
      </div>

      <div className={styles["booking-form__service-package"]}>
        <h4 className={styles["booking-form__service-package-title"]}>
          {t("bookingForm.packageTitle")}
        </h4>
        <span className={styles["booking-form__service-package-tip"]}>
          {t("bookingForm.packageTip")}
        </span>
        <div className={styles["booking-form__service-package-list"]}>
          <div className={styles["booking-form__field"]}>
            <label htmlFor="service-easy">
              <input
                id="service-easy"
                type="radio"
                name="servicePackage"
                value="EASY"
              />
              EASY
            </label>
          </div>
          <div className={styles["booking-form__field"]}>
            <label htmlFor="service-groom">
              <input
                id="service-groom"
                type="radio"
                name="servicePackage"
                value="GROOM"
                defaultChecked
              />
              GROOM
            </label>
          </div>
          <div className={styles["booking-form__field"]}>
            <label htmlFor="service-spa">
              <input
                id="service-spa"
                type="radio"
                name="servicePackage"
                value="SPA"
              />
              SPA
            </label>
          </div>
        </div>
      </div>

      <div className={styles["booking-form__consent"]}>
        <label className={styles["booking-form__checkbox-label"]}>
          <input
            className={styles["booking-form__checkbox-input"]}
            type="checkbox"
            name="privacyConsent"
            required
          />
          {t("bookingForm.privacyConsent")}
        </label>
      </div>

      <Button type="submit" className={styles["booking-form__submit"]}>
        {t("bookingForm.submitButton")}
      </Button>

      {isSubmitted && (
        <p
          className={styles["booking-form__success"]}
          data-testid="success-message"
        >
          {t("bookingForm.successMessage")}
        </p>
      )}

      <p className={styles["booking-form__note"]}>
        {t("bookingForm.privacyNote")}{" "}
        <a
          href="/datenschutz"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["booking-form__link"]}
        >
          {t("bookingForm.privacyLink")}
        </a>{" "}
        {t("bookingForm.privacyNoteSuffix")}
      </p>
    </form>
  );
}

export default BookingForm;
