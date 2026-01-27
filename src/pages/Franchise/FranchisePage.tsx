import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal/Modal";
import { API_ENDPOINTS } from "../../config/api";
import styles from "./FranchisePage.module.scss";
import { useState } from "react";

import franchiseDogImage from "../../assets/images/image-franchise-dog.webp";

type FranchiseCard = {
  id: string;
  title: string;
  entryFeeLabel: string;
  entryFeeValue: string;
  royaltyLabel: string;
  royaltyValue: string;
  includedTitle: string;
  includedDescription: string;
  paybackLabel: string;
  paybackPeriod: string;
  buttonLabel: string;
};

type ModalFormData = {
  name: string;
  email: string;
  phone: string;
  franchisePackage: "Formate";
  privacyConsent: boolean;
};

const FRANCHISE: FranchiseCard[] = [
  {
    id: "formate",
    title: "Formate",
    entryFeeLabel: "Eintrittsgebühr",
    entryFeeValue: "15 000 €",
    royaltyLabel: "Honorar",
    royaltyValue: "5 % der Einnahmen",
    includedTitle: "Was ist inbegriffen?",
    includedDescription:
      "Marke, Geschäftsmodell, Hilfe beim Start, allgemeines Callcenter, Erwähnungen in sozialen Netzwerken und auf der Website, allgemeines Marketing, CRM, Teambildung.",
    paybackLabel: "Kapitalrendite",
    paybackPeriod: "3 bis 12 Monate",
    buttonLabel: "PRÄSENTATION",
  },
];

function FranchisePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<FranchiseCard | null>(
    null
  );

  const handleOpenModal = (course: FranchiseCard) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setIsSubmitted(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const franchiseBookingData: ModalFormData = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      franchisePackage: (formData.get("franchisePackage") || "Formate") as
        | "Formate",
      privacyConsent: Boolean(formData.get("privacyConsent")),
    };

    try {
      const response = await fetch(API_ENDPOINTS.FRANCHISE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(franchiseBookingData),
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
      <section className={styles.franchise}>
        <Container>
          {/* Top hero block */}
          <div className={styles["franchise__top"]}>
            <h1 className={styles["franchise__title"]}>
              Franchise mit Chica Groom
            </h1>
            <p className={styles["franchise__subtitle"]}>
              Werden Sie Partner einer etablierten Grooming-Marke und eröffnen
              Sie Ihren eigenen Hundesalon mit unserem erprobten Konzept.
            </p>
          </div>

          {/* Franchise card */}
          <div className={styles["franchise__cards"]}>
            <ul className={styles["franchise__list"]}>
              {FRANCHISE.map((franchise) => (
                <li className={styles["franchise__item"]} key={franchise.id}>
                  <article className={styles["franchise-card"]}>
                    <div className={styles["franchise-card__top"]}>
                      <h2 className={styles["franchise-card__title"]}>
                        {franchise.title}
                      </h2>

                      <p className={styles["franchise-card__fee"]}>
                        <span className={styles["franchise-card__label"]}>
                          {franchise.entryFeeLabel}
                        </span>
                        <span className={styles["franchise-card__value"]}>
                          {franchise.entryFeeValue}
                        </span>
                      </p>

                      <p className={styles["franchise-card__royalty"]}>
                        <span className={styles["franchise-card__label"]}>
                          {franchise.royaltyLabel}
                        </span>
                        <span className={styles["franchise-card__value"]}>
                          {franchise.royaltyValue}
                        </span>
                      </p>

                      <p className={styles["franchise-card__included-title"]}>
                        {franchise.includedTitle}
                      </p>
                      <p className={styles["franchise-card__description"]}>
                        {franchise.includedDescription}
                      </p>
                    </div>

                    <div className={styles["franchise-card__bottom"]}>
                      <p className={styles["franchise-card__period"]}>
                        <span className={styles["franchise-card__label"]}>
                          {franchise.paybackLabel}:
                        </span>{" "}
                        <span className={styles["franchise-card__value"]}>
                          {franchise.paybackPeriod}
                        </span>
                      </p>

                      <a
                        href="https://drive.google.com/file/d/1mOg_2YuNXVkF10jbbcYmq8tDGANtFL9y/view?pli=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles["franchise-info__link"]}
                      >
                        <Button
                          type="button"
                          className={styles["franchise-info__button"]}
                        >
                          PRÄSENTATION
                        </Button>
                      </a>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom info block "Über die Franchise" */}
          <div className={styles["franchise__bottom"]}>
            <div className={styles["franchise-info"]}>
              <h2 className={styles["franchise-info__title"]}>
                Über die Franchise
              </h2>
              <p className={styles["franchise-info__text"]}>
                Wir haben für Sie eine Präsentation vorbereitet, in der wir
                Ihnen die Franchise ausführlich vorstellen und alle wichtigen
                Fragen beantworten.
              </p>

              <ul className={styles["franchise-info__list"]}>
                <li>Was kann der Franchisenehmer erwarten?</li>
                <li>Was erhält der Franchisenehmer?</li>
                <li>Monatliche Zahlungen (Royalties)</li>
                <li>Anforderungen an den Franchisenehmer</li>
                <li>Rechte und Pflichten des Franchisenehmers</li>
                <li>Wie kauft man ein Franchise-Unternehmen?</li>
              </ul>

              <div className={styles["franchise-info__buttons"]}>
                <a
                  href="https://drive.google.com/file/d/1mOg_2YuNXVkF10jbbcYmq8tDGANtFL9y/view?pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["franchise-info__link"]}
                >
                  <Button
                    type="button"
                    className={styles["franchise-info__button"]}
                  >
                    PRÄSENTATION
                  </Button>
                </a>

                <Button
                  type="button"
                  className={styles["franchise-info__button"]}
                  onClick={() => {
                    if (FRANCHISE[0]) {
                      handleOpenModal(FRANCHISE[0]);
                    }
                  }}
                >
                  EINEN ANTRAG STELLEN
                </Button>
              </div>
            </div>

            <div className={styles["franchise__image-wrapper"]}>
              <img
                className={styles["franchise__image"]}
                src={franchiseDogImage}
                alt="Hund mit Quietscheente auf dem Kopf"
              />
            </div>
          </div>
        </Container>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isSubmitted ? "Erfolgreich gesendet!" : "Anmeldung"}
      >
        {selectedCourse && (
          <>
            {isSubmitted ? (
              <div className={styles["success-message"]}>
                <div className={styles["success-message__icon"]}>✓</div>
                <h3 className={styles["success-message__title"]}>
                  Vielen Dank für Ihre Anmeldung!
                </h3>
                <p className={styles["success-message__text"]}>
                  Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns in
                  Kürze mit Ihnen in Verbindung setzen.
                </p>
                <Button
                  type="button"
                  className={styles["success-message__button"]}
                  onClick={handleCloseModal}
                >
                  Schließen
                </Button>
              </div>
            ) : (
              <form className={styles["modal-form"]} onSubmit={handleSubmit}>
                {/* Name field */}
                <div className={styles["modal-form__field"]}>
                  <label htmlFor="name" className={styles["modal-form__label"]}>
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles["modal-form__input"]}
                    placeholder="Geben Sie Ihren vollständigen Namen ein"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email field */}
                <div className={styles["modal-form__field"]}>
                  <label
                    htmlFor="email"
                    className={styles["modal-form__label"]}
                  >
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles["modal-form__input"]}
                    placeholder="beispiel@email.de"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Phone field */}
                <div className={styles["modal-form__field"]}>
                  <label
                    htmlFor="phone"
                    className={styles["modal-form__label"]}
                  >
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles["modal-form__input"]}
                    placeholder="+49 123 456 7890"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Franchise package selection */}
                <div className={styles["modal-form__field"]}>
                  <label
                    htmlFor="franchisePackage"
                    className={styles["modal-form__label"]}
                  >
                    Franchise-Paket *
                  </label>
                  <select
                    id="franchisePackage"
                    name="franchisePackage"
                    className={styles["modal-form__select"]}
                    required
                    disabled={isSubmitting}
                    defaultValue="Formate"
                  >
                    <option value="Formate">Formate</option>
                  </select>
                </div>

                {/* Privacy consent */}
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
                    Ich stimme der Datenschutzerklärung zu und bin damit
                    einverstanden, dass meine Daten zur Bearbeitung meiner
                    Anfrage gespeichert werden. *
                  </label>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className={styles["modal-form__submit"]}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Wird gesendet..." : "Anmelden"}
                </Button>
              </form>
            )}
          </>
        )}
      </Modal>
    </>
  );
}

export default FranchisePage;
