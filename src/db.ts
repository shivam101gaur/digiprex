import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.set('bufferCommands', false);

const messageSchema = new Schema({
    content: String,
    time_sent: Number,
    phone: String,
    email: String,
    cart_token: String
});
const MessageModel = mongoose.model('Message', messageSchema,'message')


var db
export const connectDB =  async function () {
    try {
      db =   await mongoose.connect('mongodb+srv://digiprexDbUser:lMYyU2ktnnIAWMYu@cluster0.itvh6gi.mongodb.net/?retryWrites=true&w=majority');
    } catch (error) {
        console.log(error)
    }
}().then(res=>{
    console.log('connection success');

    
})


export async function storeMessage(msg:Message) {
    const message = new MessageModel(msg)
    
    await message.save()
}

export interface Message {
    content: string;
    time_sent: number;
    phone: string | number;
    email: string;
    cart_token: string;
}