import { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import { API_ENDPOINTS } from "../../config/api";
import styles from "./JobsPage.module.scss";

interface JobFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message: string;
  privacyConsent: boolean;
}

interface JobOpening {
  id: string;
  position: string;
  requirements: string[];
  benefits: string[];
  responsibilities?: string[];
}

const JobsPage = () => {
  const { t } = useTranslation();

  const jobs: JobOpening[] = [
    {
      id: "groomer",
      position: t("jobsPage.groomer.position"),
      requirements: t("jobsPage.groomer.requirements", {
        returnObjects: true,
      }) as string[],
      benefits: t("jobsPage.groomer.benefits", {
        returnObjects: true,
      }) as string[],
    },
    {
      id: "cleaner",
      position: t("jobsPage.cleaner.position"),
      requirements: t("jobsPage.cleaner.requirements", {
        returnObjects: true,
      }) as string[],
      benefits: t("jobsPage.cleaner.benefits", {
        returnObjects: true,
      }) as string[],
    },
    {
      id: "verwalter",
      position: t("jobsPage.verwalter.position"),
      requirements: t("jobsPage.verwalter.requirements", {
        returnObjects: true,
      }) as string[],
      responsibilities: t("jobsPage.verwalter.responsibilities", {
        returnObjects: true,
      }) as string[],
      benefits: [],
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    name: "",
    email: "",
    phone: "",
    position: "Groomer",
    experience: "",
    message: "",
    privacyConsent: false,
  });

  const openModal = () => {
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
      position: "Groomer",
      experience: "",
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
      const response = await fetch(API_ENDPOINTS.JOBS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.jobs}>
      {/* Hero Section */}
      <section className={styles.jobs__hero}>
        <Container>
          <h1>{t("jobsPage.heroTitle")}</h1>
          <p className={styles.jobs__subtitle}>{t("jobsPage.heroSubtitle")}</p>
        </Container>
      </section>

      {/* Job Openings */}
      <section className={styles.jobs__opening}>
        <Container>
          <div className={styles.jobsGrid}>
            {jobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobCard__header}>
                  <h2 className={styles.jobCard__title}>
                    {t("jobsPage.positionAvailable")}
                  </h2>
                  <h3 className={styles.jobCard__position}>{job.position}</h3>
                </div>

                <div className={styles.jobCard__body}>
                  <div className={styles.jobCard__section}>
                    <h4>{t("jobsPage.requirements")}</h4>
                    <ul>
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {job.responsibilities && job.responsibilities.length > 0 && (
                    <div className={styles.jobCard__section}>
                      <h4>{t("jobsPage.responsibilities")}</h4>
                      <ul>
                        {job.responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {job.benefits.length > 0 && (
                    <div className={styles.jobCard__section}>
                      <h4>{t("jobsPage.weOffer")}</h4>
                      <ul>
                        {job.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className={styles.jobCard__cta}>
                    <p>{t("jobsPage.ctaText")}</p>
                    <p className={styles.jobCard__ctaSubtext}>
                      {t("jobsPage.ctaSubtext")}
                    </p>
                  </div>
                </div>

                <div className={styles.jobCard__footer}>
                  <Button variant="primary" onClick={openModal}>
                    {t("jobsPage.applyButton")}
                  </Button>
                </div>
              </div>
            ))}
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
                  {t("jobsPage.modalTitle")}
                </h2>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                  <div className={styles.modalForm__field}>
                    <label htmlFor="name">{t("jobsPage.formName")}</label>
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
                    <label htmlFor="email">{t("jobsPage.formEmail")}</label>
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
                    <label htmlFor="phone">{t("jobsPage.formPhone")}</label>
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
                    <label htmlFor="position">
                      {t("jobsPage.formPosition")}
                    </label>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Groomer">
                        {t("jobsPage.groomer.position")}
                      </option>
                      <option value="Cleaner">
                        {t("jobsPage.cleaner.position")}
                      </option>
                      <option value="Verwalter">
                        {t("jobsPage.verwalter.position")}
                      </option>
                    </select>
                  </div>

                  <div className={styles.modalForm__field}>
                    <label htmlFor="experience">
                      {t("jobsPage.formExperience")}
                    </label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder={t("jobsPage.formExperiencePlaceholder")}
                      required
                    />
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
                      {t("jobsPage.formPrivacyConsent")}
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className={styles.modalForm__submit}
                  >
                    {t("jobsPage.formSubmit")}
                  </Button>
                </form>
              </>
            ) : (
              <div className={styles.successMessage}>
                <div className={styles.successMessage__icon}>✓</div>
                <h2>{t("jobsPage.successTitle")}</h2>
                <p>{t("jobsPage.successText")}</p>
                <Button variant="primary" onClick={closeModal}>
                  {t("jobsPage.successButton")}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
