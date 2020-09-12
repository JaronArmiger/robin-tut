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

app.use((req, res, next) => {
  req.context = {
  	models,
  	me: models.users['1'],
  }
  next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

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