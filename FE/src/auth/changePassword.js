async function showFormChangePassWord() {
    await showProfile();
    document.getElementById("nav-info").classList.remove("active");
    document.getElementById("nav-change-pwd").classList.add("active");
    document.getElementById("personal-information").classList.remove("active");
    document.getElementById("personal-information").classList.remove("show");
    document.getElementById("chang-pwd").classList.add("active");
    document.getElementById("chang-pwd").classList.add("show");
}

function changePassword() {
    let password = document.getElementById("cpass").value;
    let newPassword = document.getElementById("npass").value;
    let vpass = document.getElementById("vpass").value;
    if (newPassword !== vpass) {
        document.getElementById("err-vpass").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Verify password does not match new password`;
    } else {
        let data = {
            password: password,
            newPassword: newPassword,
        }
        let dataToken = JSON.parse(localStorage.getItem("auth"));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${dataToken.token}`
        };
        axios.put("http://localhost:3000/users/change-password", data, {headers}).then(() => {
            document.getElementById("change-success").innerHTML = `<i class="fa-regular fa-circle-check"></i> Change password success`;
            document.getElementById("cpass").value = '';
            document.getElementById("npass").value = '';
            document.getElementById("vpass").value = '';
        }).catch(({response}) => {
            document.getElementById("err-cpass").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${response.data.error}`
        });
    }
}

function clearValidate() {
    document.getElementById("err-cpass").innerHTML = '';
    document.getElementById("change-success").innerHTML = '';
    document.getElementById("err-vpass").innerHTML = '';
}