"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InfiniteCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  visibleCount?: { default: number; md?: number; lg?: number };
  autoPlayInterval?: number;
  className?: string;
}

export default function InfiniteCarousel<T>({
  items,
  renderItem,
  visibleCount = { default: 1, md: 2, lg: 3 },
  autoPlayInterval = 4000,
  className,
}: InfiniteCarouselProps<T>) {
  const [currentVisible, setCurrentVisible] = useState<number>(
    visibleCount.default
  );
  const [position, setPosition] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const positionRef = useRef(position);
  positionRef.current = position;
  const rewindingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024)
        setCurrentVisible(
          visibleCount.lg ?? visibleCount.md ?? visibleCount.default
        );
      else if (w >= 768)
        setCurrentVisible(visibleCount.md ?? visibleCount.default);
      else setCurrentVisible(visibleCount.default);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visibleCount]);

  if (!items.length) return null;

  const totalReal = items.length;
  const renderedItems = [...items, ...items, ...items];
  const slideWidth = 100 / currentVisible;
  const middleSet = totalReal;

  const handleAnimationComplete = useCallback(() => {
    if (rewindingRef.current) return;
    const pos = positionRef.current;
    if (pos >= middleSet * 2) {
      rewindingRef.current = true;
      setAnimate(false);
      setPosition(pos - middleSet);
    } else if (pos < middleSet) {
      rewindingRef.current = true;
      setAnimate(false);
      setPosition(pos + middleSet);
    }
  }, [middleSet]);

  useEffect(() => {
    if (!animate && rewindingRef.current) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          rewindingRef.current = false;
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [animate]);

  const goNext = useCallback(() => {
    setPosition((p) => p + 1);
  }, []);

  const goPrev = useCallback(() => {
    setPosition((p) => p - 1);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [goNext, autoPlayInterval, isPaused]);

  const goTo = useCallback(
    (index: number) => {
      setAnimate(true);
      setPosition(middleSet + index);
    },
    [middleSet]
  );

  useEffect(() => {
    if (totalReal > 0 && position === 0) {
      setPosition(middleSet);
    }
  }, [totalReal, middleSet, position]);

  return (
    <div
      className={cn("relative group", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden rounded-2xl">
        <motion.div
          className="flex"
          animate={{ x: `-${position * slideWidth}%` }}
          transition={
            animate
              ? { duration: 0.6, ease: "easeInOut" }
              : { duration: 0 }
          }
          onAnimationComplete={handleAnimationComplete}
        >
          {renderedItems.map((item, i) => (
            <div
              key={i}
              className="shrink-0 px-2"
              style={{ width: `${slideWidth}%` }}
            >
              {renderItem(item, i)}
            </div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={goPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm border border-black/10 shadow-md flex items-center justify-center text-black/50 hover:text-black hover:bg-white hover:shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100"
        aria-label="Previous"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm border border-black/10 shadow-md flex items-center justify-center text-black/50 hover:text-black hover:bg-white hover:shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100"
        aria-label="Next"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              i === position % totalReal
                ? "bg-black/60 w-5"
                : "bg-black/20 hover:bg-black/30"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
