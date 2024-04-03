function showFormAuth() {
    document.getElementById("main").innerHTML = `
    <section class="sign-in-page">
        <div id="container-inside">
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
        </div>
        <div class="container p-0">
            <div class="row no-gutters height-self-center">
                <div class="col-sm-12 align-self-center bg-primary rounded">
                    <div class="row m-0">
                        <div class="col-md-5 bg-white sign-in-page-data">
                            <div class="sign-in-from mt-md-5" id="auth-form">
                               
                            </div>
                        </div>
                        <div class="col-md-7 text-center sign-in-page-image">
                            <div class="sign-in-detail text-white">
                                <a class="sign-in-logo mb-4" href="#"><img src="images/logo_full.png" class="img-fluid" alt="logo"></a>
                                <div class="owl-carousel" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items="1" data-items-laptop="1" data-items-tab="1" data-items-mobile="1" data-items-mobile-sm="1" data-margin="0">
                                    <div class="item">
                                        <img src="images/login/img.png" class="img-fluid mb-4" alt="logo">
                                            <h4 class="mb-1 text-white">Review with us</h4>
                                        <p>That will help you achieve high results in the national high school exam.</p>
                                    </div>
                                    <div class="item">
                                        <img src="images/login/img_1.png" class="img-fluid mb-4" alt="logo">
                                            <h4 class="mb-1 text-white">Notes</h4>
                                        <p>It is an indispensable thing for the knowledge you learn to be stored.</p>
                                    </div>
                                    <div class="item">
                                        <img src="images/login/img_2.png" class="img-fluid mb-4" alt="logo">
                                        <h4 class="mb-1 text-white">Complete the exam</h4>
                                        <p>Choose tests and complete them so you can apply what you've learned.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `
}


function showFormRegister() {
    document.getElementById("auth-form").innerHTML = `
    <h1 class="mb-0 text-center">Sign Up</h1>
                                <p class="text-center text-dark mt-1">Enter your email address and password to access the system page.</p>
                                <div class="mt-5">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Your Username</label>
                                        <input type="email" class="form-control mb-0" id="username" placeholder="Your Username">
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail2">Email Address</label>
                                        <input type="email" class="form-control mb-0" id="email" placeholder="Enter Email">
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control mb-0" id="password" placeholder="Password">
                                    </div>
                                    <span id="error-sign-up"></span>
                                    <div class="sign-info text-center">
                                        <button type="submit" class="btn btn-primary d-block w-100 mb-2" onclick="register()">Sign Up</button>
                                        <span class="text-dark d-inline-block line-height-2">Already Have Account ? <a href="#" onclick="showFormLogin()">Log In</a></span>
                                    </div>
                                </div>
    `
}

function register() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let user = {
        username: username,
        password: password,
        email: email
    }
    axios.post("http://localhost:3000/users/register", user).then(() => {
        alert("Đăng ký thành công!")
        showFormLogin();
    }).catch(({response}) => {
        document.getElementById("error-sign-up").innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' + response.data.error;
    })
}

