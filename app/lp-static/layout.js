import LpFooter from "./component/Footer";
import LpHeader from "./component/Header";
import "../globals.css";
import { Suspense } from "react";
import FallbackLoader from "../[locale]/components/LoadingSpinner";
import LayoutWrapper from "./LayoutWrapper";

export default function DashboardLayout({ children }) {
  return <LayoutWrapper children={children} />;
}
