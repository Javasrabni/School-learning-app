import SignedPage from "@/components/signedPage/SignedPage";
import SplashOnboarding from "@/components/splashOrOnboardingScreen/splashOnboarding";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  const loggedIn = Boolean(token)

  if(!loggedIn) {
    return <SplashOnboarding />
  }
  
 return <SignedPage/>
}
