'use client';
import { useUser } from "@/context/userDataCookie";
import SignedPage from "@/components/signedPage/SignedPage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/"); // belum login
      } else {
        setReady(true); // sudah login
      }
    }
  }, [user, loading, router]);

  if (!ready) return null;

  return <SignedPage />;
}
