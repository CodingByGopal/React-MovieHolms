import { useEffect, useState, useRef } from "react";

const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;

    if (entry.isIntersecting) {
      setIsVisible(entry.isIntersecting);
    }
  };
  useEffect(() => {
    let observerRefValue = null;
    const elementObserver = new IntersectionObserver(callbackFunction, options);

    if (containerRef.current) {
      elementObserver.observe(containerRef.current);
      observerRefValue = containerRef.current;
    }

    return () => {
      if (observerRefValue) elementObserver.unobserve(observerRefValue);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};
export default useElementOnScreen;
