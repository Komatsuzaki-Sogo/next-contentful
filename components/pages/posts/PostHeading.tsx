import { Entry } from 'contentful';
import { PostSkeleton, PostCategorySkeleton } from '@/types/post';
import { BaseHeadingLevel1 } from '@/components/atoms/BaseHeadingLevel1';
import { BaseLabel } from '@/components/atoms/BaseLabel';

type Props = {
  post: Entry<PostSkeleton>;
};

export const PostHeading = ({ post }: Props) => {
  const category = post.fields.postCategory as unknown as Entry<PostCategorySkeleton>;
  const categoryTitle = category?.fields?.title;
  return (
    <div className='flex flex-col-reverse gap-2'>
      <BaseHeadingLevel1 variant="article">{post.fields.title.toString()}</BaseHeadingLevel1>
      <BaseLabel text={categoryTitle.toString()} />
    </div>
  );
};