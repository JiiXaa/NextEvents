import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-utils';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    // add server side validation
    const { email, name, text } = req.body;

    // Server side validation
    if (
      !email ||
      !email.includes('@') ||
      !email.trim() === '' ||
      !name ||
      !name.trim() === '' ||
      !text ||
      !text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      client.close();
      return;
    }

    const newComment = {
      // don`t need id because mongoDB wil make one
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, 'comments', { ...newComment });
      newComment._id = result.insertedId;

      res.status(201).json({ message: 'Added comment.', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed' });
    }
  }

  if (req.method === 'GET') {
    let documents;

    try {
      documents = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' });
    }
  }

  client.close();
}

export default handler;
