import Head from 'next/head';
import MeetupList from '@/components/meetups/MeetupList';
import { MongoClient } from 'mongodb';

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React/Next Meetups</title>
        <meta name='description' content='Browse a huge list of highly active React meetups!' />
      </Head>
      <MeetupList meetups={meetups} />;
    </>
  );
};

// NextJS function that prepares props for this page BEFORE component function is executed (allows fetched data to be displayed in source code during pre-rendering process)
// This code is always secure because it never reaches the client. It is only executed during the build process.
// Moves data fetching from client-side to server-side
export const getStaticProps = async () => {
  const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dxxsy0n.mongodb.net/meetups?retryWrites=true&w=majority`);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  await client.close();
  // Always need to return an object w/ property that has to be named 'props'
  // This prepares the props we want for this component
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // The page will be regenerated on the server based on the value in seconds instead of having to re-build every time data changes
    revalidate: 10,
  };
};

// This won't run during the build process but will always run on the server after deployment
// Only use when:
// Data is changing constantly (like faster than 1 second)
// We need access to the request (like for user authentication to check req.session)
// export const getServerSideProps = async context => {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from API or DB
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export default HomePage;
