import { GetStaticProps } from 'next';
import Link from 'next/link';
import { client } from '@/libs/contentful';
import { Post } from '@/types/post';
import { EntrySkeletonType } from 'contentful';

type PostEntrySkeleton = EntrySkeletonType<Post>;

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Props) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>ブログ一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '1rem' }}>
            <Link href={`/posts/${post.slug}`}>
            <div>id {post.id}</div>
              <div>
                <strong>{post.title}</strong>
              </div>
              <div>Slug: {post.slug}</div>
              <div>Published: {new Date(post.publishedDate).toLocaleDateString()}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.getEntries<PostEntrySkeleton>({
    content_type: 'post',
  });

  
  const posts: Post[] = response.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    slug: item.fields.slug,
    content: item.fields.content,
    publishedDate: item.fields.publishedDate,
  }));

  return {
    props: { posts },
  };
};
