const Sequelize = require('sequelize');
const connection = new Sequelize(process.env.DATABASE_URL, { logging: false });

const User = connection.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.belongsTo(User, { as: 'manager' });

User.findManagers = function() {
  return User.findAll({
    where: {
      managerId: {
        $ne: null,
      },
    },
    include: {
      model: User,
      as: 'manager',
    },
  }).then(users => {
    const managers = [];
    const managerId = [];
    users.forEach(function(user) {
      if (managerId.indexOf(user.managerId) < 0) {
        managerId.push(user.managerId);
        managers.push(user.manager);
      }
    });
    return managers;
  });
};

const syncAndSeed = () => {
  connection.sync({ force: true }).then(() => {
    return Promise.all([
      User.create({ name: 'James' }),
      User.create({ name: 'Harry', }),
      User.create({ name: 'Frank', }),
    ]).then(([James, Harry, Frank]) => {
      James.setManager(Frank);
      Harry.setManager(James);
      Frank.setManager(Harry);
      return Promise.all([James, Harry, Frank].map(function(user){
        return user.save();
      })).then(() => console.log('sync and seeded'))
      .catch((error) => console.log(error));
    })
  });
};

module.exports = {
  syncAndSeed,
  models: {
    User,
  },
};
