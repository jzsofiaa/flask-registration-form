function tableData() {
  // get data from JSON file
  fetch(`${window.origin}/json_data`)
  .then((resp) => resp.json())
  .then((data) => {
    localStorage.setItem('usersRegistrationData', JSON.stringify(data));
    allRegisters(data);
  })
  .catch((err) => {
  });
}

function allRegisters(data) {
  for (let i = 0; i < data.length; i++) {
    newRow(data[i]);
  }
}

// create new row
function newRow(data) {
  let row = document.createElement('tr');
  row.className = "table-row";
  row.id = data.id;
  document.getElementById('table-body').appendChild(row);

  usersData(data,row);
}

// filling a row with data
function usersData(data,row) {
  let fnameTd = document.createElement('td');
  fnameTd.innerHTML = data.firstname;
  row.appendChild(fnameTd);

  let lnameTd = document.createElement('td');
  lnameTd.innerHTML = data.lastname;
  row.appendChild(lnameTd);

  let genderTd = document.createElement('td');
  genderTd.innerHTML = data.gender;
  row.appendChild(genderTd);

  let emailTd = document.createElement('td');
  emailTd.innerHTML = data.email;
  row.appendChild(emailTd);

  let phoneTd = document.createElement('td');
  phoneTd.innerHTML = data.phonenumber;
  row.appendChild(phoneTd);

  // create delete button
  let deleteTd = document.createElement('td');
  deleteTd.id = 'delete-button-td';
  row.appendChild(deleteTd);

  let currentButton = document.createElement('span');
  currentButton.className = 'delete-button';
  currentButton.innerHTML = '&times;';
  deleteTd.appendChild(currentButton);

  // create edit button
  let editTd = document.createElement('td');
  editTd.id = 'edit-button-td';
  row.appendChild(editTd);

  let editButton = document.createElement('span');
  editButton.className = 'edit-button';
  editButton.innerHTML = '&#9998;';
  editTd.appendChild(editButton);

  addDeleteEvent(currentButton, data.id);
  addEditEvent(editButton, data.id);
}

// delete button - confirmation modal
function addDeleteEvent(deleteBtn, id) {
  deleteBtn.addEventListener('click', () => {
    document.getElementById('confirm-modal').style.display = 'block';
    dontConfirmToDelete();
    confirmToDelete(id);
  });
}

function dontConfirmToDelete() {
  let closeModalButton = document.getElementsByClassName('close-modal');
  for(let i = 0; i < closeModalButton.length; i++) {
    closeModalButton[i].onclick = () => {
      document.getElementById('confirm-modal').style.display = 'none';
    }
  }
}

function confirmToDelete(id) {
  document.getElementById('yes-button').addEventListener('click', () => {
    document.getElementById('confirm-modal').style.display = 'none';
    postIdToDeleteEntry(id);
  });
}

// post request to server
function postIdToDeleteEntry(id) {
  let postId = {"id": id};

  fetch(`${window.origin}/delete`, {
      method: "POST",
      body: JSON.stringify(postId),
      headers: new Headers({
        "content-type": "application/json"
      })
    })
    .then(resp => resp.json())
    .then((data) => {
      deleteRowById(id);
    })
    .catch((err) => {
      console.log('Error: ', err)
    })
  }

// client side row delete
function deleteRowById(id) {
  let currentRow = document.getElementById(id);
  currentRow.style.display = 'none';
}

// edit button action
function addEditEvent(editButton, id) {
  editButton.addEventListener('click', () => {
    localStorage.setItem('userID', JSON.stringify(id));
    location.href = `${window.origin}/edit`;
  });
}

function findUserById(id) {
  let usersRegistrationData = JSON.parse(localStorage.usersRegistrationData);

  for(let i = 0; i < usersRegistrationData.length; i++) {
    if(id == usersRegistrationData[i].id) {
      return usersRegistrationData[i];
    }
  };
}
