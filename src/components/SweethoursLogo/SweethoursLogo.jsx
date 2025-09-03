import styles from "./SweethoursLogo.module.css";

export default function SweethoursLogo({
  variant = "wordmark",
  size = 32,
  accent = "aqua",   
  mono = false,
}) {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.icon}
    >
      {/* Shopping bag */}
      <path
        d="M6 7h12l-1 12H7L6 7z"
        stroke={mono ? "currentColor" : accent}
        strokeWidth="2"
        fill="none"
      />
      {/* Clock inside bag */}
      <circle
        cx="12"
        cy="13"
        r="3"
        stroke={mono ? "currentColor" : accent}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 13V11.5M12 13h1.5"
        stroke={mono ? "currentColor" : accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === "icon") return icon;

  if (variant === "stacked") {
    return (
      <div className={styles.stacked}>
        {icon}
        <span
          className={styles.text}
          style={{ color: mono ? "currentColor" : accent }}
        >
          Sweethours
        </span>
      </div>
    );
  }

  return (
    <div className={styles.wordmark}>
      {icon}
      <span
        className={styles.text}
        style={{ color: mono ? "currentColor" : accent }}
      >
        Sweethours
      </span>
    </div>
  );
}


