import { useRouter } from 'next/router';
import { Entry } from 'contentful';
import { PostSkeleton } from '@/types/post';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Document as RichTextDocument } from '@contentful/rich-text-types';
import { BaseTime } from '@/components/atoms/BaseTime';
import { BaseButton } from '@/components/atoms/BaseButton';

type Props = {
  post: Entry<PostSkeleton>;
};

export const PostContent = ({ post }: Props) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className='mt-4'>
      <div>
        {documentToReactComponents(post.fields.content as unknown as RichTextDocument)}
      </div>
      <div className='mt-16 flex items-center justify-end gap-2'>
        公開日 <BaseTime date={post.sys.createdAt} />
      </div>
      <BaseButton onClick={handleBack}>戻る</BaseButton>
    </div>
  );
};