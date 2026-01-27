import { useState } from "react";
import styles from "./FloatingContactButton.module.scss";

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.floatingBtn}>
      <input
        type="checkbox"
        className={styles.floatingBtn__input}
        id="floating-contact-btn"
        checked={isOpen}
        onChange={toggleMenu}
      />
      <label
        htmlFor="floating-contact-btn"
        className={styles.floatingBtn__label}
      >
        <svg
          role="presentation"
          className={`${styles.floatingBtn__icon} ${styles.floatingBtn__iconWrite}`}
          width="35"
          height="32"
          viewBox="0 0 35 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2667 12.6981H23.3667M11.2667 16.4717H23.3667M4.8104 23.5777C2.4311 21.1909 1 18.1215 1 14.7736C1 7.16679 8.38723 1 17.5 1C26.6128 1 34 7.16679 34 14.7736C34 22.3804 26.6128 28.5472 17.5 28.5472C15.6278 28.5472 13.8286 28.2868 12.1511 27.8072L12 27.7925L5.03333 31V23.8219L4.8104 23.5777Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <svg
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className={`${styles.floatingBtn__icon} ${styles.floatingBtn__iconClose}`}
          viewBox="0 0 23 23"
        >
          <g fillRule="evenodd">
            <path
              d="M10.314 -3.686H12.314V26.314H10.314z"
              transform="rotate(-45 11.314 11.314)"
            />
            <path
              d="M10.314 -3.686H12.314V26.314H10.314z"
              transform="rotate(45 11.314 11.314)"
            />
          </g>
        </svg>
      </label>

      {/* Contact Links */}
      <a
        href="tel:+4915202433344"
        className={`${styles.floatingBtn__iconLink} ${styles.floatingBtn__iconPhone}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <span className={styles.floatingBtn__text}>Phone</span>
        <div className={styles.floatingBtn__svgWrapper}>
          <div className={styles.floatingBtn__svgBg}></div>
          <svg
            className={styles.floatingBtn__svg}
            role="presentation"
            width="50px"
            height="50px"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM50.0089 29H51.618C56.4915 29.0061 61.1633 30.9461 64.6073 34.3938C68.0512 37.8415 69.9856 42.5151 69.9856 47.3879V48.9968C69.9338 49.5699 69.6689 50.1027 69.2433 50.49C68.8177 50.8772 68.2623 51.0908 67.6868 51.0884H67.5029C66.8966 51.0358 66.3359 50.745 65.9437 50.2796C65.5516 49.8143 65.36 49.2124 65.4109 48.6061V47.3879C65.4109 43.7303 63.9578 40.2225 61.3711 37.6362C58.7844 35.0499 55.2761 33.597 51.618 33.597H50.3997C49.79 33.6488 49.1847 33.4563 48.7169 33.0619C48.2492 32.6675 47.9573 32.1035 47.9054 31.4939C47.8536 30.8843 48.0461 30.279 48.4406 29.8114C48.835 29.3437 49.3992 29.0518 50.0089 29ZM56.889 49.0132C56.4579 48.5821 56.2157 47.9975 56.2157 47.3879C56.2157 46.1687 55.7313 44.9994 54.869 44.1373C54.0068 43.2752 52.8374 42.7909 51.618 42.7909C51.0083 42.7909 50.4236 42.5488 49.9925 42.1177C49.5614 41.6867 49.3192 41.102 49.3192 40.4924C49.3192 39.8828 49.5614 39.2982 49.9925 38.8672C50.4236 38.4361 51.0083 38.1939 51.618 38.1939C54.0568 38.1939 56.3956 39.1626 58.1201 40.8868C59.8445 42.611 60.8133 44.9495 60.8133 47.3879C60.8133 47.9975 60.5711 48.5821 60.14 49.0132C59.7089 49.4442 59.1242 49.6864 58.5145 49.6864C57.9048 49.6864 57.3201 49.4442 56.889 49.0132ZM66.4011 69.0663L66.401 69.0846C66.3999 69.5725 66.2967 70.0547 66.0981 70.5003C65.8998 70.9451 65.611 71.3435 65.2499 71.67C64.8674 72.0182 64.4123 72.2771 63.9176 72.428C63.4516 72.5702 62.9613 72.6132 62.4782 72.5546C58.2475 72.53 53.4102 70.5344 49.1802 68.1761C44.8871 65.7827 41.0444 62.915 38.8019 60.9903L38.7681 60.9613L38.7367 60.9299C32.3303 54.5198 28.2175 46.1735 27.0362 37.186C26.9623 36.6765 27.0018 36.157 27.1519 35.6645C27.3027 35.1695 27.5615 34.7142 27.9094 34.3314C28.2397 33.9658 28.6436 33.6742 29.0944 33.4757C29.5447 33.2775 30.0316 33.1766 30.5234 33.1796H37.4967C38.299 33.1636 39.0826 33.4244 39.7156 33.9184C40.3527 34.4156 40.7979 35.1184 40.9754 35.9071L41.0038 36.0335V36.1631C41.0038 36.4901 41.0787 36.795 41.1847 37.2268C41.2275 37.4012 41.2755 37.5965 41.3256 37.8221L41.326 37.8238C41.583 38.9896 41.925 40.1351 42.3491 41.251L42.7322 42.259L38.4899 44.26L38.4846 44.2625C38.204 44.3914 37.986 44.6263 37.8784 44.9157L37.8716 44.934L37.8642 44.952C37.7476 45.236 37.7476 45.5545 37.8642 45.8385L37.9144 45.9608L37.9359 46.0912C38.0802 46.9648 38.5603 48.0981 39.4062 49.4169C40.243 50.7215 41.3964 52.1437 42.808 53.5872C45.6206 56.4634 49.3981 59.3625 53.5798 61.5387C53.8533 61.6395 54.1552 61.6343 54.4257 61.5231L54.4437 61.5157L54.462 61.5089C54.7501 61.4016 54.9842 61.1848 55.1133 60.9057L55.1148 60.9023L57.0232 56.6591L58.0397 57.03C59.1934 57.4509 60.3737 57.7947 61.5729 58.0592L61.5785 58.0605L61.5841 58.0618C62.152 58.1929 62.7727 58.3042 63.3802 58.3942L63.4231 58.4006L63.4654 58.4101C64.2537 58.5877 64.956 59.0332 65.453 59.6706C65.9429 60.2991 66.2033 61.0758 66.1916 61.8721L66.4011 69.0663Z"
              fill="#000"
            />
          </svg>
        </div>
      </a>

      <a
        href="https://t.me/mepmeps"
        className={`${styles.floatingBtn__iconLink} ${styles.floatingBtn__iconTelegram}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <span className={styles.floatingBtn__text}>Telegram</span>
        <div className={styles.floatingBtn__svgWrapper}>
          <div className={styles.floatingBtn__svgBg}></div>
          <svg
            className={styles.floatingBtn__svg}
            role="presentation"
            width="50px"
            height="50px"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50Zm21.977-68.056c.386-4.38-4.24-2.576-4.24-2.576-3.415 1.414-6.937 2.85-10.497 4.302-11.04 4.503-22.444 9.155-32.159 13.734-5.268 1.932-2.184 3.864-2.184 3.864l8.351 2.577c3.855 1.16 5.91-.129 5.91-.129l17.988-12.238c6.424-4.38 4.882-.773 3.34.773l-13.49 12.882c-2.056 1.804-1.028 3.35-.129 4.123 2.55 2.249 8.82 6.364 11.557 8.16.712.467 1.185.778 1.292.858.642.515 4.111 2.834 6.424 2.319 2.313-.516 2.57-3.479 2.57-3.479l3.083-20.226c.462-3.511.993-6.886 1.417-9.582.4-2.546.705-4.485.767-5.362Z"
              fill="#1d98dc"
            />
          </svg>
        </div>
      </a>

      <a
        href="https://wa.me/4915202433344"
        className={`${styles.floatingBtn__iconLink} ${styles.floatingBtn__iconWhatsapp}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <span className={styles.floatingBtn__text}>WhatsApp</span>
        <div className={styles.floatingBtn__svgWrapper}>
          <div className={styles.floatingBtn__svgBg}></div>
          <svg
            role="presentation"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="#25D366" />
            <path
              d="M25.5 11C17.5 11 11 17.5 11 25.5C11 28.3 11.8 30.9 13.2 33.1L11 39L17.1 36.8C19.2 38.1 21.7 39 24.5 39C32.5 39 39 32.5 39 24.5C39 16.5 32.5 11 25.5 11ZM32.7 30.2C32.4 31.1 31 32 30.2 32.2C29.6 32.3 28.8 32.4 27.9 32.1C27.2 31.9 26.3 31.6 25.2 31.1C20.9 29.3 18 25.1 17.8 24.8C17.6 24.5 16 22.5 16 20.4C16 18.3 17.1 17.3 17.5 16.8C17.9 16.3 18.3 16.3 18.6 16.3C18.8 16.3 19.1 16.3 19.3 16.3C19.5 16.3 19.8 16.2 20.1 16.9L21.4 20C21.5 20.2 21.6 20.5 21.4 20.7C21.2 21 21.1 21.2 20.9 21.4C20.7 21.6 20.5 21.9 20.3 22C20.1 22.2 19.9 22.4 20.1 22.8C20.3 23.2 21.1 24.5 22.3 25.5C23.9 26.9 25.2 27.3 25.6 27.5C26 27.7 26.2 27.7 26.4 27.4C26.6 27.2 27.5 26.1 27.7 25.7C27.9 25.3 28.2 25.4 28.5 25.5C28.9 25.6 31 26.7 31.4 26.9C31.8 27.1 32.1 27.2 32.2 27.4C32.3 27.6 32.3 28.5 32 29.1C31.8 29.6 32.9 29.5 32.7 30.2Z"
              fill="white"
            />
          </svg>
        </div>
      </a>
    </div>
  );
};

export default FloatingContactButton;
