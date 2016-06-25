var pg = require('pg'),
    express = require('express'),
    port = process.env.PORT || 3000,
    app = express();

app.use(express.static(__dirname + "/public"));

app.get('/api/users', function(req, res) {
  var conString = process.env.ELEPHANTSQL_URL || null;
  var client = new pg.Client(conString);

  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT * FROM users', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
      client.end();
    });
  });
})

app.get('/api/users/add', function(req, res) {
  var conString = process.env.ELEPHANTSQL_URL || null;
  var client = new pg.Client(conString);

  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query(
      'INSERT INTO users (name, age, sex) VALUES($1, $2, $3)',
      [req.query.name, req.query.age, req.query.sex],
      function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
      client.end();
    });
  });
  res.redirect('/');
})

app.get('/api/users/update', function(req, res) {
  var conString = process.env.ELEPHANTSQL_URL || null;
  var client = new pg.Client(conString);

  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query(
      'UPDATE users SET(name, age, sex) VALUES($1, $2, $3) WHERE id=' + req.query.id,
      [req.query.name, req.query.age, req.query.sex],
      function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
      client.end();
    });
  });
  res.redirect('/');
})

app.get('/api/users/delete', function(req, res) {
  var conString = process.env.ELEPHANTSQL_URL || null;
  var client = new pg.Client(conString);

  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('DELETE FROM users WHERE id=' + req.query.id, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      client.end();
    });
  });
  res.redirect('/');
})

app.get('/', function(req, res) {
  var conString = process.env.ELEPHANTSQL_URL || null;
  var client = new pg.Client(conString);

  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query(
      'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name TEXT NOT NULL, age INT NOT NULL, sex TEXT NOT NULL)',
      function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
      client.end();
    });
  });
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
