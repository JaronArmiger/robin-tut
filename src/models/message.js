const message = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      	notEmpty: true,
      },
    }
  });

  return Message;
};

export default message;