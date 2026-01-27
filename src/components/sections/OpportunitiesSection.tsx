import Container from "../common/Container";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./OpportunitiesSection.module.scss";
import groomingCourse from "../../assets/images/image-course.png";
import frenchise from "../../assets/images/image-frenchise.png";
import jobs from "../../assets/images/image-job.png";
import workPlace from "../../assets/images/image-work-place.png";

type Opportunity = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  ctaKey: string;
  link: string;
  image: string;
  imageAlt: string;
};

const OPPORTUNITIES_DATA: Opportunity[] = [
  {
    id: "kurs",
    titleKey: "opportunities.courses.title",
    descriptionKey: "opportunities.courses.description",
    ctaKey: "opportunities.courses.cta",
    link: "/courses",
    image: groomingCourse,
    imageAlt: "Grooming course with dog",
  },
  {
    id: "franchise",
    titleKey: "opportunities.franchise.title",
    descriptionKey: "opportunities.franchise.description",
    ctaKey: "opportunities.franchise.cta",
    link: "/franchise",
    image: frenchise,
    imageAlt: "Groomer franchise illustration",
  },
  {
    id: "jobs",
    titleKey: "opportunities.jobs.title",
    descriptionKey: "opportunities.jobs.description",
    ctaKey: "opportunities.jobs.cta",
    link: "/jobs",
    image: jobs,
    imageAlt: "Happy groomer team member",
  },
  {
    id: "workspace",
    titleKey: "opportunities.workplace.title",
    descriptionKey: "opportunities.workplace.description",
    ctaKey: "opportunities.workplace.cta",
    link: "/workplace",
    image: workPlace,
    imageAlt: "Grooming workplace and table",
  },
];

function OpportunitiesSection() {
  const { t } = useTranslation();

  return (
    <section id="opportunities" className={styles.opportunities}>
      <Container>
        <header className={styles["opportunities__header"]}>
          <h2 className={styles["opportunities__title"]}>
            {t("opportunities.title")}
          </h2>
        </header>

        <ul className={styles["opportunities__list"]}>
          {OPPORTUNITIES_DATA.map((opportunity) => (
            <li key={opportunity.id} className={styles["opportunities__item"]}>
              <article className={styles["opportunity-card"]}>
                <div className={styles["opportunity-card__right"]}>
                  <h3 className={styles["opportunity-card__name"]}>
                    {t(opportunity.titleKey)}
                  </h3>
                  <p className={styles["opportunity-card__description"]}>
                    {t(opportunity.descriptionKey)}
                  </p>
                  <Link
                    to={opportunity.link}
                    className={styles["opportunity-card__link"]}
                  >
                    <span className={styles["opportunity-card__link-text"]}>
                      {t(opportunity.ctaKey)}
                    </span>
                  </Link>
                </div>
                <div className={styles["opportunity-card__left"]}>
                  <img
                    className={styles["opportunity-card__image"]}
                    src={opportunity.image}
                    alt={opportunity.imageAlt}
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default OpportunitiesSection;
