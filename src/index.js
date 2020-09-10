import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('received a GET request');
});

app.post('/', (req, res) => {
 res.send('received a POST request');
});

app.put('/', (req, res) => {
 res.send('received a PUT request');
});

app.delete('/', (req, res) => {
 res.send('received a DELETE request');
});

app.listen(port, () => {
  console.log('fuck outta here 3000');
});