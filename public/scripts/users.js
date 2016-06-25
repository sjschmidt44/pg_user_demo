(function(module) {
  function User(obj) {
    Object.keys(obj).forEach(function(e, index, keys) {
      this[e] = obj[e];
    },this);
  }

  User.all = [];

  User.loadAll = function() {
    let jqDef = Promise.resolve($.get('/api/users'));
    jqDef.then(function(data) {
      data.rows.forEach(function(ele) {
        User.all.push(new User(ele));
      })
      console.log('creating users');
    }).then(function() {
      localStorage.users = JSON.stringify(User.all);
      console.log('storing users');
    }).then(function() {
      User.renderAll();
      console.log('renderAll complete');
    })
  }

  User.prototype.toHTML = function() {
    var $template = $('.user-template').clone();
    $template.removeClass('user-template');
    $template.removeAttr('hidden');
    $template.attr('data-record', this.id);
    $template.find('h3').text('Record #' + this.id);
    $template.find('li:first').text(this.name);
    $template.find('li:eq(1)').text(this.age);
    $template.find('li:eq(2)').text(this.sex);
    return $template;
  };

  User.clearHTML = function() {
    $('.user-template').siblings().remove();
    User.all = [];
  };

  User.renderAll = function() {
    User.all.forEach(function(ele) {
      $('#users').append(ele.toHTML());
    })
  };

  User.prototype.add = function() {
    $.get('/api/users/add', {name: this.name, age: this.age, sex: this.sex}, function(data) {

    }).error(function(err) {
      console.error(err);
    }).done(function() {
      User.clearHTML();
      console.log('User.add Done.');
    }).done(function() {
      window.setTimeout(User.loadAll, 100); // This is a hack to let the DB update before running loadAll
    })
  };

  User.prototype.update = function() {
    $.get('/api/users/update', {name: this.name, age: this.age, sex: this.sex}, function(data) {

    }).error(function(err) {
      console.error(err);
    }).done(function() {
      User.clearHTML();
      console.log('User.add Done.');
    }).done(function() {
      window.setTimeout(User.loadAll, 100); // This is a hack to let the DB update before running loadAll
    })
  };

  User.prototype.delete = function() {
    $.get('/api/users/delete', {id: this.id}, function(data) {

    }).error(function(err) {
      console.error(err);
    }).done(function() {
      User.clearHTML();
      console.log('User.delete Done.');
    }).done(function() {
      window.setTimeout(User.loadAll, 100); // This is a hack to let the DB update before running loadAll
    })
  };

  module.User = User;
})(window)
