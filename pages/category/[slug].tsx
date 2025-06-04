// pages/category/[slug].tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '@/libs/contentful';
import { Entry } from 'contentful';
import type { PostSkeleton, PostCategorySkeleton } from '@/types/post';
import { BaseHeadingLevel1 } from '@/components/atoms/BaseHeadingLevel1';
import { PostList } from '@/components/molecules/PostList';
import { CategoryList } from '@/components/molecules/CategoryList';

interface Props {
  posts: Entry<PostSkeleton>[];
  categories: Entry<PostCategorySkeleton>[];
  currentCategorySlug: string;
}

const CategoryPage = ({ posts, categories, currentCategorySlug }: Props) => {
  return (
    <div>
      <BaseHeadingLevel1>{currentCategorySlug}の記事一覧</BaseHeadingLevel1>
      <CategoryList categories={categories} />
      <PostList posts={posts} />
    </div>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client.getEntries<PostCategorySkeleton>({
    content_type: 'postCategory',
  });

  const paths = categories.items.map((category) => ({
    params: { slug: category.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;

  // 全カテゴリ取得
  const categoryRes = await client.getEntries<PostCategorySkeleton>({
    content_type: 'postCategory',
    order: ['-sys.createdAt'],
  });

  const category = categoryRes.items.find((c) => c.fields.slug === slug);
  if (!category) {
    return { notFound: true };
  }

  // 指定カテゴリに属する記事取得
  const postRes = await client.getEntries<PostSkeleton>({
    content_type: 'post',
    'fields.postCategory.sys.id': category.sys.id,
    order: ['-sys.createdAt'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  return {
    props: {
      posts: postRes.items,
      categories: categoryRes.items,
      currentCategorySlug: slug,
    },
  };
};
