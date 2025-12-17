import React from "react";
import Link from "next/link";
import Image from "next/image";
import LocationContextProvider from "@/context/location-context";
import { RiGlobalFill } from "react-icons/ri";
import { GiRotaryPhone } from "react-icons/gi";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
const ToolFreeContact = () => {
  const t = useTranslations("about.contact-us")
  // Define an array of toll-free numbers with corresponding country flags and phone numbers
  const tollFreeNumbers = [
    {
      countryCode: "AE",
      phoneNumber: "800 667788",
      link: "tel:+971800667788",
      type: "global",
    },
    {
      countryCode: "US",
      phoneNumber: "646 585 5011",
      link: "tel:+16465855011",
      type: "global",
    },
    {
      countryCode: "GB",
      phoneNumber: "800 048 8461",
      link: "tel:+448000488461",
      type: "global",
    },
    {
      countryCode: "HK",
      phoneNumber: "2319 4360",
      link: "tel:+85223194360",
      type: "global",
    },
    {
      countryCode: "MX",
      phoneNumber: "800 283 3478",
      link: "tel:+528002833478",
      type: "global",
    },
    {
      countryCode: "CO",
      phoneNumber: "601 5086 288",
      link: "tel:+576015086288",
      type: "local",
    },
    {
      countryCode: "BR",
      phoneNumber: "213 5002 665",
      link: "tel:+552135002665",
      type: "local",
    },
    {
      countryCode: "SG",
      phoneNumber: "315 816 89",
      link: "tel:+6531581689",
      type: "local",
    },
    {
      countryCode: "IN",
      phoneNumber: "11 7181 6797",
      link: "tel:+911171816797",
      type: "local",
    },
  ];

  // Separate the toll-free numbers into global and local
  const globalTollFreeNumbers = tollFreeNumbers.filter(item => item.type === "global");
  const localTollFreeNumbers = tollFreeNumbers.filter(item => item.type === "local");

  return (
    <LocationContextProvider>
        <section className="main-content">
        <div className="max-w-6xl mx-auto">
          {/* WhatsApp Contact Section */}
            {/* WhatsApp Contact Section */}
        
          


      </div>
      </section>
    </LocationContextProvider>
  );
};

export default ToolFreeContact;
