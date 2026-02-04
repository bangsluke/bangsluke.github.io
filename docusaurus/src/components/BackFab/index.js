import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { useHistory } from "@docusaurus/router";

export default function BackFab() {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <button
      className={clsx("clean-btn", styles.backFab)}
      aria-label="Go back"
      type="button"
      onClick={handleGoBack}>
      <svg className={styles.backFabIcon} viewBox="0 0 24 24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
    </button>
  );
}
