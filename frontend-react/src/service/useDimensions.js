import { useState, useRef, useEffect, useLayoutEffect } from "react";

export default function useDimensions() {
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDimensions({ width, height });
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, dimensions];
}
