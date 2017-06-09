
const Sequelize = require('sequelize')

module.exports = (options, app) => {
  const sequelize = new Sequelize(app.config.postgres, {
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true
    }
  })
  app.sequelize = sequelize
  app.Sequelize = Sequelize
}
