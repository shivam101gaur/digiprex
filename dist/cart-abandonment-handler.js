"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartAbondmentHandler = exports.handleAbaondment = exports.order_created_handler = void 0;
const db_1 = require("./db");
function order_created_handler(cart_token) {
    var _a;
    // clear message sending cycle
    (_a = handlers.find(ele => {
        return ele.cart_token == cart_token;
    })) === null || _a === void 0 ? void 0 : _a.clearTimer();
    console.log('Stopped  sending messages to user, because a order is created for the cart');
}
exports.order_created_handler = order_created_handler;
const handlers = [];
function handleAbaondment(params) {
    // Actual intervals 
    // T1 = t+30 minutes
    // T2 = t + 1 day
    // T3 = t+3 days
    // const t1 = params.time_of_abandonment + (30 * 60 * 1000)
    // Simulation intervals 
    // T1 = t+3 seconds
    // T2 = t + 15 seconds
    // T3 = t+3 45 seconds
    const handle = new cartAbondmentHandler(params);
    handlers.push(handle);
    return handle;
}
exports.handleAbaondment = handleAbaondment;
function sendMessage(message, handler) {
    console.log(`\nš[ SERVER is sending message to ${handler.phone} & ${handler.email}   : (time sent at : ${new Date()} ) ] = > ${message}\n`);
    const msg = {
        cart_token: handler.cart_token,
        content: message,
        email: handler.email,
        phone: handler.phone,
        time_sent: Date.now()
    };
    (0, db_1.storeMessage)(msg).then(res => {
        console.log(`message stored in DB with id : ${res._id}`);
    }).catch(err => {
        console.log('message could not be stored !');
    });
}
class cartAbondmentHandler {
    constructor(params) {
        this.intervals = [];
        this.c_name = params.c_name;
        this.cart_token = params.cart_token;
        this.phone = params.phone;
        this.email = params.email;
        this.time_of_abandonment = params.time_of_abandonment;
        this.id = params.id;
        const t = this.time_of_abandonment;
        const t1 = t + (3000);
        const t2 = t + (15000);
        const t3 = t + (45000);
        // Actual intervals 
        // T1 = t+30 minutes
        // T2 = t + 1 day
        // T3 = t+3 days
        // const t1 = params.time_of_abandonment + (30 * 60 * 1000)
        // Simulation intervals 
        // T1 = t+3 seconds
        // T2 = t + 15 seconds
        // T3 = t+3 45 seconds
        this.intervals = [t1, t2, t3];
        this.handler();
    }
    handler() {
        if (this.intervals.length > 0) {
            const t = this.intervals[0];
            const t_now = Date.now();
            const time_left = t - t_now;
            clearTimeout(this.timerRef);
            this.timerRef = setTimeout((msgCount = 3 - this.intervals.length) => {
                sendMessage(`Message# ${msgCount} - You have left unchecked items in your cart !`, this);
                this.handler();
            }, time_left);
            this.intervals.splice(0, 1);
        }
        else {
            console.log('Messages sequence intervals are over now!!');
        }
    }
    clearTimer() {
        clearTimeout(this.timerRef);
    }
}
exports.cartAbondmentHandler = cartAbondmentHandler;
