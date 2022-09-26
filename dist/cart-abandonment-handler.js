"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartAbondmentHandler = exports.order_created_handler = exports.handleAbaondment = void 0;
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
function order_created_handler(cart_token) {
    var _a;
    (_a = handlers.find(ele => {
        return ele.cart_token == cart_token;
    })) === null || _a === void 0 ? void 0 : _a.clearTimer();
    console.log('cleared timer');
}
exports.order_created_handler = order_created_handler;
function sendMessage(message, timeStamp, nextMessageTimer) {
    console.log('😎[ SERVER is sending message  : (time sent at :' + ' ) ] = > ' + message);
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
        console.log({ t });
        const t1 = t + (3000);
        const t2 = t + (6000);
        const t3 = t + (12000);
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
            console.log({ time_left, t_now });
            clearTimeout(this.timerRef);
            this.timerRef = setTimeout(() => {
                sendMessage('your cart is empty!!', Date.now(), this.intervals[1]);
                this.handler();
            }, time_left);
            this.intervals.splice(0, 1);
        }
        else {
            console.log('intervals are over now!!');
        }
    }
    clearTimer() {
        clearTimeout(this.timerRef);
    }
}
exports.cartAbondmentHandler = cartAbondmentHandler;
