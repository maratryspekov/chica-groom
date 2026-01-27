import type { ReactNode, MouseEvent } from "react";
import { useEffect, useRef } from "react";
import styles from "./Modul.module.scss";
import closeIcon from "../../../assets/icons/icon-close.svg";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");

      // Focus first focusable element
      setTimeout(() => {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }, 100);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, onClose]);

  // If closed – don't render anything
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    // Close only if user clicked on the overlay, not on the content
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      ref={modalRef}
    >
      <div className={styles["modal__overlay"]} onClick={handleOverlayClick}>
        <div
          className={styles["modal__content"]}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className={styles["modal__close"]}
            onClick={onClose}
            aria-label="Modal schließen"
          >
            <img src={closeIcon} alt="" />
          </button>

          {title && (
            <h2 id="modal-title" className={styles["modal__title"]}>
              {title}
            </h2>
          )}

          <div className={styles["modal__body"]}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
