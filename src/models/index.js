import Sequelize from 'sequelize';
import user from './user';
import message from './message';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  }
);

const User = user(sequelize, Sequelize.DataTypes);
const Message = message(sequelize, Sequelize.DataTypes);

const models = {
  User,
  Message,
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;