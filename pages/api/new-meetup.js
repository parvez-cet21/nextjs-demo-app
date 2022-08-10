import {MongoClient} from "mongodb"; 
async function handler(req, res){
    console.log("Request reached");
    if(req.method==="POST"){
        console.log(req.body);
        const data = req.body;
        const MOGO_URL = "mongodb://testingit:testingit@ac-qezzfab-shard-00-00.ekmy7xj.mongodb.net:27017,ac-qezzfab-shard-00-01.ekmy7xj.mongodb.net:27017,ac-qezzfab-shard-00-02.ekmy7xj.mongodb.net:27017/?ssl=true&replicaSet=atlas-jcalt3-shard-0&authSource=admin&retryWrites=true&w=majority";
        const client = await MongoClient.connect(MOGO_URL);
        // const client = await MongoClient.connect("mongodb+srv://parvezse15:FLEYnYp1WVxqGpEe@cluster0.ekmy7xj.mongodb.net/meetups?retryWrites=true&w=majority&ssl=true");
        console.log("Im connected maybe");
        const db= client.db();

        const meetupCollection = db.collection("meetups");

        const result = await meetupCollection.insertOne(data);
        console.log(result);
        client.close();

        res.status(201).json({message: "Meetup Added!"});
    
    }
}

export default handler;