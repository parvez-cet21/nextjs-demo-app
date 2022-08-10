import { Fragment } from "react";
import Head from "next/head";
import {MongoClient, ObjectId} from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
function MeetupDetails (props){
  return (
    <Fragment>
    <Head>
      <title>{props.meetupData.title}</title>
      <meta name="description" content={props.meetupData.description} />
    </Head>
    <MeetupDetail
    title={props.meetupData.title}
    image={props.meetupData.image}
    address={props.meetupData.address}
    description={props.meetupData.description}
  />
  </Fragment>
  );
};

export async function getStaticPaths() {
    const MOGO_URL = "mongodb://testingit:testingit@ac-qezzfab-shard-00-00.ekmy7xj.mongodb.net:27017,ac-qezzfab-shard-00-01.ekmy7xj.mongodb.net:27017,ac-qezzfab-shard-00-02.ekmy7xj.mongodb.net:27017/?ssl=true&replicaSet=atlas-jcalt3-shard-0&authSource=admin&retryWrites=true&w=majority";
    const client = await MongoClient.connect(MOGO_URL);
    // const client = await MongoClient.connect("mongodb+srv://parvezse15:FLEYnYp1WVxqGpEe@cluster0.ekmy7xj.mongodb.net/meetups?retryWrites=true&w=majority&ssl=true");
    const db= client.db();

    const meetupCollection = db.collection("meetups");
    const meetups = await meetupCollection.find({},{_id: 1}).toArray();

    client.close();
  return {
    fallback: false,
    paths: meetups.map(meetup=>({params: {meetupId: meetup._id.toString()}}))
    
    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m3",
    //     },
    //   },
    // ],
  };
}
export async function getStaticProps(context) {
  // fetch data for selected meetup details
  const meetupId = context.params.meetupId;
console.log(meetupId);
  const MOGO_URL = "mongodb://testingit:testingit@ac-qezzfab-shard-00-00.ekmy7xj.mongodb.net:27017,ac-qezzfab-shard-00-01.ekmy7xj.mongodb.net:27017,ac-qezzfab-shard-00-02.ekmy7xj.mongodb.net:27017/?ssl=true&replicaSet=atlas-jcalt3-shard-0&authSource=admin&retryWrites=true&w=majority";
    const client = await MongoClient.connect(MOGO_URL);
    // const client = await MongoClient.connect("mongodb+srv://parvezse15:FLEYnYp1WVxqGpEe@cluster0.ekmy7xj.mongodb.net/meetups?retryWrites=true&w=majority&ssl=true");
    const db= client.db();

    const meetupCollection = db.collection("meetups");
    const selectedMeetup = await meetupCollection.findOne({_id: ObjectId(meetupId)});
    console.log(selectedMeetup);
    client.close();


  return {
    props: {
        meetupData: {
            id: selectedMeetup._id.toString(),
            title: selectedMeetup.title,
            image: selectedMeetup.image,
            address: selectedMeetup.address,
            description: selectedMeetup.description,

        },
    //   meetupData: {
    //     title: "First Meetup",
    //     image:
    //       "https://upload.wikimedia.org/wikipedia/commons/e/e4/Upper_kachura_lake%2C_skardu%2C_baltistan.jpg",
    //     address: "First Address yard 1",
    //     description: "Some useful description",
    //   },
    },
    // Rerender updated data after each second
    // revalidate: 1
  };
}

export default MeetupDetails;
