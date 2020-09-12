import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import models, { sequelize } from './models';
import routes from './routes';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(async (req, res, next) => {
  req.context = {
  	models,
  	me: await models.User.findByLogin('yussef'),
  }
  next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.get('*', function (req, res, next) {
  const error = new Error(
    `${req.ip} tried to access ${req.originalUrl}`,
  );
  error.statusCode = 301;

  next(error);
});

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;
  if (error.statusCode === 301) {
  	return res.status(301).redirect('/not-found');
  }

  return res
    .status(error.statusCode)
    .json({ error: error.toString() });
});

const eraseDatabaseOnSync = true

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
  	createUsersWithMessages();
  }

  app.listen(process.env.PORT, () => {
    console.log('ay we in this');
  });
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'yussef',
      messages: [
        {
          text: 'I hope they say yussef',
        }
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'ass ketchum',
      messages: [
       {
         text: 'vamos a bailar'
       },
       {
       	text: 'sleeeeeeeep',
       },
      ],
    },
    {
      include: [models.Message],
    }
  );
};