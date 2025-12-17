import axios from "axios";
import { useEffect, useState } from "react";

export const useLanguageHook = ({ locale, messages }) => {
  // Initialize with messages immediately to prevent flash of translation keys
  const [translation, settranslation] = useState(messages);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (locale == "en" || locale == "zh" || locale == "ar") {
      // For these locales, messages are already loaded, just ensure they're set
      if (translation !== messages) {
        settranslation(messages);
      }
      setLoading(false);
    } else {
      // For other locales, fetch from S3
      setLoading(true);
      axios
        .get(
          `https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/messages/${locale}.json`
        )
        .then((res) => {
          settranslation(res?.data);
          setLoading(false);
        })
        .catch(() => {
          // On error, keep the initial messages as fallback
          setLoading(false);
        });
    }
  }, [locale, messages]);

  return {
    translation,
    loading,
  };
};
