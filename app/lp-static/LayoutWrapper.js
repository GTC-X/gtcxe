"use client";
import { Suspense } from "react";
import FallbackLoader from "../[locale]/components/LoadingSpinner";
import LpFooter from "./component/Footer";
import LpHeader from "./component/Header";
import { usePathname } from "next/navigation";

const LayoutWrapper = ({ children }) => {
  const pathName = usePathname(); // Access the router

  // Ensure the router and path-related logic runs only after mounting
  const isStaticPath = pathName?.includes("invitation-registration");
  return (
    <html>
      <body>
        <Suspense fallback={<FallbackLoader />}>
          {!isStaticPath && <LpHeader />}
          <main className="bg-white">{children}</main>
          {!isStaticPath && <LpFooter />}
        </Suspense>
      </body>
    </html>
  );
};

export default LayoutWrapper;
