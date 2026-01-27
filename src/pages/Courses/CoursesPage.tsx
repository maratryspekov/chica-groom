import { useState } from "react";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal/Modal";
import { postJSON } from "../../utils/api";
import { API_ENDPOINTS } from "../../config/api";
import styles from "./CoursesPage.module.scss";
import { useTranslation } from "react-i18next";

type CourseCard = {
  id: string; // 'basic' | 'pro'
  title: string;
  subtitle: string;
  currentPrice: number;
  oldPrice?: number;
  groupInfo: string;
  features: string[];
  extras: string[];
  schedule: string;
  description: string;
  buttonLabel: string;
};

type ModalFormData = {
  name: string;
  email: string;
  phone: string;
  coursePackage: "Basiskurs" | "Pro Grooming Kurs";
  privacyConsent: boolean;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

function CoursesPage() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // state for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseCard | null>(null);

  // Generate courses from translations
  const courses: CourseCard[] = [
    {
      id: "basic",
      title: t("coursesPage.basicCourse.title"),
      subtitle: t("coursesPage.basicCourse.subtitle"),
      currentPrice: t("coursesPage.basicCourse.currentPrice") as any,
      oldPrice: t("coursesPage.basicCourse.oldPrice") as any,
      groupInfo: t("coursesPage.basicCourse.groupInfo"),
      features: t("coursesPage.basicCourse.features", {
        returnObjects: true,
      }) as string[],
      extras: t("coursesPage.basicCourse.extras", {
        returnObjects: true,
      }) as string[],
      schedule: t("coursesPage.basicCourse.schedule"),
      description: t("coursesPage.basicCourse.description"),
      buttonLabel: t("coursesPage.basicCourse.buttonLabel"),
    },
    {
      id: "pro",
      title: t("coursesPage.proCourse.title"),
      subtitle: t("coursesPage.proCourse.subtitle"),
      currentPrice: t("coursesPage.proCourse.currentPrice") as any,
      oldPrice: t("coursesPage.proCourse.oldPrice") as any,
      groupInfo: t("coursesPage.proCourse.groupInfo"),
      features: t("coursesPage.proCourse.features", {
        returnObjects: true,
      }) as string[],
      extras: t("coursesPage.proCourse.extras", {
        returnObjects: true,
      }) as string[],
      schedule: t("coursesPage.proCourse.schedule"),
      description: t("coursesPage.proCourse.description"),
      buttonLabel: t("coursesPage.proCourse.buttonLabel"),
    },
  ];

  // Generate FAQ from translations
  const faqItems: FaqItem[] = t("coursesPage.faq", {
    returnObjects: true,
  }) as FaqItem[];

  const toggleFaq = (id: string) => {
    setOpenFaqId((current) => (current === id ? null : id));
  };

  const handleOpenModal = (course: CourseCard) => {
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

    const courseBookingData: ModalFormData = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      coursePackage: (formData.get("coursePackage") || "Basiskurs") as
        | "Basiskurs"
        | "Pro Grooming Kurs",
      privacyConsent: Boolean(formData.get("privacyConsent")),
    };

    try {
      await postJSON(API_ENDPOINTS.COURSES, courseBookingData);

      form.reset();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting course registration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className={styles.courses}>
        <Container>
          <h2 className={styles["courses__title"]}>
            {t("coursesPage.pageTitle")}
          </h2>

          {/* Course cards */}
          <div className={styles["courses__cards"]}>
            <ul className={styles["courses__list"]}>
              {courses.map((course) => (
                <li key={course.id} className={styles["courses__item"]}>
                  <article className={styles["courses-card"]}>
                    {/* Top part with title and prices */}
                    <div className={styles["courses-card__top"]}>
                      <h3 className={styles["courses-card__title"]}>
                        {course.title}
                      </h3>

                      <p className={styles["courses-card__subtitle"]}>
                        {course.subtitle}
                      </p>

                      <div className={styles["courses-card__prices"]}>
                        <span className={styles["courses-card__current-price"]}>
                          {course.currentPrice} Euro
                        </span>

                        {course.oldPrice && (
                          <span className={styles["courses-card__old-price"]}>
                            {course.oldPrice} Euro
                          </span>
                        )}
                      </div>

                      <span className={styles["courses-card__group-info"]}>
                        {course.groupInfo}
                      </span>
                    </div>

                    {/* Middle part with features and extras */}
                    <div className={styles["courses-card__body"]}>
                      <ul className={styles["courses-card__features"]}>
                        {course.features.map((item) => (
                          <li
                            key={item}
                            className={styles["courses-card__features-item"]}
                          >
                            <span
                              className={styles["courses-card__features-icon"]}
                            >
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <ul className={styles["courses-card__extras"]}>
                        {course.extras.map((extra) => (
                          <li
                            key={extra}
                            className={styles["courses-card__extras-item"]}
                          >
                            <span
                              className={styles["courses-card__extras-icon"]}
                            >
                              +
                            </span>
                            <span>{extra}</span>
                          </li>
                        ))}
                      </ul>

                      <p className={styles["courses-card__schedule"]}>
                        {course.schedule}
                      </p>
                    </div>

                    {/* Bottom part with description and button */}
                    <div className={styles["courses-card__bottom"]}>
                      <p className={styles["courses-card__description"]}>
                        {course.description}
                      </p>

                      <Button
                        type="button"
                        className={styles["courses-card__button"]}
                        onClick={() => handleOpenModal(course)}
                      >
                        {course.buttonLabel}
                      </Button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ block */}
          <div className={styles["courses__faq"]}>
            <h3 className={styles["faq__title"]}>
              {t("coursesPage.faqTitle")}
            </h3>

            <div className={styles["faq__list"]}>
              {faqItems.map((faq) => {
                const isOpen = openFaqId === faq.id;

                return (
                  <div key={faq.id} className={styles["faq__item"]}>
                    <button
                      type="button"
                      className={styles["faq__question"]}
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span
                        className={`${styles["faq__icon"]} ${
                          isOpen ? styles["faq__icon--open"] : ""
                        }`}
                      >
                        {isOpen ? "-" : "+"}
                      </span>
                    </button>

                    <div
                      className={`${styles["faq__answer"]} ${
                        isOpen ? styles["faq__answer--open"] : ""
                      }`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Modal – simple placeholder content for now */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          isSubmitted
            ? t("coursesPage.modalTitleSuccess")
            : t("coursesPage.modalTitle")
        }
      >
        {selectedCourse && (
          <>
            {isSubmitted ? (
              <div className={styles["success-message"]}>
                <div className={styles["success-message__icon"]}>
                  {t("coursesPage.successIcon")}
                </div>
                <h3 className={styles["success-message__title"]}>
                  {t("coursesPage.successTitle")}
                </h3>
                <p className={styles["success-message__text"]}>
                  {t("coursesPage.successText")}
                </p>
                <Button
                  type="button"
                  className={styles["success-message__button"]}
                  onClick={handleCloseModal}
                >
                  {t("coursesPage.closeButton")}
                </Button>
              </div>
            ) : (
              <form className={styles["modal-form"]} onSubmit={handleSubmit}>
                {/* Name field */}
                <div className={styles["modal-form__field"]}>
                  <label htmlFor="name" className={styles["modal-form__label"]}>
                    {t("coursesPage.formName")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles["modal-form__input"]}
                    placeholder={t("coursesPage.formNamePlaceholder")}
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
                    {t("coursesPage.formEmail")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles["modal-form__input"]}
                    placeholder={t("coursesPage.formEmailPlaceholder")}
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
                    {t("coursesPage.formPhone")} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles["modal-form__input"]}
                    placeholder={t("coursesPage.formPhonePlaceholder")}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Course package selection */}
                <div className={styles["modal-form__field"]}>
                  <label
                    htmlFor="coursePackage"
                    className={styles["modal-form__label"]}
                  >
                    {t("coursesPage.formCourseSelect")} *
                  </label>
                  <select
                    id="coursePackage"
                    name="coursePackage"
                    className={styles["modal-form__select"]}
                    required
                    disabled={isSubmitting}
                    defaultValue={
                      selectedCourse?.title === t("coursesPage.proCourse.title")
                        ? "Pro Grooming Kurs"
                        : "Basiskurs"
                    }
                  >
                    <option value="Basiskurs">
                      {t("coursesPage.basicCourse.title")}
                    </option>
                    <option value="Pro Grooming Kurs">
                      {t("coursesPage.proCourse.title")}
                    </option>
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
                    {t("coursesPage.formPrivacyConsent")} *
                  </label>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className={styles["modal-form__submit"]}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("coursesPage.formSubmitting")
                    : t("coursesPage.formSubmit")}
                </Button>
              </form>
            )}
          </>
        )}
      </Modal>
    </>
  );
}

export default CoursesPage;
