'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect root → /auth/public (MFE-PUBLIC - default entry)
    router.replace("/auth/public");
  }, [router]);

  return null;
}
