import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '@/libs/contentful';
import { Entry } from 'contentful';
import { PostSkeleton } from '@/types/post';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useRouter } from 'next/router';
import { BaseHeadingLevel1 } from '@/components/BaseHeadingLevel1';
import type { Document as RichTextDocument } from '@contentful/rich-text-types';
import { PostDate } from '@/components/PostDate';

interface Props {
  post: Entry<PostSkeleton>;
}

export default function PostDetail({ post }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>読み込み中...</div>;
  }

  return (
    <main>
      <BaseHeadingLevel1 variant="article">{String(post.fields.title)}</BaseHeadingLevel1>
      <p>公開日: <PostDate date={post.sys.createdAt} /></p>
      <div>{documentToReactComponents(post.fields.content as unknown as RichTextDocument)}</div>
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
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;

  if (typeof slug !== 'string') {
    return { notFound: true };
  }

  const response = await client.getEntries<PostSkeleton>({
    content_type: 'post',
    limit: 1,
    ['fields.slug']: slug,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

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