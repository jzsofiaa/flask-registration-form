function submitData(){
  let clientData = {
    firstname: document.getElementById('fname').value,
    lastname: document.getElementById('lname').value,
    gender: document.getElementById('gender').value,
    email: document.getElementById('email').value,
    phonenumber: document.getElementById('phone').value
  };

  fetch(`${window.origin}/registration/result`, {
      method: "POST",
      body: JSON.stringify(clientData),
      headers: new Headers({
        "content-type": "application/json"
      })
    })
    .then(resp => resp.json())
    .then((data) => {
      console.log(data);
  })
    .catch((err) => {
    });
}
