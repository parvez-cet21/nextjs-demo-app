import { Fragment } from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
function NewMeetupPage() {
    const router = useRouter();
  async function addMeetupHandler(enteredMeetupdData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupdData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const data = await response.json();
    console.log("Awaited data is coming");
    console.log(data);
    router.push("/")
  }
  return  <Fragment>
  <Head>
    <title>Add New Meetup</title>
    <meta name="description" content="Just add a new meetup to Demo App of meetups collection which will store in MOngoDB " />
  </Head><NewMeetupForm onAddMeetup={addMeetupHandler} /></Fragment>
}

export default NewMeetupPage;
