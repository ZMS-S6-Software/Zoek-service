import { connect } from 'amqplib';
import patientLogic from '../BusinessLogic/SearchLogic.js';
const patientService = patientLogic();


const connection = await connect(`amqp://${process.env.RABBITMQ_HOST || 'localhost'}`);
const channel = await connection.createChannel();
const queue = 'message';
await channel.assertQueue(queue, { durable:false });

channel.consume(queue, (msg) => {
  try {
    const receivedMsg = JSON.parse(msg.content.toString());
    if (receivedMsg.title === 'updatePatient') {
      const updatedPatient = patientService.updatePatient(receivedMsg.oldEmail, receivedMsg.updatedPatient)
      console.log(updatedPatient)
      channel.ack(msg);
    }
  } catch (error) {
    console.error(`Error parsing message: ${error.message}`);
    channel.reject(msg, true);
  }
});

// api calls
export default function (app) {
  app.get("/search", async (req, res) => {
    const { keyword } = req.body;
    console.log(keyword)
    try {
      const patients = await patientService.searchForPatient(keyword);
      res.json(patients);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
}
