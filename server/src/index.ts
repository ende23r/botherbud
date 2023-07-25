import express from "express";
import { PubSub } from "@google-cloud/pubsub";

const PORT = process.env.PORT;
const app = express();

const pubSub = new PubSub({ projectId: "steel-cursor-393404" });
let topic: any;
async function startPubSub() {
    const subscription = await pubSub.subscription("listener");
    console.log(`Subscription ${subscription.name} found`);
    topic = pubSub.topic("fakeirc");
    console.log(`Subscribed to topic ${topic.name}`);

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
};

startPubSub();

app.get("/statusy", (req, res) => {
  console.log("Health check");
  res.send(`Healthy! Serving on port ${PORT}`);
});

app.get("/testsend", async (req, res) => {
  if (!topic) {
    throw new Error("Cannot test send; topic not initialized");
  }
  const messageID = await topic.publishMessage({data: Buffer.from("You'll never guess what just happened")});
  console.log(`Sent message ${messageID}`);
  res.send();
});

app.listen(PORT, () => {
  console.log(`Botherbud server listening on port ${PORT}`);
});

