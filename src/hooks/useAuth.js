"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { SIGN_IN_ROUTE } from '@/config/siteLinks';
import { useRouter } from '@/i18n/routing';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(SIGN_IN_ROUTE);
    }
  }, [status, router]);

  return { session, status };
};

