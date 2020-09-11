import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import models from './models';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use((req, res, next) => {
  req.context = {
  	models,
  	me: models.users['1'],
  }
  next();
});

app.get('/session', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

app.get('/users', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

app.get('/users/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});

app.get('/messages', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

app.get('/messages/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

app.post('/messages', ( req, res) => {
  const id = uuidv4();
  const message = {
  	id,
  	text: req.body.text,
  	userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;
  return res.send(message);
});

app.put('/messages/:messageId', (req, res) => {
  const message = req.context.models.messages[req.params.messageId];
  if (message.userId === req.context.me.id) {
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
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;
  return res.send(message);
});

app.listen(port, () => {
  console.log('fuck outta here 3000');
});