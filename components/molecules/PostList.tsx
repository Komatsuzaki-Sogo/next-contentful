import Link from 'next/link';
import { Entry } from 'contentful';
import type { PostSkeleton } from '@/types/post';
import { PostDate } from '../atoms/PostDate';

const PostListItem = ({ post }: { post: Entry<PostSkeleton> }) => {
  return (
    <li className="border-b border-gray-200 pb-4 hover:bg-gray-50 transition-colors">
      <Link href={`/posts/${post.fields.slug}`} className="block">
        <PostDate date={post.sys.createdAt} />
        <b className="block text-xl font-semibold">
          {post.fields.title.toString()}
        </b>
      </Link>
    </li>
  );
};

type Props = {
    posts: Entry<PostSkeleton>[];
};

export const PostList = ({ posts }: Props) => {
  return (
    <ul className="mt-8 space-y-6">
      {posts.map((post) => (
        <PostListItem key={post.sys.id} post={post} />
      ))}
    </ul>
  );
};
