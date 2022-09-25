import express, { Express, Request, Response } from 'express';
import { handleAbaondment, handleAbaondmentBody } from './cart-abandonment-handler';
import { PostCartAbandonedBody } from './models/postCartAbandoned.model';

const app: Express = express();
const port = 8000



app.get('/', (req: Request, res: Response) => {

  res.send('DIGIPREX SERVER IS LIVE ! ⚡');
});

app.post('/cart-abandoned', (req: Request, res: Response) => {
  console.log("A new request received at " + Date.now());
})
app.post('/order-created', (req: Request, res: Response) => {
  const reqBody: PostCartAbandonedBody = req.body;
  const handleBody: handleAbaondmentBody = { c_name: reqBody.customer.first_name, cart_token: reqBody.cart_token, email: reqBody.customer.email, id: reqBody.id, phone: reqBody.phone.phone, time_of_abandonment: Date.now() }
  handleAbaondment(handleBody)
  res.send('handled successfully')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});