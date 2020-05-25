const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/recipes";

module.exports = {
  development: {
      client: 'sqlite3',
      connection: {
          filename: './database/familyRecipes.db3'
      },
      useNullAsDefault: true,
      migrations: {
          directory: './database/migrations'
      },
      seeds: {
          directory: './database/seeds'
      },
      pool: {
          afterCreate: (conn, done) => {
              conn.run('PRAGMA foreign_keys = ON', done);
          }
      },
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./database/test.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  //heroku postgres or sqlite
  production: {
      client: 'sqlite3',     //or pg?
      connection: process.env.DATABASE_URL,
      pool: {
          min: 2,
          max: 10
      },
      migrations: {
        directory: "./database/migrations",
      },
      seeds: {
        directory: "./database/seeds",
      },
  },

};