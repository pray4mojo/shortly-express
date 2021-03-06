var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary(); //  why link.id with lowerCase "i"
      link.string('url', 255);
      link.string('baseUrl', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      //link.integer('userId'); // just added by Nick maybe not either required or accurate
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('clicks').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('clicks', function (click) {
      click.increments('id').primary();
      click.integer('linkId'); // why linkId with upperCase "I"
      click.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});



/************************************************************/
// Add additional schema definitions below
/************************************************************/

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      //user.increments('id').primary();
      user.string('username', 255).primary();
      user.string('password', 255);
    }).then(function (table) {
      console.log('Created User Table', table);
    });
  }
  // else {
  //   db.knex.schema.dropTable('users');
  //   console.log('dropped users table');
  // }
});



module.exports = db;
