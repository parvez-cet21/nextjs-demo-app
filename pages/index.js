import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "First Meetup",
//     image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Upper_kachura_lake%2C_skardu%2C_baltistan.jpg",
//     address: "First Address yard 1",
//     description: "Some useful description",
//   },
//   {
//     id: "m2",
//     title: "Second Meetup",
//     image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Upper_Kachura_Lake_in_Skardu.jpg",
//     address: "Second Address yard 2",
//     description: "Some useful description two",
//   },
//   {
//     id: "m3",
//     title: "Third Meetup",
//     image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Beauty_-_Uppaer_Kachura_Lake_Sakardu.jpg",
//     address: "Third Address yard 3",
//     description: "Some useful description three",
//   },
// ];
const HomePage = (props) => {
  return  <Fragment>
    <Head>
      <title>NextJS Demo App</title>
      <meta name="description" content="This is Demo App of meetups collection using MOngoDB as storage for meetups collection" />
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>
};
// export async function getServerSideProps(){
//     // fetch data from API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//         //
//         revalidate: 1

//     }

// }
export async function getStaticProps() {
  // fetch data from API
  const MOGO_URL =
    "mongodb://testingit:testingit@ac-qezzfab-shard-00-00.ekmy7xj.mongodb.net:27017,ac-qezzfab-shard-00-01.ekmy7xj.mongodb.net:27017,ac-qezzfab-shard-00-02.ekmy7xj.mongodb.net:27017/?ssl=true&replicaSet=atlas-jcalt3-shard-0&authSource=admin&retryWrites=true&w=majority";
  const client = await MongoClient.connect(MOGO_URL);
  // const client = await MongoClient.connect("mongodb+srv://parvezse15:FLEYnYp1WVxqGpEe@cluster0.ekmy7xj.mongodb.net/meetups?retryWrites=true&w=majority&ssl=true");
  console.log("Im connected maybe");
  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    // Rerender updated data after each second
    revalidate: 1,
  };
}
export default HomePage;
