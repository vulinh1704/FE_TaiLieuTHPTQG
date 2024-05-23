function showFormEditProfile() {
    document.getElementById("upload-avatar").style.display = "block";
    document.getElementById("username").readOnly = false;
    document.getElementById("email").readOnly = false;
    document.getElementById("label-male").htmlFor = "male";
    document.getElementById("label-female").htmlFor = "female";
    document.getElementById("dateOfBirth").readOnly = false;
    document.getElementById("btn-profile").innerHTML = `<button type="submit" class="btn btn-primary mr-2" onclick="editProfile()">Save</button>`
}

function editProfile() {
    let avatar = document.getElementById("avatar-profile").src;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let radios = document.getElementsByName('gender');
    let gender = "";
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            gender = radios[i].value
            break;
        }
    }
    let dateOfBirth = document.getElementById("dateOfBirth").value;
    let user = {
        avatar: avatar,
        username: username,
        email: email,
        gender: gender,
        dateOfBirth: dateOfBirth
    }
    let dataToken = JSON.parse(localStorage.getItem("auth"));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${dataToken.token}`
    };
    axios.put("http://localhost:3000/users", user, {headers}).then(async () => {
        await showProfile();
        await showNavbar();
    });
}