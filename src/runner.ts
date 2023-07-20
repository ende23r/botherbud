import { PubSub } from "@google-cloud/pubsub";

/*
type ProjectConfig = {
  id: string,
  topic: string,
  subscription: string,
};
*/

async function pubsubtest() {
  const pubSub = new PubSub({ projectId: "steel-cursor-393404" });

  const [topic] = await pubSub.createTopic("fakeirc");
  console.log(`Topic ${topic.name} created`);

  const [subscription] = await topic.createSubscription("its me, hi, I'm the problem");

  // Receive callbacks for new messages on the subscription
  subscription.on('message', (message: any) => {
    console.log('Received message:', message.data.toString());
    process.exit(0);
  });

  // Receive callbacks for errors on the subscription
  subscription.on('error', (error: any) => {
    console.error('Received error:', error);
    process.exit(1);
  });

  // Send a message to the topic
  // topic.publishMessage({data: Buffer.from("You'll never guess what just happened")});
}

pubsubtest();
