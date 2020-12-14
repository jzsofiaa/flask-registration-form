function editUser() {
  let userDataById = findUserById(localStorage.userID);
  //console.log(userDataById.firstname);
  document.getElementById('fname').value = userDataById.firstname;
  document.getElementById('lname').value = userDataById.lastname;
  document.getElementById('gender').value = userDataById.gender;
  document.getElementById('email').value = userDataById.email;
  document.getElementById('phone').value = userDataById.phonenumber;

  document.getElementById('submit-btn').addEventListener('click', updateData);
}

function findUserById(id) {
  let usersRegistrationData = JSON.parse(localStorage.usersRegistrationData);

  for(let i = 0; i < usersRegistrationData.length; i++) {
    if(id == usersRegistrationData[i].id) {
      return usersRegistrationData[i];
    }
  };
}

function updateData() {
  let updatedDataByUser = {
    id: localStorage.userID,
    firstname: document.getElementById('fname').value,
    lastname: document.getElementById('lname').value,
    gender: document.getElementById('gender').value,
    email: document.getElementById('email').value,
    phonenumber: document.getElementById('phone').value
  };

  fetch(`${window.origin}/edit/result`, {
      method: "POST",
      body: JSON.stringify(updatedDataByUser),
      headers: new Headers({
        "content-type": "application/json"
      })
    })
    .then(resp => resp.json())
    .then((data) => {
      window.location.replace(`${window.origin}/home`);
    })
    .catch((err) => {
      console.log('Error: ', err)
    })
}
