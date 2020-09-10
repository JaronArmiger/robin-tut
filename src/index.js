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
  res.send(Object.values(users));
});

app.get('/users/:userId', (req, res) => {
  res.send(users[req.params.userId]);
});

app.listen(port, () => {
  console.log('fuck outta here 3000');
});