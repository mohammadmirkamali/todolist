import React from 'react';
import dynamic from 'next/dynamic';

const Head = dynamic(() => import('next/head'));
const ToDo = dynamic(() => import('components/ToDo'));

const HomePage: React.FC = () => (
  <>
    <Head>
      <title>TODO APP</title>
    </Head>

    <ToDo />
  </>
);

export default HomePage;
