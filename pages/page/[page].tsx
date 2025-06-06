import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '@/libs/client';
import { Entry } from 'contentful';
import type { PostSkeleton, PostCategorySkeleton } from '@/types/post';
import { BaseHeadingLevel1 } from '@/components/atoms/BaseHeadingLevel1';
import { BaseText } from '@/components/atoms/BaseText';
import { PostList } from '@/components/molecules/PostList';
import { CategoryList } from '@/components/molecules/CategoryList';
import { Pagination } from '@/components/molecules/Pagination';
import { PER_PAGE } from '@/libs/perPage';
import { Meta } from '@/components/organisms/Meta';

interface Props {
  posts: Entry<PostSkeleton>[];
  categories: Entry<PostCategorySkeleton>[];
  currentPage: number;
  totalPages: number;
}

const PostPage = ({ posts, categories, currentPage, totalPages }: Props) => {
  return (
    <>
      <Meta title={'記事一覧の' + currentPage + 'ページ'} />
      <div>
        <BaseHeadingLevel1>記事一覧</BaseHeadingLevel1>
        <CategoryList categories={categories} />

        {posts.length > 0 ? (
          <>
            <PostList posts={posts} />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </>
        ) : (
          <BaseText><strong>記事がありませんでした。</strong></BaseText>
        )}
      </div>
    </>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.getEntries<PostSkeleton>({ content_type: 'post' });
  const total = res.total;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const currentPage = parseInt(context.params?.page as string, 10) || 1;
  const skip = (currentPage - 1) * PER_PAGE;

  const postRes = await client.getEntries<PostSkeleton>({
    content_type: 'post',
    order: ['-sys.createdAt'],
    skip,
    limit: PER_PAGE,
  });

  const categoryRes = await client.getEntries<PostCategorySkeleton>({
    content_type: 'postCategory',
    order: ['sys.createdAt'],
  });

  const totalPages = Math.ceil(postRes.total / PER_PAGE);

  return {
    props: {
      posts: postRes.items,
      categories: categoryRes.items,
      currentPage,
      totalPages,
    },
  };
};
