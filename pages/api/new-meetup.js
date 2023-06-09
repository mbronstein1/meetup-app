// route: /api/new-meetup
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dxxsy0n.mongodb.net/meetups?retryWrites=true&w=majority`);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    await client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
};

export default handler;
