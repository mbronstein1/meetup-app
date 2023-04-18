import MeetupList from '@/components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a second meetup',
  },
];

const HomePage = ({ meetups }) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return <MeetupList meetups={meetups} />;
};

// NextJS function that prepares props for this page BEFORE component function is executed (allows fetched data to be displayed in source code during pre-rendering process)
// This code is always secure because it never reaches the client. It is only executed during the build process.
// Moves data fetching from client-side to server-side
export const getStaticProps = async () => {
  // fetch data from API or DB
  // Always need to return an object w/ property that has to be named 'props'
  // This prepares the props we want for this component
  return {
    props: {
      meetups: DUMMY_MEETUPS,
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
