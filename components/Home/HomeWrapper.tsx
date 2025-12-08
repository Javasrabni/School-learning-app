'use client';
import { useUser } from "@/context/userDataCookie";
import SplashOnboarding from "@/components/splashOrOnboardingScreen/splashOnboarding";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeWrapper() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard"); // pakai replace supaya history tidak menumpuk
    }
  }, [user, loading, router]);

  if (loading) return null; // atau loading spinner

  return (
    <div className="p-8 relative">
      <SplashOnboarding />
    </div>
  );
}
