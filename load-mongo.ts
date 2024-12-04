import { MongoClient, ObjectId } from 'mongodb';

async function main() {
  const client = new MongoClient('mongodb://localhost:27017/typescript-ddd-skeleton', {
    ignoreUndefined: true
  });

  await client.connect();

  const start = Date.now();

  const id = '8f4dcd6e-f6dc-406c-81eb-0289e0108f2f';
  const collection = 'random_datas',
    records = await client
      .db()
      .collection(collection)
      .find({ _id: id as unknown as ObjectId })
      .toArray();

  if (records.length === 0) {
    console.log('No records found');
    return;
  }

  console.log({ ...records[0], id: records[0]._id });

  const elapsed = Date.now() - start;
  console.log(`Elapsed: ${elapsed}ms`);

  await client.close();
}

main()
  .then(() => process.exit(0))
  .catch(console.error);
