const { MongoClient, ObjectId } = require('mongodb');

module.exports = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db('todo');

  if (req.method === 'DELETE') {
    const { id } = req.query;
    await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'Task deleted' });
  } else {
    res.status(405).end();
  }

  await client.close();
};