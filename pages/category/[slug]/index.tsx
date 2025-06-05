import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;

  if (typeof slug !== 'string') {
    return { notFound: true };
  }

  return {
    redirect: {
      destination: `/category/${slug}/page/1`,
      permanent: false,
    },
  };
};

const CategoryIndex = () => null;

export default CategoryIndex;
