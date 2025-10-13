"use client";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

type Props = PropsWithChildren<{
  as?: React.ElementType;
  delay?: number; // seconds
  className?: string;
}>;

export function Reveal({ as: Tag = "div", delay = 0, className, children }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={`reveal ${visible ? "in" : ""} ${className ?? ""}`}
      style={{ transitionDelay: `${delay}s` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
