"use client";

import SplashOnboarding from "@/components/splashOrOnboardingScreen/splashOnboarding";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken, setToken } from "@/utils/authStorage";

export default function HomeWrapper() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  // Step 1 — Pastikan React sudah mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 200); 
    return () => clearTimeout(timer);
  }, []);

  // Step 2 — Check login dengan try/catch FULL
  useEffect(() => {
    if (!ready) return;

    const checkLogin = async () => {
      try {
        let accessToken = null;

        try {
          accessToken = await getToken();
        } catch (err) {
          console.log("getToken gagal (ditangani):", err);
        }

        if (accessToken) {
          router.replace("/dashboard");
          return;
        }

        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        if (!apiBase) {
          console.error("API URL belum diset");
          return;
        }

        const res = await fetch(`${apiBase}/api/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          console.log("Refresh token gagal:", res.status);
          return;
        }

        const data = await res.json();

        if (data?.accessToken) {
          try {
            await setToken(data.accessToken);
          } catch (err) {
            console.log("setToken gagal:", err);
          }

          router.replace("/dashboard");
        }
      } catch (err) {
        console.error("FATAL: checkLogin error:", err);
      }
    };

    checkLogin();
  }, [ready]);

  return (
    <div className="w-full h-full relative">
      <SplashOnboarding />
    </div>
  );
}
