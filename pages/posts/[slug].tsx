import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '@/libs/client';
import { Entry } from 'contentful';
import { PostSkeleton } from '@/types/post';
import { PostContent } from '@/components/pages/posts/PostContent';
import { PostHeading } from '@/components/pages/posts/PostHeading';
import { Meta } from '@/components/organisms/Meta';

interface Props {
  post: Entry<PostSkeleton>;
}

const PostArticle = ({ post }: Props) => {
  return (
    <>
      <Meta title={'記事：' + post.fields.title} />
      <div>
        <PostHeading post={post} />
        <PostContent post={post} />
      </div>
    </>
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
    fallback: false,
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