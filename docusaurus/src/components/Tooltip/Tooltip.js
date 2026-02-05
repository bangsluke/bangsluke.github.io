import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './Tooltip.module.css';

const GAP = 6;
const VIEWPORT_PAD = 8;

export default function Tooltip({ text, definition }) {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);
  const bubbleRef = useRef(null);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const toggle = () => setVisible((prev) => !prev);

  useLayoutEffect(() => {
    if (!visible || !wrapperRef.current || !bubbleRef.current) return;

    const wr = wrapperRef.current.getBoundingClientRect();
    const br = bubbleRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const spaceAbove = wr.top;
    const spaceBelow = vh - wr.bottom;
    const showAbove = spaceAbove >= spaceBelow || spaceAbove >= br.height + GAP;

    // Clamp horizontal position so bubble stays within viewport
    let leftVw = wr.left + wr.width / 2 - br.width / 2;
    leftVw = Math.max(VIEWPORT_PAD, Math.min(leftVw, vw - br.width - VIEWPORT_PAD));
    const leftWrapper = leftVw - wr.left;

    const bubble = bubbleRef.current;
    bubble.style.left = `${leftWrapper}px`;
    bubble.style.transform = 'translateX(0)';
    bubble.style.right = 'auto';

    if (showAbove) {
      bubble.style.bottom = 'auto';
      bubble.style.top = `${-br.height - GAP}px`;
      bubble.setAttribute('data-placement', 'above');
    } else {
      bubble.style.bottom = 'auto';
      bubble.style.top = `${wr.height + GAP}px`;
      bubble.setAttribute('data-placement', 'below');
    }
  }, [visible, definition]);

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
        <span ref={bubbleRef} className={styles.tooltipBubble} role="tooltip">
          {definition}
        </span>
      )}
    </span>
  );
}

