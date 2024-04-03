function showFormEdit() {
    document.getElementById("modal-content").innerHTML = `
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Form</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div class="row">
                  <div class="col-sm-12 col-lg-12">
                     <div class="iq-card">
                        <div class="iq-card-body">
                           <div class="row">
                              <div class="col-md-3">
                                 <ul id="top-tabbar-vertical" class="p-0">
                                    <li class="active" id="personal">
                                        <a href="">
                                           <img class="avatar-news" id="avatar-news" src="https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg" alt="">
                                        </a>
                                    </li>
                                    <li id="">
                                       <a>
                                            <div class="form-group mt-1">
                                                 <input type="file" class="form-control-file" id="new-file" onchange="uploadImage(event)">
                                            </div>
                                       </a>
                                    </li>
                                 </ul>
                              </div>
                              <div class="col-md-9">
                                 <div id="form-wizard3" class="text-center">
                                    <!-- fieldsets -->
                                    <fieldset id="left">
                                       <div class="form-card text-left">
                                          <div class="row">
                                             <div class="col-12">
                                                <h3 class="mb-4">Post Information:</h3>
                                             </div>
                                          </div>
                                          <div class="row">
                                             <div class="col-md-12">
                                                <div class="form-group">
                                                   <label for="fname">Title: *</label>
                                                   <input type="text" class="form-control" id="title" name="fname" placeholder="Title Post" required="required" />
                                                </div>
                                             </div>
                                             <div class="col-md-12">
                                                <div class="form-group">
                                                   <label for="lname">Overview Content: *</label>
                                                   <input type="text" class="form-control" id="contentDemo" name="lname" placeholder="Overview Content" />
                                                </div>
                                             </div>
                                             <div class="col-md-12">
                                                <div class="form-group">
                                                   <label for="dob">Time: </label>
                                                   <input type="time" class="form-control" id="timeAt" name="dob" readonly/>
                                                </div>
                                             </div>
                                             <div class="col-md-12">
                                                <div class="form-group">
                                                   <label for="dob">Author: *</label>
                                                   <input type="text" class="form-control" id="author" name="dob" placeholder="Author"/>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <button name="next" class="btn btn-primary next float-right" value="Next" onclick="handleNext()">Next</button>
                                    </fieldset>
                                    <fieldset id="right">
                                       <div class="form-card text-left">
                                          <div class="row">
                                             <div class="col-12">
                                                <h3 class="mb-4">Post Information:</h3>
                                             </div>
                                          </div>
                                          <div class="row">
                                             <div class="col-md-12">
                                                <div class="form-group">
                                                   <label for="summernote">Details: *</label>
                                                   <textarea id="details" class="form-control" style="height: 300px;"></textarea>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <button type="button" class="btn btn-primary action-button float-right" onclick="add()">Summit</button>
                                       <button type="button" class="btn btn-dark previous action-button-previous float-right mr-3" onclick="handlePrev()">Previous</button>
                                    
                                    </fieldset>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
           </div>
      <div>
      </div>
    `
}