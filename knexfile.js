const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/recipes";

require('dotenv').config()

module.exports = {
  development: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
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
      filename: "./database/test.db3", // "./database/test.db3" or ":memory:"
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
    client: 'pg',
    connection: process.env.DATABASE_URL,
    
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  
  
}

};