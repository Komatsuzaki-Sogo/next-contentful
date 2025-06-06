import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/page/1',
      permanent: false,
    },
  };
};

const Home = () => null;

export default Home;