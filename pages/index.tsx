import { GetStaticProps } from 'next';
import { client } from '@/libs/contentful';
import { Entry } from 'contentful';
import type { PostSkeleton, PostCategorySkeleton } from '@/types/post';
import { BaseHeadingLevel1 } from '@/components/atoms/BaseHeadingLevel1';
import { PostList } from '@/components/molecules/PostList';
import { CategoryList } from '@/components/molecules/CategoryList';

interface Props {
  posts: Entry<PostSkeleton>[];
  categories: Entry<PostCategorySkeleton>[];
}

const Home = ({ posts, categories }: Props) => {
  return (
    <div>
      <BaseHeadingLevel1>記事一覧</BaseHeadingLevel1>
      <CategoryList categories={categories} />
      <PostList posts={posts} />
    </div>
  );
}

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  // 投稿取得
  const postRes = await client.getEntries<PostSkeleton>({
    content_type: 'post',
    order: ['-sys.createdAt'],
  });

  // カテゴリ取得
  const categoryRes = await client.getEntries<PostCategorySkeleton>({
    content_type: 'postCategory',
    order: ['-sys.createdAt'],
  });

  return {
    props: {
      posts: postRes.items,
      categories: categoryRes.items,
    },
  };
};
