import { useRouter } from 'next/router';
import { Meta } from '@/components/organisms/Meta';
import { BaseHeadingLevel1 } from '@/components/atoms/BaseHeadingLevel1';
import { BaseText } from '@/components/atoms/BaseText';
import { BaseButton } from '@/components/atoms/BaseButton';

const Custom404 = () => {
  const router = useRouter();

  const handleBackTop = () => {
    router.push('/');
  };
  return (
    <>
      <Meta title='404 - ページが見つかりません' />
      <div>
        <BaseHeadingLevel1>404 - Not found</BaseHeadingLevel1>
        <BaseText>ページがありませんでした。</BaseText>
        <BaseButton onClick={handleBackTop}>トップページに戻る</BaseButton>
      </div>
    </>
  );
};

export default Custom404;
