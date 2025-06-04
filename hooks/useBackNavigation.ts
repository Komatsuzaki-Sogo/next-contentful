import { useRouter } from 'next/router';

export const useBackNavigation = () => {
  const router = useRouter();

  return () => {
    if (typeof window !== 'undefined') {
      const referrer = document.referrer;

      const cameFromSameDomain = referrer && new URL(referrer).origin === window.location.origin;

      if (cameFromSameDomain) {
        router.back();
      } else {
        router.push('/');
      }
    }
  };
};
