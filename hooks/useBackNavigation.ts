import { useRouter } from 'next/router';

export const useBackNavigation = () => {
  const router = useRouter();

  return () => {
    if (typeof window !== 'undefined') {
      const hasHistory = window.history.length > 1;

      if (hasHistory) {
        router.back();
      } else {
        router.push('/');
      }
    }
  };
}
