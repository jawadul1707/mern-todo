const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db('todo');

  if (req.method === 'GET') {
    const tasks = await db.collection('tasks').find().toArray();
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const task = req.body;
    const result = await db.collection('tasks').insertOne(task);
    res.status(201).json({ _id: result.insertedId, ...task });
  } else {
    res.status(405).end();
  }

  await client.close();
};