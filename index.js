import {connect} from 'amqplib';

const connection = await connect('amqp://172.20.0.2');

const channel = await connection.createChannel();

const queue = 'message';

await channel.assertQueue(queue, { durable:false });

channel.consume(queue, (msg) => {
    console.log(`Received ${msg.content.toString()}`);
});