import express, { Express, Request, Response } from 'express';
import { handleAbaondment, handleAbaondmentBody, order_created_handler } from './cart-abandonment-handler';
import { PostCartAbandonedBody } from './models/postCartAbandoned.model';
import bodyParser from 'body-parser';
import { getMessages, Message } from './db';
const cors = require('cors')

console.clear()



const app: Express = express();
app.use(cors())
const port = 8000


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req: Request, res: Response) => {

  res.send('DIGIPREX SERVER IS LIVE ! ⚡');
});
app.get('/messages', (req: Request, res: Response) => {
  const reqParams = req.query
  const params: Message = { cart_token: (reqParams?.cart_token as any), email: (reqParams?.email as any), phone: (reqParams?.phone as any) }
 getMessages(params).then(response=>{
    res.send(JSON.stringify(response))
  }).catch(err=>{
    res.send(JSON.stringify(err))
  })
});

app.post('/cart-abandoned', (req: Request, res: Response) => {

  const reqBody: PostCartAbandonedBody = req.body;
  const handleBody: handleAbaondmentBody = { c_name: reqBody.customer.first_name, cart_token: reqBody.cart_token, email: reqBody.customer.email, id: reqBody.id, phone: reqBody.phone.phone, time_of_abandonment: Date.now() }
  const handler = handleAbaondment(handleBody)
  res.send('handled webhook successfully')
})

app.post('/order-created', (req: Request, res: Response) => {
  const cart_token = req.body.order.cart_token;
  order_created_handler(cart_token)
  res.send('handled successfully')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});