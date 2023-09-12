import { useState } from 'react';

export const useNotification = () => {
  const [message, setMessage] = useState({
    content: '',
    icon: '',
    error: false,
    show: false,
  });

  const handleShowMessage = (error, content,icon, duration = 2000) => {
    setMessage({ content, error,icon, show: true });
    setTimeout(() => {
      setMessage((prevMessage) => ({ ...prevMessage, show: false }));
    }, duration);
    // clearTimeout();
  };

  return {
    message,
    handleShowMessage,
  };
};
