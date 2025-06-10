import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { client } from '@/libs/client';
import type { PostCategorySkeleton } from '@/types/post';
import { Entry } from 'contentful';

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client.getEntries<PostCategorySkeleton>({
    content_type: 'postCategory',
  });

  const paths = categories.items.map((category: Entry<PostCategorySkeleton>) => ({
    params: { slug: category.fields.slug as unknown as string },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const CategoryIndex = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (typeof slug === 'string') {
      router.replace(`/category/${slug}/page/1`);
    }
  }, [slug, router]);

  return null;
};

export default CategoryIndex;

