"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

function page() {
  const searchparams = useSearchParams();
  const access_token = searchparams.get("access_token");
  const router = useRouter();
  console.log(access_token);
  console.log(process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL);

  useEffect(() => {
    async function request() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/auth/google/callback?access_token=${access_token}`
      );
      const json = await response.json();
      console.log(json);
      router.replace("/");
    }
    request();
  }, [searchparams]);

  return <div>Loading...</div>;
}

export default page;