import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export const NotificationHandler = ({
  textToShow,
  color,
  delay = 1000,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);
  const notifyRef = useRef(null);

  useEffect(() => {
    if (textToShow) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [textToShow]);

  useEffect(() => {
    if (!visible) return;
    gsap.set(notifyRef.current, { y: -300, opacity: 0 });
    gsap.to(notifyRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
    const timer = setTimeout(() => {
      gsap.to(notifyRef.current, {
        y: -300,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setVisible(false);
          if (onClose) onClose();
        },
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [visible, delay, onClose]);

  if (!visible || !textToShow) return null;

  const colorClasses = {
    green: "text-green-500",
    orange: "text-orange-500",
    red: "text-red-500",
    blue: "text-blue-500",
  };

  const borderColorClasses = {
    green: "border-green-500",
    orange: "border-orange-500",
    red: "border-red-500",
    blue: "border-blue-500",
  };

  const bgColorClasses = {
    green: "bg-green-900/20",
    orange: "bg-orange-500/20",
    red: "bg-red-900/20",
    blue: "bg-blue-500/20",
  };

  return (
    <div
      ref={notifyRef}
      className={`absolute top-25 right-5 z-30 border-2  rounded-2xl ${borderColorClasses[color]} ${bgColorClasses[color]}`}
    >
      <div className="p-4 rounded-xl shadow-lg">
        <h2 className={colorClasses[color]}>{textToShow}</h2>
      </div>
    </div>
  );
};
