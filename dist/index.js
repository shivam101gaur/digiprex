"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_abandonment_handler_1 = require("./cart-abandonment-handler");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 8000;
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('DIGIPREX SERVER IS LIVE ! ⚡');
});
app.post('/cart-abandoned', (req, res) => {
    const reqBody = req.body;
    const handleBody = { c_name: reqBody.customer.first_name, cart_token: reqBody.cart_token, email: reqBody.customer.email, id: reqBody.id, phone: reqBody.phone.phone, time_of_abandonment: Date.now() };
    const handler = (0, cart_abandonment_handler_1.handleAbaondment)(handleBody);
    res.send('handled webhook successfully');
});
app.post('/order-created', (req, res) => {
    const cart_token = req.body.order.cart_token;
    (0, cart_abandonment_handler_1.order_created_handler)(cart_token);
    res.send('handled successfully');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
