"use client";
import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function VerifyEmailDynamicPage() {
  const { id, hash } = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Build the backend verification URL
    const params = searchParams.toString();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/email/verify/${id}/${hash}?${params}`;
    // Redirect the browser to the backend verification URL
    window.location.href = apiUrl;
  }, []);

  return <div>Verifying...</div>;
}
