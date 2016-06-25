(function() {
  $('#user_form').on('submit', function(e) {
    if ($('#user_form')[0].user_submit.value === 'Submit') {
      addNew(e, this);
    } else if ($('#user_form')[0].user_submit.value === 'Update') {
      update(e);
    } else if ($('#user_form')[0].user_submit.value === 'Delete') {
      deleteRecord(e, this);
    }
  });

  $('#users').on('click', 'section', function(e) {
    var id = $(this).data('record');
    var user = User.all.filter(function(ele) {
      return ele.id === id;
    });

    $('#user_form')[0].user_name.value = $(this).find('li')[0].textContent;
    $('#user_form')[0].dataset.record = $(this).data('record');
    $('#user_form')[0].user_age.value = $(this).find('li')[1].textContent;
    $('#user_form')[0].user_sex.value = $(this).find('li')[2].textContent;
    $('#user_form')[0].user_submit.value = 'Update';
  });

  $('#users').on('dblclick', 'section', function(e) {
    var id = $(this).data('record');
    var user = User.all.filter(function(ele) {
      return ele.id === id;
    });

    $('#user_form')[0].user_name.value = $(this).find('li')[0].textContent;
    $('#user_form')[0].dataset.record = $(this).data('record');
    $('#user_form')[0].user_age.value = $(this).find('li')[1].textContent;
    $('#user_form')[0].user_sex.value = $(this).find('li')[2].textContent;
    $('#user_form')[0].user_submit.value = 'Delete';
  });

  function addNew(ev, ele) {
    ev.preventDefault();
    var newUser = new User({
      name: ele.user_name.value,
      age: parseInt(ele.user_age.value),
      sex: ele.user_sex.value
    })
    newUser.add()
    ele.user_name.value = null;
    ele.user_age.value = null;
    ele.user_sex.value = null;
  }

  function update(ev) {
    ev.preventDefault();
    var id = parseInt(ev.target.dataset.record);
    var user = User.all.filter(function(el) {
      return el.id === id;
    });
    if (user.length === 1) {
      user[0].update();
    } else {
      console.error('IndexError: Record does not exist.');
    }
  }

  function deleteRecord(e, ele) {
    var id = $(ele).data('record');
    var user = User.all.filter(function(el) {
      return el.id === id;
    });
    if (user.length === 1) {
      user[0].delete();
    } else {
      console.error('IndexError: Record does not exist');
    }
  }
})()
