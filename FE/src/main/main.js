function showMain() {
    document.getElementById("main").innerHTML = `
    <div class="wrapper">
        <!-- Sidebar  -->
        <div class="iq-sidebar" id="sidebar">
        </div>
        <!-- TOP Nav Bar -->
        <div class="iq-top-navbar" id="navbar">
            
        </div>
        <!-- TOP Nav Bar END -->

        <!-- Page Content  -->
        <div class="content-page">
            <div class="container-fluid" id="page-content">
                
            </div>
        </div>
    </div>
    <footer class="iq-footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6">
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item"><a href="#">Graduation thesis</a></li>
                        <li class="list-inline-item"><a href="#">My Project</a></li>
                    </ul>
                </div>
                <div class="col-lg-6 text-right">
                     2024 <a href="#">TaiLieu</a> THPTQG.
                </div>
            </div>
        </div>
    </footer>
    `
    let auth = JSON.parse(localStorage.getItem("auth"));
    if (auth && auth.role === "USER") {
        showSidebarUser();
        showNavbar();
    }

    if (auth && auth.role === "ADMIN") {
        showSidebarAdmin();
        showNavbar();
    }

}

function showSidebarAdmin() {
    document.getElementById("sidebar").innerHTML = `
    <div class="iq-navbar-logo d-flex justify-content-between">
                <a href="" class="header-logo">
                    <img src="images/logo-3.png" class="img-fluid rounded" alt="">
                    <span>VietNam</span>
                </a>
                <div class="iq-menu-bt align-self-center">
                    <div class="wrapper-menu">
                        <div class="main-circle"><i class="ri-menu-line"></i></div>
                        <div class="hover-circle"><i class="ri-close-fill"></i></div>
                    </div>
                </div>
            </div>
            <div id="sidebar-scrollbar">
                <nav class="iq-sidebar-menu">
                    <ul id="iq-sidebar-toggle" class="iq-menu">
                        <li id="post">
                            <a href="#dashboard" class="iq-waves-effect" data-toggle="collapse" aria-expanded="false"><span class="ripple rippleEffect"></span><i class="las fa-newspaper iq-arrow-left"></i><span>Post</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                            <ul id="dashboard" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li id="list-news" onclick="router('post/list-news')"><a href="#"><i class="las fa-list"></i>List Post</a></li>
                                <li id="add-news" onclick="router('post/add-news')"><a href="#"><i class="las fa-plus"></i>Add Post</a></li>
                            </ul>
                        </li>
                        
                        <li id="user">
                            <a href="#userinfo" class="iq-waves-effect" data-toggle="collapse" aria-expanded="false"><span class="ripple rippleEffect"></span><i class="las la-user-tie iq-arrow-left"></i><span>User</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                            <ul id="userinfo" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li id="profile" onclick="router('user/profile')"><a href="#"><i class="las la-id-card-alt"></i>Your Profile</a></li>
                                <li id="change-password" onclick="router('user/change-password')"><a href="#"><i class="las la-edit"></i>Change Password</a></li>
<!--                                <li><a href="#"><i class="las la-th-list"></i>User List</a></li>-->
                            </ul>
                        </li>

                    
                        <li id="subjectss">
                            <a href="#extra-pages" class="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i class="fa-solid fa-book-open iq-arrow-left"></i><span>Subjects</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                            <ul id="extra-pages" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li id="list-subjects" onclick="router('subjectss/list-subjects')"><a href="#"><i class="fa-solid fa-list"></i>List</a></li>
                            </ul>
                        </li>
                        <li id="exam">
                            <a href="#menu-level" class="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i class="fa-regular fa-file-lines iq-arrow-left"></i><span>Exam</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                            <ul id="menu-level" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li id="list-exam" onclick="router('exam/list-exam')"><a href="#"><i class="las fa-list"></i>List Exam</a></li>
                                <li id="add-exam" onclick="router('exam/add-exam')"><a href="#"><i class="las fa-plus"></i>Add Exam</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div class="p-3"></div>
            </div>
    `
}

