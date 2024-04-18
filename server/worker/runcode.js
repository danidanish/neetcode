const amqplib = require('amqplib');
const queue = 'tasks';

async function runcode(){
    try {
        const connection = await amqplib.connect('amqp://localhost')
      const channel = await connection.createChannel();
      await channel.assertQueue(queue);
      await channel.assertQueue(queue2);
      channel.prefetch(1);
      const message = await channel.consume(queue,(msg)=>{
        if (msg !== null) {
            console.log(msg.content.toString());
            channel.ack(msg);
          } else {
            console.log('Consumer cancelled by server');
          }
    });
    } catch (error) {
        console.log(`Error:${error}`)
    }
}
runcode();