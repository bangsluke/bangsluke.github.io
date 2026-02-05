import React, { useEffect, useRef, useState } from 'react';
import styles from './Tooltip.module.css';

export default function Tooltip({ text, definition }) {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const toggle = () => setVisible((prev) => !prev);

  useEffect(() => {
    if (!visible) return;

    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [visible]);

  return (
    <span className={styles.tooltipWrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.tooltipTrigger}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={toggle}
      >
        {text}
      </button>
      {visible && (
        <span className={styles.tooltipBubble} role="tooltip">
          {definition}
        </span>
      )}
    </span>
  );
}