function showSidebarUser() {
    document.getElementById("sidebar").innerHTML = `
    <div class="iq-navbar-logo d-flex justify-content-between">
                <div class="iq-menu-bt align-self-center">
                    <div class="wrapper-menu">
                        
                    </div>
                    <img src="images/logo-3.png" alt="" style="position: relative; right: 10px">
                </div>
            </div>
            <div id="sidebar-scrollbar">
                <nav class="iq-sidebar-menu">
                    <ul id="iq-sidebar-toggle" class="iq-menu">
                        <li id="post">
                            <a href="#dashboard" class="iq-waves-effect" data-toggle="collapse" aria-expanded="false"><span class="ripple rippleEffect"></span><i class="las fa-newspaper iq-arrow-left"></i><span>Post</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                            <ul id="dashboard" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li id="list-news" onclick="router('post/list-news')"><a href="#"><i class="las fa-list"></i>List Post</a></li>
<!--                                <li id="add-news" onclick="router('post/add-news')"><a href="#"><i class="las fa-plus"></i>Add Post</a></li>-->
                            </ul>
                        </li>
                        
                        <li id="user">
                            <a href="#userinfo" class="iq-waves-effect" data-toggle="collapse" aria-expanded="false"><span class="ripple rippleEffect"></span><i class="las la-user-tie iq-arrow-left"></i><span>User</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                            <ul id="userinfo" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li id="profile" onclick="router('user/profile')"><a href="#"><i class="las la-id-card-alt"></i>Your Profile</a></li>
                                <li id="change-password" onclick="router('user/change-password')"><a href="#"><i class="las la-edit"></i>Change Password</a></li>
                            </ul>
                        </li>
<!--                        <li>-->
<!--                            <a href="#extra-pages" class="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i class="ri-pantone-line iq-arrow-left"></i><span>Extra Pages</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>-->
<!--                            <ul id="extra-pages" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">-->
<!--                                <li><a href="pages-timeline.html"><i class="ri-map-pin-time-line"></i>Timeline</a></li>-->
<!--                                <li><a href="pages-invoice.html"><i class="ri-question-answer-line"></i>Invoice</a></li>-->
<!--                                <li><a href="blank-page.html"><i class="ri-invision-line"></i>Blank Page</a></li>-->
<!--                                <li><a href="pages-error.html"><i class="ri-error-warning-line"></i>Error 404</a></li>-->
<!--                                <li><a href="pages-error-500.html"><i class="ri-error-warning-line"></i>Error 500</a></li>-->
<!--                                <li><a href="pages-pricing.html"><i class="ri-price-tag-line"></i>Pricing</a></li>-->
<!--                                <li><a href="pages-pricing-one.html"><i class="ri-price-tag-2-line"></i>Pricing 1</a></li>-->
<!--                                <li><a href="pages-maintenance.html"><i class="ri-archive-line"></i>Maintenance</a></li>-->
<!--                                <li><a href="pages-comingsoon.html"><i class="ri-mastercard-line"></i>Coming Soon</a></li>-->
<!--                                <li><a href="pages-faq.html"><i class="ri-compasses-line"></i>Faq</a></li>-->
<!--                            </ul>-->
<!--                        </li>-->
                        <li id="exam">
                            <a href="#menu-level" class="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i class="fa-regular fa-file-lines iq-arrow-left"></i><span>Exam</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                            <ul id="menu-level" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li id="list-exam" onclick="router('exam/list-exam')"><a href="#"><i class="las fa-list"></i>List Exam</a></li>
                                <li id="add-Exam-Custom" onclick="router('exam/add-Exam-Custom')"><a href="#"><i class="fa-regular fa-square-plus"></i>Add Exam</a></li>
                                <li id="result-exam" onclick="router('exam/result-exam')"><a href="#"><i class="fa-regular fa-circle-check"></i>Result Exam</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div class="p-3"></div>
            </div>
    `
    document.getElementById("body").classList.add("sidebar-main");
}

