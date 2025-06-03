import { GetStaticProps } from 'next';
import { client } from '@/libs/contentful';
import { Entry} from 'contentful';
import type { PostSkeleton } from '@/types/post'
import { BaseHeadingLevel1 } from '@/components/BaseHeadingLevel1';
import { PostList } from '@/components/PostList';

interface Props {
  posts: Entry<PostSkeleton>[];
}

export default function Home({ posts }: Props) {
  return (
    <main>
      <BaseHeadingLevel1>記事一覧</BaseHeadingLevel1>
      <PostList posts={posts} />
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await client.getEntries<PostSkeleton>({
    content_type: 'post',
    order: ['-sys.createdAt'],
  });

  return {
    props: {
      posts: response.items,
    },
  };
};