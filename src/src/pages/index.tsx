import { GetStaticProps } from 'next';
import { client } from '@/libs/contentful';
import { Entry} from 'contentful';
import Link from 'next/link';
import type {PostSkeleton} from '@/types/post'

interface Props {
  posts: Entry<PostSkeleton>[];
}

export default function Home({ posts }: Props) {
  return (
    <main>
      <h1>記事一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.sys.id}>
            <h2>
              <Link href={`/posts/${post.fields.slug}`}>
                {String(post.fields.title)}
              </Link>
            </h2>
            <p>
              公開日: {String(post.sys.createdAt)}
            </p>
          </li>
        ))}
      </ul>
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