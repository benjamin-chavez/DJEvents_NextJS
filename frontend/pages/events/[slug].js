import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { API_URL } from '@/config';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function EventPage({ evt }) {
  const evtDate = new Date(evt.date).toLocaleDateString('en-US');
  const router = useRouter();

  const deleteEvent = async (e) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }
  };

  // console.log(router);
  return (
    <Layout>
      {/* <h3>{router.query.slug}</h3> */}
      {/* <button onClick={() => router.push('/')}>Click</button> */}
      <h1>{evt.name}</h1>
      <ToastContainer />
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`} legacyBehavior>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {evtDate} at {evt.time}
        </span>

        {evt.image && (
          <div className={styles.image}>
            {/* <Image src={evt.image} width={960} height={600} /> */}
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers: </h3>
        <p>{evt.performers}</p>

        <h3>Description: </h3>
        <p>{evt.description}</p>

        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events" legacyBehavior>
          <a className={styles.back}>{'<'} Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// NOTE: YOU CAN EITHER DO `getServerSideProps()` OR `getStaticPaths()` + `getStaticProps()`
// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }

/**
 *
 * @returns
 *  {
 *    paths: {
 *      params: { slug: 1 },
 *      params: { slug: 2 },
 *    },
 *  };
 */
export async function getStaticPaths() {
  // const res = await fetch(`${API_URL}/api/events`);
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));

  return {
    paths,
    // fallback: false // <= false will send us to 404
    fallback: true,
  };
}

// To run at build time
export async function getStaticProps({ params: { slug } }) {
  // const res = await fetch(`${API_URL}/api/events/${slug}`);
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}
