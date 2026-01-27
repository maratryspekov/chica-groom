import { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal/Modal";
import { API_ENDPOINTS } from "../../config/api";
import styles from "./PracticePage.module.scss";

type PracticePackage = {
  id: string;
  title: string;
  duration: string;
  price: string;
  subtitle: string;
  included: string[];
  buttonLabel: string;
};

type ModalFormData = {
  name: string;
  email: string;
  phone: string;
  practicePackage: string;
  privacyConsent: boolean;
};

function PracticePage() {
  const { t } = useTranslation();

  const packages: PracticePackage[] = [
    {
      id: "start",
      title: t("practicePage.startPackage.title"),
      duration: t("practicePage.startPackage.duration"),
      price: t("practicePage.startPackage.price"),
      subtitle: t("practicePage.startPackage.subtitle"),
      included: t("practicePage.startPackage.included", {
        returnObjects: true,
      }) as string[],
      buttonLabel: t("practicePage.startPackage.buttonLabel"),
    },
    {
      id: "experience",
      title: t("practicePage.experiencePackage.title"),
      duration: t("practicePage.experiencePackage.duration"),
      price: t("practicePage.experiencePackage.price"),
      subtitle: t("practicePage.experiencePackage.subtitle"),
      included: t("practicePage.experiencePackage.included", {
        returnObjects: true,
      }) as string[],
      buttonLabel: t("practicePage.experiencePackage.buttonLabel"),
    },
    {
      id: "intensive",
      title: t("practicePage.intensivePackage.title"),
      duration: t("practicePage.intensivePackage.duration"),
      price: t("practicePage.intensivePackage.price"),
      subtitle: t("practicePage.intensivePackage.subtitle"),
      included: t("practicePage.intensivePackage.included", {
        returnObjects: true,
      }) as string[],
      buttonLabel: t("practicePage.intensivePackage.buttonLabel"),
    },
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] =
    useState<PracticePackage | null>(null);

  const handleOpenModal = (pkg: PracticePackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    setIsSubmitted(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const practiceData: ModalFormData = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      practicePackage: String(formData.get("practicePackage") || ""),
      privacyConsent: Boolean(formData.get("privacyConsent")),
    };

    try {
      const response = await fetch(API_ENDPOINTS.PRACTICE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(practiceData),
      });

      if (!response.ok) {
        console.error("Fehler beim Senden", await response.text());
        setIsSubmitting(false);
        return;
      }

      await response.json();

      form.reset();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Netzwerkfehler:", error);
      alert("Fehler beim Senden der Anmeldung. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className={styles.practice}>
        <Container>
          {/* Hero Section */}
          <div className={styles["practice__hero"]}>
            <h1 className={styles["practice__title"]}>
              {t("practicePage.heroTitle")}
            </h1>
            <p className={styles["practice__subtitle"]}>
              {t("practicePage.heroSubtitle")}
            </p>
            <p className={styles["practice__description"]}>
              {t("practicePage.heroDescription1")}
            </p>
            <p className={styles["practice__description"]}>
              {t("practicePage.heroDescription2")}
            </p>
          </div>

          {/* Packages */}
          <div className={styles["practice__packages"]}>
            {packages.map((pkg) => (
              <article key={pkg.id} className={styles["practice-card"]}>
                <div className={styles["practice-card__header"]}>
                  <h2 className={styles["practice-card__title"]}>
                    {pkg.title}
                  </h2>
                  <div className={styles["practice-card__price-block"]}>
                    <span className={styles["practice-card__duration"]}>
                      {pkg.duration}
                    </span>
                    <span className={styles["practice-card__price"]}>
                      {pkg.price}
                    </span>
                  </div>
                </div>

                <p className={styles["practice-card__subtitle"]}>
                  {pkg.subtitle}
                </p>

                <div className={styles["practice-card__body"]}>
                  <h3 className={styles["practice-card__included-title"]}>
                    {t("practicePage.includedTitle")}
                  </h3>
                  <ul className={styles["practice-card__list"]}>
                    {pkg.included.map((item, index) => (
                      <li
                        key={index}
                        className={styles["practice-card__list-item"]}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  type="button"
                  className={styles["practice-card__button"]}
                  onClick={() => handleOpenModal(pkg)}
                >
                  {pkg.buttonLabel}
                </Button>
              </article>
            ))}
          </div>

          {/* Important Note */}
          <div className={styles["practice__note"]}>
            <p>
              <strong>{t("practicePage.importantNote")}</strong>{" "}
              {t("practicePage.importantText")}
            </p>
          </div>
        </Container>
      </section>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          isSubmitted
            ? t("practicePage.modalTitleSuccess")
            : t("practicePage.modalTitle")
        }
      >
        {selectedPackage && (
          <>
            {isSubmitted ? (
              <div className={styles["success-message"]}>
                <div className={styles["success-message__icon"]}>✓</div>
                <h3 className={styles["success-message__title"]}>
                  {t("practicePage.successTitle")}
                </h3>
                <p className={styles["success-message__text"]}>
                  {t("practicePage.successText")}
                </p>
                <Button
                  type="button"
                  className={styles["success-message__button"]}
                  onClick={handleCloseModal}
                >
                  {t("practicePage.successButton")}
                </Button>
              </div>
            ) : (
              <form className={styles["modal-form"]} onSubmit={handleSubmit}>
                <div className={styles["modal-form__field"]}>
                  <label htmlFor="name" className={styles["modal-form__label"]}>
                    {t("practicePage.formName")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles["modal-form__input"]}
                    placeholder={t("practicePage.formNamePlaceholder")}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles["modal-form__field"]}>
                  <label
                    htmlFor="email"
                    className={styles["modal-form__label"]}
                  >
                    {t("practicePage.formEmail")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles["modal-form__input"]}
                    placeholder={t("practicePage.formEmailPlaceholder")}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles["modal-form__field"]}>
                  <label
                    htmlFor="phone"
                    className={styles["modal-form__label"]}
                  >
                    {t("practicePage.formPhone")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles["modal-form__input"]}
                    placeholder={t("practicePage.formPhonePlaceholder")}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles["modal-form__field"]}>
                  <label
                    htmlFor="practicePackage"
                    className={styles["modal-form__label"]}
                  >
                    {t("practicePage.formPackage")}
                  </label>
                  <input
                    type="text"
                    id="practicePackage"
                    name="practicePackage"
                    className={styles["modal-form__input"]}
                    value={`${selectedPackage.title} - ${selectedPackage.duration}`}
                    readOnly
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles["modal-form__checkbox-field"]}>
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    name="privacyConsent"
                    className={styles["modal-form__checkbox"]}
                    required
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="privacyConsent"
                    className={styles["modal-form__checkbox-label"]}
                  >
                    {t("practicePage.formPrivacyConsent")}
                  </label>
                </div>

                <Button
                  type="submit"
                  className={styles["modal-form__submit"]}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("practicePage.formSubmitting")
                    : t("practicePage.formSubmit")}
                </Button>
              </form>
            )}
          </>
        )}
      </Modal>
    </>
  );
}

export default PracticePage;
