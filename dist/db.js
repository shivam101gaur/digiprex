"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.storeMessage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
mongoose_1.default.connect('mongodb+srv://digiprexDbUser:lMYyU2ktnnIAWMYu@cluster0.itvh6gi.mongodb.net/digiprex?retryWrites=true&w=majority');
var conn = mongoose_1.default.connection;
conn.on('connected', function () {
    console.log('database is connected successfully');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
});
conn.on('error', console.error.bind(console, 'connection error:'));
exports.default = conn;
const messageSchema = new Schema({
    content: String,
    time_sent: Number,
    phone: String,
    email: String,
    cart_token: String
}, { collection: 'message' });
const MessageModel = mongoose_1.default.model('Message', messageSchema);
function storeMessage(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = new MessageModel(msg);
        return yield message.save();
    });
}
exports.storeMessage = storeMessage;
function getMessages(params) {
    return __awaiter(this, void 0, void 0, function* () {
        params = JSON.parse(JSON.stringify(params));
        return MessageModel.find(params);
    });
}
exports.getMessages = getMessages;
