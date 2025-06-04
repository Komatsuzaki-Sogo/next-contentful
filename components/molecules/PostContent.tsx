import { Entry } from 'contentful';
import type { PostSkeleton } from '@/types/post';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Document as RichTextDocument } from '@contentful/rich-text-types';
import { PostDate } from '@/components/atoms/PostDate';

type Props = {
  post: Entry<PostSkeleton>;
};

export const PostContent = ({ post }: Props) => {
  return (
    <div className='mt-4'>
      <div>
        {documentToReactComponents(post.fields.content as unknown as RichTextDocument)}
      </div>
      <div className='mt-16 flex items-center justify-end gap-2'>
        公開日 <PostDate date={post.sys.createdAt} />
      </div>
    </div>
  );
};