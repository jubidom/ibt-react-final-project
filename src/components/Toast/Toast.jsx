import { useEffect } from "react";
import styles from "./Toast.module.css";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // auto-hide after 2s

    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className={styles.toast}>{message}</div>;
};

export default Toast;
