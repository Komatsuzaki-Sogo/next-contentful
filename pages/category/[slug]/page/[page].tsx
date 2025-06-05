import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '@/libs/client';
import { Entry } from 'contentful';
import type { PostSkeleton, PostCategorySkeleton } from '@/types/post';
import { BaseHeadingLevel1 } from '@/components/atoms/BaseHeadingLevel1';
import { PostList } from '@/components/molecules/PostList';
import { CategoryList } from '@/components/molecules/CategoryList';
import { Pagination } from '@/components/molecules/Pagination';
import { PER_PAGE } from '@/libs/perPage';

interface Props {
  posts: Entry<PostSkeleton>[];
  categories: Entry<PostCategorySkeleton>[];
  currentCategory: Entry<PostCategorySkeleton>;
  currentPage: number;
  totalPages: number;
}

const CategoryPage = ({
  posts,
  categories,
  currentCategory,
  currentPage,
  totalPages,
}: Props) => {
  return (
    <div>
      <BaseHeadingLevel1>{currentCategory.fields.title.toString()} の記事一覧</BaseHeadingLevel1>
      <CategoryList categories={categories} />
      <PostList posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/category/${currentCategory.fields.slug}`}
      />
    </div>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client.getEntries<PostCategorySkeleton>({
    content_type: 'postCategory',
  });

  const paths: { params: { slug: string; page: string } }[] = [];

  for (const category of categories.items) {
    const postRes = await client.getEntries<PostSkeleton>({
      content_type: 'post',
      'fields.postCategory.sys.id': category.sys.id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const totalPages = Math.ceil(postRes.total / PER_PAGE);

    for (let page = 1; page <= totalPages; page++) {
      paths.push({
        params: {
          slug: category.fields.slug,
          page: page.toString(),
        },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params?.slug as string;
  const page = parseInt(context.params?.page as string, 10) || 1;

  // カテゴリ一覧
  const categoryRes = await client.getEntries<PostCategorySkeleton>({
    content_type: 'postCategory',
    order: ['-sys.createdAt'],
  });

  const currentCategory = categoryRes.items.find((c) => c.fields.slug === slug);
  if (!currentCategory) return { notFound: true };

  // 記事取得
  const skip = (page - 1) * PER_PAGE;

  const postRes = await client.getEntries<PostSkeleton>({
    content_type: 'post',
    'fields.postCategory.sys.id': currentCategory.sys.id,
    order: ['-sys.createdAt'],
    skip,
    limit: PER_PAGE,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  const totalPages = Math.ceil(postRes.total / PER_PAGE);

  return {
    props: {
      posts: postRes.items,
      categories: categoryRes.items,
      currentCategory,
      currentPage: page,
      totalPages,
    },
  };
};
