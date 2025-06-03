import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '@/libs/contentful';
import { Entry } from 'contentful';
import { PostSkeleton } from '@/types/post';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface Props {
  post: Entry<PostSkeleton>;
}

export default function PostDetail({ post }: Props) {
  return (
    <main>
      <h1>{String(post.fields.title)}</h1>
      <p>作成日: {new Date(post.sys.createdAt).toLocaleDateString()}</p>
      <div>{documentToReactComponents(post.fields.content)}</div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await client.getEntries<PostSkeleton>({
    content_type: 'post',
  });

  const paths = response.items.map((post) => ({
    params: { slug: post.fields.slug },
  }));

  return {
    paths,
    fallback: false, // 404を表示する
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;

  const response = await client.getEntries<PostSkeleton>({
    content_type: 'post',
    limit: 1,
    'fields.slug': slug,
  });

  const post = response.items[0];

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
};
