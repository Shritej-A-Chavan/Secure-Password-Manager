export const dynamic = "force-dynamic";

import { Suspense } from "react";
import AuthFooter from "../components/AuthFooter";
import AuthNavbar from "../components/AuthNavbar";
import CheckEmail from "../components/CheckEmail";

export default function Page() {
  
  return (
    <div>
      <AuthNavbar />
      <Suspense fallback={<div>Loading...</div>}>
        <CheckEmail />
      </Suspense>
      <AuthFooter />
    </div>
  );
}