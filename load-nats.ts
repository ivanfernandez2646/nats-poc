import { AckPolicy, connect } from 'nats';

async function main() {
  const nc = await connect({ servers: 'nats://localhost:4222' });
  const jsm = await nc.jetstreamManager();

  await jsm.consumers.add('EVENTS', {
    durable_name: 'mypullconsumer',
    filter_subject: 'events.tpf_936091b6-75f1-46fc-b476-be56af751e32',
    ack_policy: AckPolicy.None
  });

  const start = Date.now();

  const consumer = await nc.jetstream().consumers.get('EVENTS', 'mypullconsumer');
  const messages = await consumer.fetch({ max_messages: 1, expires: 1000 });
  for await (const m of messages) {
    console.log(m.json());
  }

  const elapsed = Date.now() - start;
  console.log(`Elapsed: ${elapsed}ms`);

  await jsm.consumers.delete('EVENTS', 'mypullconsumer');
}

main()
  .then(() => process.exit(0))
  .catch(console.error);
