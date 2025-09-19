import { useState, useEffect } from "react";
import { ContactForm } from "./ContactForm";

export const AutoPopupForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if the popup has already been shown in this session
    const hasPopupShown = sessionStorage.getItem("popupShown");
    if (!hasPopupShown && !hasShown) {
      const timer = setTimeout(() => {
        setIsFormOpen(true);
        setHasShown(true);
        sessionStorage.setItem("popupShown", "true");
      }, 6000); // 6 seconds delay

      return () => clearTimeout(timer);
    }
  }, [hasShown]);

  return (
    <ContactForm
      isOpen={isFormOpen}
      onClose={() => setIsFormOpen(false)}
      title="Register here and Avail the Pre-launch offer!!"
    />
  );
};
