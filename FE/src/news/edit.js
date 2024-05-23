function showFormEdit(id) {
    axios.get("http://localhost:3000/news/" + id).then(({data}) => {
        localStorage.setItem("contentNew", data.content);
        document.getElementById("modal-content").innerHTML = `
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Form</h5>
        <button type="button" class="close" id="close" data-dismiss="modal" aria-label="Close">
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
                                           <img class="avatar-news" id="avatar-news" src="${data.image}" alt="">
                                        </a>
                                    </li>
                                    <li id="">
                                       <a>
                                            <div class="form-group mt-1">
                                                 <input type="file" class="form-control-file" id="new-file" onchange="uploadImage(event)" style="width: 89%">
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
                                                   <input type="text" class="form-control" id="title" name="fname" value="${data.title}" placeholder="Title Post" required="required" />
                                                </div>
                                             </div>
                                             <div class="col-md-12">
                                                <div class="form-group">
                                                   <label for="lname">Overview Content: *</label>
                                                   <input type="text" class="form-control" id="contentDemo" value="${data.contentDemo}" name="lname" placeholder="Overview Content" />
                                                </div>
                                             </div>
                                             <div class="col-md-12">
                                                <div class="form-group">
                                                   <label for="dob">Time: </label>
                                                   <input type="text" class="form-control" id="timeAt" value="${data.timeAt}" name="dob" readonly/>
                                                </div>
                                             </div>
                                             <div class="col-md-12">
                                                <div class="form-group">
                                                   <label for="dob">Author: *</label>
                                                   <input type="text" class="form-control" id="author" value="${data.author}" name="dob" placeholder="Author"/>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <button name="next" class="btn btn-primary next float-right" onclick="handleNext()">Next</button>
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
                                       <button type="button" class="btn btn-primary action-button float-right"  onclick="edit(${id})">Summit</button>
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
    `;
    })
}

function edit(id) {
    let title = document.getElementById("title").value;
    let contentDemo = document.getElementById("contentDemo").value;
    let content = editor.html.get();
    let image = document.getElementById("avatar-news").src;
    let timeAt = new Date();
    let author = document.getElementById("author").value;
    let post = {
        id: id,
        title: title,
        contentDemo: contentDemo,
        content: content,
        image: image,
        timeAt: timeAt,
        author: author
    }
    axios.post("http://localhost:3000/news", post).then(() => {
        document.getElementById("close").click()
        showAll();
    })
}