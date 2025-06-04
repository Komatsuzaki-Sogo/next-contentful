import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '@/libs/contentful';
import { Entry } from 'contentful';
import { PostSkeleton, PostCategorySkeleton } from '@/types/post';
import { useRouter } from 'next/router';
import { BaseHeadingLevel1 } from '@/components/atoms/BaseHeadingLevel1';
import { PostContent } from '@/components/molecules/PostContent';
import { BaseLabel } from '@/components/atoms/BaseLabel';

interface Props {
  post: Entry<PostSkeleton>;
}

const PostArticle = ({ post }: Props) => {
  const category = post.fields.postCategory as unknown as Entry<PostCategorySkeleton>;
    const categoryTitle = category?.fields?.title;
  const router = useRouter();

  if (router.isFallback) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <BaseLabel text={categoryTitle.toString()} />
      <BaseHeadingLevel1 variant="article">{String(post.fields.title)}</BaseHeadingLevel1>
      <PostContent post={post} />
    </div>
  );
}

export default PostArticle;

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
    'fields.slug': slug,
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