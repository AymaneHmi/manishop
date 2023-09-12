import { useState, useEffect } from 'react';

const useCookie = (cookieName) => {
  const [cookieValue, setCookieValue] = useState(undefined);

  useEffect(() => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith(`${cookieName}=`));

    if (cookie) {
      const [, value] = cookie.split('=');
      setCookieValue(value);
    } else {
      setCookieValue(undefined);
    }
  }, [cookieName]);

  return cookieValue;
};

export default useCookie;