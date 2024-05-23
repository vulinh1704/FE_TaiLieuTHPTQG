async function showProfile() {
    let dataToken = JSON.parse(localStorage.getItem("auth"));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${dataToken.token}`
    };
    let {data} = await axios.get("http://localhost:3000/users", { headers });
    document.getElementById("page-content").innerHTML = `
    <div class="container-fluid">
               <div class="row">
                  <div class="col-lg-12">
                     <div class="iq-card">
                        <div class="iq-card-body p-0">
                           <div class="iq-edit-list">
                              <ul class="iq-edit-profile d-flex nav nav-pills">
                                 <li class="col-md-6 p-0" >
                                    <a  class="nav-link active" id="nav-info" data-toggle="pill" href="#personal-information">
                                    Personal Information
                                    </a>
                                 </li>
                                 <li class="col-md-6 p-0" >
                                    <a class="nav-link" id="nav-change-pwd" data-toggle="pill" href="#chang-pwd">
                                    Change Password
                                    </a>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-12">
                     <div class="iq-edit-list-data">
                        <div class="tab-content">
                           <div class="tab-pane fade active show" id="personal-information" role="tabpanel">
                              <div class="iq-card">
                                 <div class="iq-card-header d-flex justify-content-between">
                                    <div class="iq-header-title">
                                       <h4 class="card-title">Personal Information</h4>
                                    </div>
                                 </div>
                                 <div class="iq-card-body">
                                    <div>
                                       <div class="form-group row align-items-center">
                                          <div class="col-md-12">
                                             <div class="profile-img-edit">
                                                <img class="profile-pic" id="avatar-profile" src="${data.avatar}" alt="profile-pic" style="width: 100%; height: 100%;object-fit: cover">
                                                <div class="p-image" id="upload-avatar" style="display:none;">
                                                   <label for="avatar"><i class="ri-pencil-line upload-button" style="position: absolute; z-index: 1; top: 1px; color: whitesmoke; right: 5px"></i></label>
                                                   <input class="file-upload" type="file" id="avatar" onchange="uploadAvatar(event)"/>
                                                </div>  
                                             </div>
                                          </div>
                                       </div>
                                       <div class=" row align-items-center">
                                          <div class="form-group col-sm-6">
                                             <label for="fname">User Name:</label>
                                             <input type="text" class="form-control" id="username" value="${data.username}" readonly>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label for="lname">Role:</label>
                                             <input type="text" class="form-control" id="role" value="${data.role}" readonly>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label for="uname">Email:</label>
                                             <input type="text" class="form-control" id="email" value="${data.email}" readonly>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label class="d-block">Gender:</label>
                                             <div class="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="male" name="gender" value="male" class="custom-control-input" readonly>
                                                <label class="custom-control-label" for="" id="label-male"> Male </label>
                                             </div>
                                             <div class="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="female" name="gender" value="female" class="custom-control-input" readonly>
                                                <label class="custom-control-label" for="" id="label-female"> Female </label>
                                             </div>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label for="dob">Date Of Birth:</label>
                                             <input type="date" class="form-control" id="dateOfBirth" readonly>
                                          </div>
                                       </div>
                                       <div id="btn-profile">
                                         <button type="submit" class="btn btn-primary mr-2" onclick="showFormEditProfile()">Edit</button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="tab-pane fade" id="chang-pwd" role="tabpanel">
                              <div class="iq-card">
                                 <div class="iq-card-header d-flex justify-content-between">
                                    <div class="iq-header-title">
                                       <h4 class="card-title">Change Password</h4>
                                       <span id="change-success" style="color: green; font-size: 12px"></span>
                                    </div>
                                 </div>
                                 <div class="iq-card-body">
                                    <div>
                                       <div class="form-group">
                                          <label for="cpass">Current Password:</label>
<!--                                          <a href="javascripe:void();" class="float-right">Forgot Password</a>-->
                                          <input type="Password" class="form-control" id="cpass" value="" oninput="clearValidate()">
                                          <span id="err-cpass" style="color: #e70404; font-size: 12px"></span>
                                       </div>
                                       <div class="form-group">
                                          <label for="npass">New Password:</label>
                                          <input type="Password" class="form-control" id="npass" value="" oninput="clearValidate()">
                                       </div>
                                       <div class="form-group">
                                          <label for="vpass">Verify Password:</label>
                                          <input type="Password" class="form-control" id="vpass" value="" oninput="clearValidate()">
                                          <span id="err-vpass" style="color: #e70404; font-size: 12px"></span>
                                       </div>
                                       <button type="submit" class="btn btn-primary mr-2" onclick="changePassword()">Save</button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
    `
    if(data.gender) {
        document.getElementById(data.gender).checked = true;
    }
    if(data.dateOfBirth) {
        document.getElementById("dateOfBirth").value = data.dateOfBirth;
    }
}

