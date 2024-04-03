function showFormLogin() {
    document.getElementById("auth-form").innerHTML = `
    <h1 class="mb-0 text-center">Sign in</h1>
                              <p class="text-center text-dark mt-1">Enter your email address and password to access admin panel.</p>
                              <div class="mt-5">
                                  <div class="form-group">
                                      <label for="username">Username</label>
                                      <input type="text" class="form-control mb-0" id="username" placeholder="Username">
                                  </div>
                                  <div class="form-group">
                                      <label for="password">Password</label>
                                      <a href="#" class="float-right">Forgot password?</a>
                                      <input type="password" class="form-control mb-0" id="password" placeholder="Password">
                                  </div>
                                  <span id="error-sign-up"></span>
                                  <div class="d-inline-block w-100">
                                      <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                          <input type="checkbox" class="custom-control-input" id="customCheck1">
                                          <label class="custom-control-label" for="customCheck1">Remember Me</label>
                                      </div>
                                  </div>
                                  <div class="sign-info text-center">
                                      <button type="submit" class="btn btn-primary d-block w-100 mb-2" onclick="login()">Sign in</button>
                                      <span class="text-dark dark-color d-inline-block line-height-2">Don't have an account? <a href="#" onclick="showFormRegister()">Sign up</a></span>
                                  </div>
                              </div>
    `
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let user = {
        username: username,
        password: password
    }
    axios.post("http://localhost:3000/users/login", user).then(({data}) => {
        alert("Đăng nhập thành công!")
        localStorage.setItem("token", data.token);
    }).catch(({response}) => {
        document.getElementById("error-sign-up").innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' + response.data.message;
    })
}

// showFormAuth();
// showFormLogin();