import { useEffect, useState } from "react";

let cachedGeoData = null;
let geoFetchPromise = null;

const fetchGeoInfo = async () => {
  if (cachedGeoData) {
    return cachedGeoData;
  }

  if (!geoFetchPromise) {
    geoFetchPromise = fetch("https://ipinfo.io/json")
      .then((response) => response.json())
      .then((data) => {
        cachedGeoData = data;
        return data;
      })
      .catch((error) => {
        console.log({ error });
        return null;
      })
      .finally(() => {
        geoFetchPromise = null;
      });
  }

  return geoFetchPromise;
};

export const useLocationDetail = () => {
  const [countryCode, setCountryCode] = useState(cachedGeoData?.country ?? null);
  const [countryData, setCountryData] = useState(cachedGeoData ?? null);

  useEffect(() => {
    let isMounted = true;

    if (typeof window === "undefined") {
      return () => {
        isMounted = false;
      };
    }

    fetchGeoInfo().then((data) => {
      if (!isMounted || !data) return;
      setCountryCode(data?.country ?? null);
      setCountryData(data);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    countryCode,
    countryData,
  };
};