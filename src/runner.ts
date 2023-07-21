import { PubSub } from "@google-cloud/pubsub";

/*
type ProjectConfig = {
  id: string,
  topic: string,
  subscription: string,
};
*/

const pubSub = new PubSub({ projectId: "steel-cursor-393404" });

async function pubsubtest() {
  const [subscription] = await pubSub.createSubscription("fakeirc", "listener");
  console.log(`Subscription ${subscription.name} created`);

  // Receive callbacks for new messages on the subscription
  subscription.on('message', (message: any) => {
    console.log('Received message:', message.data.toString());

    message.ack();
  });

  // Receive callbacks for errors on the subscription
  subscription.on('error', (error: any) => {
    console.error('Received error:', error);

    error.ack();
  });

  const topic = pubSub.topic("fakeirc");
  // Send a message to the topic
  const messageID = await topic.publishMessage({data: Buffer.from("You'll never guess what just happened")});
  console.log(`Sent message ${messageID}`);
}

pubsubtest();
