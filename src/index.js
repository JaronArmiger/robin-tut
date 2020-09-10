import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('sup MFS');
});

app.listen(3000, () => {
  console.log('fuck outta here 3000');
});