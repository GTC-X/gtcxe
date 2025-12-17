import React from "react";
import SalesRegistration from "../pages/SalesRegistration";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Register for the Lucky Draw | GTCFX",
  description:
    "On submit, they get assigned a unique Lucky Number and an OTP is sent to their email for verification.",
};

const page = () => {
  return (
    <>
      <SalesRegistration />
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default page;
