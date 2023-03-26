import Head from 'next/head';
import Layout from '@/components/Layout';
// import { API_URL } from '@/config/index';
import { API_URL } from '@/config';

export default function HomePage({ events }) {
  // console.log(events);

  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  );
}

// getServerSideProps runs everytime we load the page
// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/api/events`);
//   const events = await res.json();

//   return {
//     props: { events },
//   };
// }

// getStaticSideProps runs at build time only
export async function getStaticSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
