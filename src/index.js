import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use((req, res, next) => {
  req.me = users['1'];
  next();
});

app.get('/session', (req, res) => {
  return res.send(users[req.me.id]);
});

app.get('/users', (req, res) => {
  res.send(Object.values(users));
});

app.get('/users/:userId', (req, res) => {
  res.send(users[req.params.userId]);
});

app.get('/messages', (req, res) => {
  res.send(Object.values(messages));
});

app.get('/messages/:messageId', (req, res) => {
  res.send(messages[req.params.messageId]);
});

app.post('/messages', ( req, res) => {
  const id = uuidv4();
  const message = {
  	id,
  	text: req.body.text,
  	userId: req.me.id,
  };

  messages[id] = message;
  return res.send(message);
});

app.put('/messages/:messageId', (req, res) => {
  const message = messages[req.params.messageId];
  if (message.userId === req.me.id) {
  	message.text = req.body.text;
  	res.send(message);
  } else {
  	res.send('Permission denied');
  }
});

app.delete('/messages/:messageId', (req, res) => {
  const {
  	[req.params.messageId]: message,
  	...otherMessages
  } = messages;

  messages = otherMessages;
  return res.send(message);
});

app.listen(port, () => {
  console.log('fuck outta here 3000');
});