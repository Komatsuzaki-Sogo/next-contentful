import Link from 'next/link';
import { Entry } from 'contentful';
import type { PostSkeleton, PostCategorySkeleton } from '@/types/post';
import { BaseTime } from '../atoms/BaseTime';
import { BaseLabel } from '../atoms/BaseLabel';

const PostListItem = ({ post }: { post: Entry<PostSkeleton> }) => {
  const category = post.fields.postCategory as unknown as Entry<PostCategorySkeleton>;
  const categoryTitle = category?.fields?.title;
  return (
    <li className="border-b border-gray-200 pb-4 hover:bg-gray-50 transition-colors">
      <Link href={`/posts/${post.fields.slug}`} className="block">
        <div className='flex gap-2'>
        <BaseLabel text={categoryTitle.toString()} />
        <BaseTime date={post.sys.createdAt} />
        </div>
        <b className="block mt-2 text-xl font-semibold">
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
