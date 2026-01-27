import { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import { API_ENDPOINTS } from "../../config/api";
import styles from "./WorkplaceRentalPage.module.scss";
import workplaceImage1 from "../../assets/images/image-work-place.png";

const workplaceImage2 =
  "https://optim.tildacdn.net/tild3562-6237-4165-b538-623732656637/-/format/webp/IMG_6059.PNG.webp";

interface ModalFormData {
  name: string;
  email: string;
  phone: string;
  rentalPackage: string;
  message: string;
  privacyConsent: boolean;
}

interface Package {
  id: string;
  title: string;
  price: string;
  pricePerHour: string;
  description: string;
  features: string[];
}

const WorkplaceRentalPage = () => {
  const { t } = useTranslation();

  const packages: Package[] = [
    {
      id: "starter",
      title: t("workplaceRentalPage.starterPackage.title"),
      price: t("workplaceRentalPage.starterPackage.price"),
      pricePerHour: t("workplaceRentalPage.starterPackage.pricePerHour"),
      description: t("workplaceRentalPage.starterPackage.description"),
      features: t("workplaceRentalPage.starterPackage.features", {
        returnObjects: true,
      }) as string[],
    },
    {
      id: "optimal",
      title: t("workplaceRentalPage.optimalPackage.title"),
      price: t("workplaceRentalPage.optimalPackage.price"),
      pricePerHour: t("workplaceRentalPage.optimalPackage.pricePerHour"),
      description: t("workplaceRentalPage.optimalPackage.description"),
      features: t("workplaceRentalPage.optimalPackage.features", {
        returnObjects: true,
      }) as string[],
    },
    {
      id: "professional",
      title: t("workplaceRentalPage.professionalPackage.title"),
      price: t("workplaceRentalPage.professionalPackage.price"),
      pricePerHour: t("workplaceRentalPage.professionalPackage.pricePerHour"),
      description: t("workplaceRentalPage.professionalPackage.description"),
      features: t("workplaceRentalPage.professionalPackage.features", {
        returnObjects: true,
      }) as string[],
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ModalFormData>({
    name: "",
    email: "",
    phone: "",
    rentalPackage: "",
    message: "",
    privacyConsent: false,
  });

  const openModal = (packageTitle: string) => {
    setSelectedPackage(packageTitle);
    setFormData((prev) => ({ ...prev, rentalPackage: packageTitle }));
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      rentalPackage: "",
      message: "",
      privacyConsent: false,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;
    const name = target.name;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINTS.WORKPLACE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <div className={styles.workplace}>
      {/* Hero Section */}
      <section className={styles.workplace__hero}>
        <Container>
          <h1>{t("workplaceRentalPage.heroTitle")}</h1>
          <p className={styles.workplace__subtitle}>
            {t("workplaceRentalPage.heroSubtitle")}
          </p>
          <p className={styles.workplace__description}>
            {t("workplaceRentalPage.heroDescription")}
          </p>
          <div className={styles.workplace__imagesGrid}>
            <div className={styles.workplace__imageItem}>
              <img
                src={workplaceImage1}
                alt={t("workplaceRentalPage.imageAlt1")}
              />
            </div>
            <div className={styles.workplace__imageItem}>
              <img
                src={workplaceImage2}
                alt={t("workplaceRentalPage.imageAlt2")}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Packages Section */}
      <section className={styles.workplace__packages}>
        <Container>
          <div className={styles.workplace__packagesGrid}>
            {packages.map((pkg) => (
              <div key={pkg.id} className={styles.workplaceCard}>
                <div className={styles.workplaceCard__header}>
                  <h3 className={styles.workplaceCard__title}>{pkg.title}</h3>
                  <div className={styles.workplaceCard__price}>
                    <span className={styles.workplaceCard__priceMain}>
                      {pkg.price}
                    </span>
                    <span className={styles.workplaceCard__priceHour}>
                      {pkg.pricePerHour}
                    </span>
                  </div>
                </div>
                <p className={styles.workplaceCard__description}>
                  {pkg.description}
                </p>
                <div className={styles.workplaceCard__features}>
                  <strong>{t("workplaceRentalPage.included")}</strong>
                  <ul>
                    {pkg.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant="primary"
                  onClick={() => openModal(pkg.title)}
                  className={styles.workplaceCard__button}
                >
                  {t("workplaceRentalPage.applyButton")}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Important Info */}
      <section className={styles.workplace__info}>
        <Container>
          <div className={styles.workplace__note}>
            <p>
              <strong>{t("workplaceRentalPage.importantNote")}</strong>{" "}
              {t("workplaceRentalPage.importantText")}
            </p>
          </div>
        </Container>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modal__content}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modal__close} onClick={closeModal}>
              ×
            </button>

            {!isSubmitted ? (
              <>
                <h2 className={styles.modal__title}>
                  {t("workplaceRentalPage.modalTitle")} {selectedPackage}
                </h2>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                  <div className={styles.modalForm__field}>
                    <label htmlFor="name">
                      {t("workplaceRentalPage.formName")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.modalForm__field}>
                    <label htmlFor="email">
                      {t("workplaceRentalPage.formEmail")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.modalForm__field}>
                    <label htmlFor="phone">
                      {t("workplaceRentalPage.formPhone")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.modalForm__field}>
                    <label htmlFor="rentalPackage">
                      {t("workplaceRentalPage.formPackage")}
                    </label>
                    <select
                      id="rentalPackage"
                      name="rentalPackage"
                      value={formData.rentalPackage}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">
                        {t("workplaceRentalPage.formPackagePlaceholder")}
                      </option>
                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.title}>
                          {pkg.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.modalForm__checkboxField}>
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="privacyConsent">
                      {t("workplaceRentalPage.formPrivacyConsent")}
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className={styles.modalForm__submit}
                  >
                    {t("workplaceRentalPage.formSubmit")}
                  </Button>
                </form>
              </>
            ) : (
              <div className={styles.successMessage}>
                <div className={styles.successMessage__icon}>✓</div>
                <h2>{t("workplaceRentalPage.successTitle")}</h2>
                <p>{t("workplaceRentalPage.successText")}</p>
                <Button variant="primary" onClick={closeModal}>
                  {t("workplaceRentalPage.successButton")}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkplaceRentalPage;
