import { useRouter } from 'next/router';

export const useBackNavigation = () => {
  const router = useRouter();

  return () => {
    if (typeof window !== 'undefined') {
      const isInternalReferrer = document.referrer.startsWith(window.location.origin);

      if (isInternalReferrer) {
        router.back();
      } else {
        router.push('/');
      }
    }
  };
}
