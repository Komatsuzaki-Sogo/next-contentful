import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {
  title?: string;
  ogType?: 'website' | 'article';
}

const DEFAULT_TITLE = 'Next14 x contentful';
const BASE_URL = 'https://next-contentful-iota.vercel.app';

export const Meta = ({ title = DEFAULT_TITLE, ogType = 'website' }: Props) => {
  const router = useRouter();
  const canonical = `${BASE_URL}${router.asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={title + 'のページのご紹介'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={title + 'のページのご紹介'} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={DEFAULT_TITLE} />
      <meta property="og:image" content={`${BASE_URL}/ogp.jpg`} />
      <link rel="canonical" href={canonical} />
    </Head>
  );
};