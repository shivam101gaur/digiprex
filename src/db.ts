import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://digiprexDbUser:lMYyU2ktnnIAWMYu@cluster0.itvh6gi.mongodb.net/digiprex?retryWrites=true&w=majority');
var conn = mongoose.connection;
conn.on('connected', function () {
    console.log('database is connected successfully');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
export default conn




const messageSchema = new Schema({
    content: String,
    time_sent: Number,
    phone: String,
    email: String,
    cart_token: String
}, { collection: 'message' });
const MessageModel = mongoose.model('Message', messageSchema)

export async function storeMessage(msg: Message) {
    const message = new MessageModel(msg)
    return await message.save()
}

export async function getMessages(params: Message) {
    params = JSON.parse(JSON.stringify(params))
  return MessageModel.find(params)
}

export interface Message {
    content?: string;
    time_sent?: number;
    phone?: string | number;
    email?: string;
    cart_token?: string;
}