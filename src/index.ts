import express, { Express, Request, Response } from 'express';

const app:Express = express();
const port = 8000



app.get('/', (req: Request, res: Response) => {
  
  res.send('DIGIPREX SERVER IS LIVE ! ⚡');
});

app.post('/cart-abandoned',(req:Request,res:Response)=>{
  console.log("A new request received at " + Date.now());
})
app.post('/order-created',(req:Request,res:Response)=>{
  
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});