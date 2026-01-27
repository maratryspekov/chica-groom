import { useState, type ChangeEvent } from "react";
import styles from "./BeforeAfterSlider.module.scss";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50); // 50% = slider in the middle

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPosition(Number(event.target.value));
  };

  return (
    <div className={styles.slider}>
      {/* "After" image - full background */}
      <img src={afterSrc} alt={afterAlt} className={styles["slider__image"]} />

      {/* "Before" image - on top, width depends on position */}
      <div
        className={styles["slider__overlay"]}
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className={styles["slider__image"]}
        />
      </div>

      {/* Vertical line + round handle */}
      <div
        className={styles["slider__divider"]}
        style={{ left: `${position}%` }}
      >
        <span className={styles["slider__handle"]} />
      </div>

      {/* Hidden range input that moves the line */}
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={handleChange}
        className={styles["slider__range"]}
        aria-label="Vorher-Nachher-Vergleich"
      />
    </div>
  );
}

export default BeforeAfterSlider;
