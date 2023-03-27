const amqp = require("amqplib")
const VetRepository = require("../database/repository/vet-repository")

const vet = new VetRepository()

class MessageQueue {
    constructor() {
        this.connection = null;
        this.channel = null;
        this.q = null;
    }

    async createChannel() {
        this.connection = await amqp.connect(process.env.MESSAGE_QUEUE_URL)
        this.channel = await this.connection.createChannel()
        await this.channel.assertExchange(process.env.EXCHANGE_NAME, "direct", { durable: true })
        
        
    }

    async subscribeMessages() {
        if(!this.channel) await this.createChannel()
        this.q = await this.channel.assertQueue(process.env.EXCHANGE_NAME)
        await this.channel.bindQueue(this.q.queue, process.env.EXCHANGE_NAME, process.env.ROUTE_KEY)
    }

    async handleMessages() {
        await this.subscribeMessages()
        await this.channel.consume(this.q.queue, async (msg)=> {
            const vetId = JSON.parse(msg.content)
            
            await vet.updateVetTotalAppointment(vetId)
            

            this.channel.ack(msg)

        })
    }
}

module.exports = MessageQueue