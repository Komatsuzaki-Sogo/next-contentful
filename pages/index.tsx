import { GetStaticProps } from 'next';
import { client } from '@/libs/contentful';
import { Entry} from 'contentful';
import type { PostSkeleton } from '@/types/post'
import { BaseHeadingLevel1 } from '@/components/atoms/BaseHeadingLevel1';
import { PostList } from '@/components/molecules/PostList';

interface Props {
  posts: Entry<PostSkeleton>[];
}

export default function Home({ posts }: Props) {
  return (
    <div>
      <BaseHeadingLevel1>記事一覧</BaseHeadingLevel1>
      <PostList posts={posts} />
    </div>
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