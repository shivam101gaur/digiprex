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
exports.storeMessage = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
mongoose_1.default.set('bufferCommands', false);
const messageSchema = new Schema({
    content: String,
    time_sent: Number,
    phone: String,
    email: String,
    cart_token: String
});
const MessageModel = mongoose_1.default.model('Message', messageSchema, 'message');
var db;
exports.connectDB = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            db = yield mongoose_1.default.connect('mongodb+srv://digiprexDbUser:lMYyU2ktnnIAWMYu@cluster0.itvh6gi.mongodb.net/?retryWrites=true&w=majority');
        }
        catch (error) {
            console.log(error);
        }
    });
}().then(res => {
    console.log('connection success');
});
function storeMessage(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = new MessageModel(msg);
        yield message.save();
    });
}
exports.storeMessage = storeMessage;
