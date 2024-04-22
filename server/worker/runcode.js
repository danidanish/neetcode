const amqplib = require('amqplib');
const queue = 'tasks';
const axios = require('axios')

async function runcode(){
    try {
        const connection = await amqplib.connect('amqp://localhost')
      const channel = await connection.createChannel();
      await channel.assertQueue(queue);
      channel.prefetch(1);
      let message = "";
      await channel.consume(queue,(msg)=>{
        if (msg !== null) {
          message = msg.content.toString();
          channel.ack(msg);
          } else {
            console.log('Consumer cancelled by server');
          }
    });
    const response = await axios.get('https://ce.judge0.com/languages/');
    response.data.forEach(e => {
      console.log(e.name);
    });
    
    } catch (error) {
        console.log(`Error:${error}`)
    }
}
runcode();