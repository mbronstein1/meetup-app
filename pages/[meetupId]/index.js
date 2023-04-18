import MeetupDetail from '@/components/meetups/MeetupDetail';

const MeetupDetails = ({ meetupData }) => {
  return <MeetupDetail image={meetupData.image} title={meetupData.title} address={meetupData.address} description={meetupData.description} />;
};

// Provides all dynamic segment values for build
// Required when using getStaticProps in components that have dynamic rendering via params
export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
  };
};

export const getStaticProps = async context => {
  const { meetupId } = context.params;
  // fetch data for single meetup
  return {
    props: {
      meetupData: {
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80',
        title: 'First Meetup',
        address: 'Some Street 5, Some City',
        description: 'This is a first meetup',
        id: meetupId,
      },
    },
  };
};

export default MeetupDetails;
