import {connect} from 'amqplib';

connection = await connect(`amqp://${process.env.RABBITMQ_HOST || 'localhost'}`);

const channel = await connection.createChannel();

const queue = 'message';

await channel.assertQueue(queue, { durable:false });

channel.consume(queue, (msg) => {
    console.log(`Received ${msg.content.toString()}`);
});

// run in docker
// docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq