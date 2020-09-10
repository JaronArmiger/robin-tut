import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.get('/users', (req, res) => {
  res.send('received a GET request');
});

app.post('/users', (req, res) => {
 res.send('received a POST request');
});

app.put('/users/:userId', (req, res) => {
 res.send(`received a PUT request on user ${req.params.userId}`);
});

app.delete('/users/:userId', (req, res) => {
 res.send(`received a DELETE request on user ${req.params.userId}`);
});

app.listen(port, () => {
  console.log('fuck outta here 3000');
});