import SplashOnboarding from "@/components/splashOrOnboardingScreen/splashOnboarding";
import Link from "next/link";

export default function Home() {

 
  return (
    <div className="p-8 relative">
      <SplashOnboarding />
      <p>tes</p>
      <Link href="/auth/register">LOGIN</Link>
    </div>
  );
}
