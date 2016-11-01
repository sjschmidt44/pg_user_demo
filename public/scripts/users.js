'use strict'

function User(obj) {
  Object.keys(obj).forEach(e => this[e] = obj[e])
}

User.all = []

User.loadAll = () => {
  $.get('/api/users')
  .then(results => buildUsers(results), err => console.error(err))
  .then(User.renderAll, err => console.error(err))

  function buildUsers(data) {
    data.rows.forEach(ele => User.all.push(new User(ele)))
    localStorage.users = JSON.stringify(User.all)
  }
}

User.prototype.toHTML = function() {
  const $template = $('.user-template').clone()
  $template.removeClass('user-template')
  $template.removeAttr('hidden')
  $template.attr('data-record', this.id)
  $template.find('h3').text(`Record # ${this.id}`)
  $template.find('li:first').text(this.name)
  $template.find('li:eq(1)').text(this.age)
  $template.find('li:eq(2)').text(this.sex)
  return $template
}

User.clearHTML = () => {
  $('.user-template').siblings().remove()
  User.all = []
  // User.loadAll()
}

User.renderAll = () => {
  User.all.forEach(ele => $('#users').append(ele.toHTML()))
}

User.prototype.add = function() {
  const vals = {name: this.name, age: this.age, sex: this.sex}
  $.post('/api/users', vals)
  .then(User.clearHTML, err => console.error(err))
  .then(User.loadAll, err => console.error(err))
}

User.prototype.update = function() {
  const vals = {id: this.id, name: this.name, age: this.age, sex: this.sex}
  $.ajax({url: '/api/users', method: 'PUT', data: vals})
  .then(User.clearHTML, err => console.error(err))
  .then(User.loadAll, err => console.error(err))
}

User.prototype.delete = function() {
  $.ajax({url: '/api/users', method: 'DELETE', data: {id: this.id}})
  .then(User.clearHTML, err => console.error(err))
  .then(User.loadAll, err => console.error(err))
}
