import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

let users = {
  1: {
  	id: '1',
  	username: 'Khomeini',
  },
  2: {
  	id: '2',
  	username: 'Khamenei',
  },
};

let messages = {
  1: {
  	id: '1',
  	text: 'bonyads',
  	userId: '1'
  },
  2: {
  	id: '2',
  	text: 'zurkhana',
  	userId: '2'
  },
};

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