"use client";

import AuthFooter from "../components/AuthFooter";
import AuthNavbar from "../components/AuthNavbar";
import CheckEmail from "../components/CheckEmail";

export default function Page() {
  
  return (
    <div>
      <AuthNavbar />
      <CheckEmail />
      <AuthFooter />
    </div>
  );
}