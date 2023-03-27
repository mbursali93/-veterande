const amqp = require("amqplib")


class MessageQueue {
    constructor() {
        this.connection = null;
        this.channel = null;
    } 

    async createChannel () {
        this.connection = await amqp.connect(process.env.MESSAGE_QUEUE_URL)
        this.channel = await this.connection.createChannel()
        await this.channel.assertExchange(process.env.EXCHANGE_NAME, "direct", { durable:true })
       
    }

    async publishMessage(message) {
        if (!this.channel) {
            await this.createChannel();
            
          }
          
        await this.channel.publish(process.env.EXCHANGE_NAME, process.env.ROUTE_KEY, Buffer.from(JSON.stringify(message)))
        
        
    }

    async closeChannel() {
        await this.channel.close()
        await this.connection.close()
        
    }

    async sendMessage(message) {
        await this.createChannel()
        await this.publishMessage(message)
        await this.closeChannel()
    }
}

module.exports = MessageQueue