async function showNavbar() {
    let dataToken = JSON.parse(localStorage.getItem("auth"));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${dataToken.token}`
    };
    let {data} = await axios.get("http://localhost:3000/users", {headers});
    document.getElementById("navbar").innerHTML = `
    <div class="iq-navbar-custom">
                <nav class="navbar navbar-expand-lg navbar-light p-0">
                    <div class="iq-menu-bt d-flex align-items-center">
                        <div class="wrapper-menu">
                            <div class="main-circle"><i class="ri-menu-line"></i></div>
                            <div class="hover-circle"><i class="ri-close-fill"></i></div>
                        </div>
                        <div class="iq-navbar-logo d-flex justify-content-between ml-3">
                            <a href="index.html" class="header-logo">
                                <img src="images/logo-3.png" class="img-fluid rounded" alt="">
                                <span>VietNam</span>
                            </a>
                        </div>
                    </div>
                    <div class="iq-search-bar">
<!--                        <form action="#" class="searchbox">-->
<!--                            <input type="text" class="text search-input" placeholder="Type here to search...">-->
<!--                            <a class="search-link" href="#"><i class="ri-search-line"></i></a>-->
<!--                        </form>-->
                    </div>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"  aria-label="Toggle navigation">
                        <i class="ri-menu-3-line"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto navbar-list">
                            <li class="nav-item nav-icon">
<!--                                <a href="#" class="search-toggle iq-waves-effect bg-primary rounded">-->
<!--                                    <i class="ri-notification-line"></i>-->
<!--                                    <span class="bg-danger dots"></span>-->
<!--                                </a>-->
                                <div class="iq-sub-dropdown">
<!--                                    <div class="iq-card shadow-none m-0">-->
<!--                                        <div class="iq-card-body p-0 ">-->
<!--                                            <div class="bg-primary p-3">-->
<!--                                                <h5 class="mb-0 text-white">All Notifications<small class="badge  badge-light float-right pt-1">4</small></h5>-->
<!--                                            </div>-->
<!--                                            <a href="#" class="iq-sub-card" >-->
<!--                                                <div class="media align-items-center">-->
<!--                                                    <div class="">-->
<!--                                                        <img class="avatar-40 rounded" src="images/user/01.jpg" alt="">-->
<!--                                                    </div>-->
<!--                                                    <div class="media-body ml-3">-->
<!--                                                        <h6 class="mb-0 ">Emma Watson Barry</h6>-->
<!--                                                        <small class="float-right font-size-12">Just Now</small>-->
<!--                                                        <p class="mb-0">95 MB</p>-->
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                            </a>-->
<!--                                            <a href="#" class="iq-sub-card" >-->
<!--                                                <div class="media align-items-center">-->
<!--                                                    <div class="">-->
<!--                                                        <img class="avatar-40 rounded" src="images/user/02.jpg" alt="">-->
<!--                                                    </div>-->
<!--                                                    <div class="media-body ml-3">-->
<!--                                                        <h6 class="mb-0 ">New customer is join</h6>-->
<!--                                                        <small class="float-right font-size-12">5 days ago</small>-->
<!--                                                        <p class="mb-0">Cyst Barry</p>-->
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                            </a>-->
<!--                                            <a href="#" class="iq-sub-card" >-->
<!--                                                <div class="media align-items-center">-->
<!--                                                    <div class="">-->
<!--                                                        <img class="avatar-40 rounded" src="images/user/03.jpg" alt="">-->
<!--                                                    </div>-->
<!--                                                    <div class="media-body ml-3">-->
<!--                                                        <h6 class="mb-0 ">Two customer is left</h6>-->
<!--                                                        <small class="float-right font-size-12">2 days ago</small>-->
<!--                                                        <p class="mb-0">Cyst Barry</p>-->
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                            </a>-->
<!--                                            <a href="#" class="iq-sub-card" >-->
<!--                                                <div class="media align-items-center">-->
<!--                                                    <div class="">-->
<!--                                                        <img class="avatar-40 rounded" src="images/user/04.jpg" alt="">-->
<!--                                                    </div>-->
<!--                                                    <div class="media-body ml-3">-->
<!--                                                        <h6 class="mb-0 ">New Mail from Fenny</h6>-->
<!--                                                        <small class="float-right font-size-12">3 days ago</small>-->
<!--                                                        <p class="mb-0">Cyst Barry</p>-->
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                            </a>-->
<!--                                        </div>-->
<!--                                    </div>-->
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul class="navbar-list">
                        <li class="line-height">
                            <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center">
                                <img src="${data.avatar}" class="img-fluid rounded mr-3" alt="user">
                                <div class="caption">
                                    <h6 class="mb-0 line-height">${data.username}</h6>
                                </div>
                            </a>
                            <div class="iq-sub-dropdown iq-user-dropdown">
                                <div class="iq-card shadow-none m-0">
                                    <div class="iq-card-body p-0 ">
                                        <div class="bg-primary p-3">
                                            <h5 class="mb-0 text-white line-height">Hello ${data.username}</h5>
                                            <span class="text-white font-size-12">${data.email}</span>
                                        </div>
                                        <a class="iq-sub-card iq-bg-primary-hover" onclick="router('user/profile')">
                                            <div class="media align-items-center">
                                                <div class="rounded iq-card-icon iq-bg-primary">
                                                    <i class="ri-file-user-line"></i>
                                                </div>
                                                <div class="media-body ml-3">
                                                    <h6 class="mb-0">My Profile</h6>
                                                    <p class="mb-0 font-size-12">View personal profile details.</p>
                                                </div>
                                            </div>
                                        </a>
                                        <a class="iq-sub-card iq-bg-primary-hover" onclick="router('user/change-password')">
                                            <div class="media align-items-center">
                                                <div class="rounded iq-card-icon iq-bg-primary">
                                                    <i class="ri-profile-line"></i>
                                                </div>
                                                <div class="media-body ml-3">
                                                    <h6 class="mb-0 ">Change Password</h6>
                                                    <p class="mb-0 font-size-12">Modify your password.</p>
                                                </div>
                                            </div>
                                        </a>
                                        <div class="d-inline-block w-100 text-center p-3">
                                            <a class="bg-primary iq-sign-btn" href="" role="button" onclick="logout()">Sign out<i class="ri-login-box-line ml-2"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
    `
}

