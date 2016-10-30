'use strict'

$('#user_form').on('submit', $(this), function(e) {
  e.preventDefault()
  if (e.target.user_submit.value === 'Enter') {
    addNew(e)
  } else if (e.target.user_submit.value === 'Update') {
    update(e)
  } else if (e.target.user_submit.value === 'Delete') {
    deleteRecord(e)
  }
})

$('#users').on('click', 'section', function() {
  $('#user_form')[0].dataset.record = $(this).data('record')
  $('#user_form')[0].user_name.value = $(this).find('li')[0].textContent
  $('#user_form')[0].user_age.value = $(this).find('li')[1].textContent
  $('#user_form')[0].user_sex.value = $(this).find('li')[2].textContent
  $('#user_form')[0].user_submit.value = 'Update'
})

$('#users').on('dblclick', 'section', function() {
  $('#user_form')[0].dataset.record = $(this).data('record')
  $('#user_form')[0].user_name.value = $(this).find('li')[0].textContent
  $('#user_form')[0].user_age.value = $(this).find('li')[1].textContent
  $('#user_form')[0].user_sex.value = $(this).find('li')[2].textContent
  $('#user_form')[0].user_submit.value = 'Delete'
})

function addNew(ev) {
  const newUser = new User({
    name: ev.target.user_name.value,
    age: parseInt(ev.target.user_age.value),
    sex: ev.target.user_sex.value
  })
  newUser.add()
  ev.target.user_name.value = null
  ev.target.user_age.value = null
  ev.target.user_sex.value = null
}

function update(ev) {
  const user = User.all.filter(el => el.id === parseInt(ev.target.dataset.record))

  user[0].name = ev.target.user_name.value
  user[0].age = parseInt(ev.target.user_age.value)
  user[0].sex = ev.target.user_sex.value
  user[0].update()
}

function deleteRecord(ev) {
  const user = User.all.filter(el => el.id === parseInt(ev.target.dataset.record))
  user[0].delete()
}
