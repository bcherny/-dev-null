export default class Db {
  constructor(connection, dbName) {
    this.db = connection.database(dbName);
    this.db.exists((err, exists) => {
      if (err) {
        console.error(err);
      } else if (exists) {
        console.log(`Connected to couch database: ${dbName}`);
      } else {
        console.log(`Creating couch database: ${dbName}`);
        this.db.create(function(err) {
          if(err) {
            console.error(err);
          } else {
            console.log(`Created couch database: ${dbName}`);
            //TODO: Put schema?
          }
        });
      }
    })
  }
}