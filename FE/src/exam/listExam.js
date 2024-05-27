async function showListExam() {
    document.getElementById("page-content").innerHTML = `
    <div class="container-fluid">
         <div class="row">
            <div class="col-sm-12">
                  <div class="iq-card">
                     <div class="iq-card-header d-flex justify-content-between">
                        <div class="iq-header-title">
                           <h4 class="card-title" id="list-exam-title">List Exam</h4>
                        </div>
                        <div id="btn-custom">
                            
                        </div>
                     </div>
                     <div class="iq-card-body">
                        <div class="">
                           <div class="row justify-content-between">
                              <div class="col-sm-12 col-md-2">
                                 <div id="user_list_datatable_info" class="dataTables_filter">
                                    <div class="mr-3 position-relative">
                                       <div class="form-group mb-0">
                                          <input type="search" class="form-control" id="title" placeholder="Search" aria-controls="user-list-table" oninput="showDataTable()">
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-12 col-md-2">
                                  <div class="form-group" style="width: 95%">
                                     <select class="form-control" id="level" onchange="showDataTable()">
                                        <option selected="" value="">All Level</option>
                                        <option value="easy">Dễ</option>
                                        <option value="medium">Trung Bình</option>
                                        <option value="difficult">Khó</option>
                                     </select>
                                </div>
                              </div>
                              <div class="col-sm-12 col-md-2" style="padding: 0 0">
                                  <div class="form-group" style="width: 100%">
                                     <select class="form-control" id="subject" onchange="showDataTable()"></select>
                                </div>
                              </div>
                              <div class="col-sm-12 col-md-6"></div>
                           </div>
                           <div id="data-exam">
                               
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
          
          <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create Random Quizzes</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="iq-card-body">
                           <div>
                              <div class="form-group">
                                 <label for="exampleInputText1">Title</label>
                                 <input type="text" class="form-control" id="titleCustom" placeholder="title">
                              </div>
                              <div class="form-group">
                                 <label for="exampleInputEmail3">Duration</label>
                                 <input type="number" class="form-control" id="rate"  placeholder="minutes">
                              </div>
                              <div class="form-group">
                                 <label for="exampleInputEmail3">Quantity questions</label>
                                 <input type="number" class="form-control" id="quantityQuestion"  placeholder="quantity questions">
                              </div>
                              <div class="form-group">
                                 <label for="exampleInputurl">Select Subject</label>
                                 <select id="idSubject" class="form-control"></select>
                              </div>
                              <div class="form-group">
                                 <label for="exampleInputphone">Type</label>
                                 <select class="form-control" id="idType">
                                        <option selected="" value="">Select Level</option>
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="difficult">Difficult</option>
                                     </select>
                              </div>
                           </div>
                        </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" style="display: none" class="btn btn-secondary" data-dismiss="modal" id="close">Close</button>
                    <button type="button" class="btn btn-primary" onclick="addExamCustom()">Add</button>
                  </div>
                </div>
              </div>
            </div>
    `
    let listSubject = await getDataSubject();
    let htmlSubject = `<option selected="" value="">All subject</option>`
    for (let i = 0; i < listSubject.length; i++) {
        htmlSubject += `<option value="${listSubject[i].id}">${listSubject[i].name}</option>`
    }
    document.getElementById("subject").innerHTML = htmlSubject;
    document.getElementById("idSubject").innerHTML = htmlSubject;
    await showDataTable();
}

function addExamCustom() {
    let title = document.getElementById("titleCustom").value;
    let rate = document.getElementById("rate").value;
    let subject = document.getElementById("idSubject").value;
    let type = document.getElementById("idType").value;
    let quantityQuestion = document.getElementById("quantityQuestion").value;
    let timeAt = new Date();
    let exam = {
        title: title,
        rate: rate,
        subject: subject,
        type: type,
        quantityQuestion: quantityQuestion,
        timeAt: timeAt
    }
    let dataToken = JSON.parse(localStorage.getItem("auth"));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${dataToken.token}`
    };
    axios.post(`http://localhost:3000/exams/users/save`, exam, {headers}).then(async () => {
        await showListExamCustomUser();
        document.getElementById("close").click();
    });

}


async function showListExamCustomUser() {
    document.getElementById("list-exam-title").innerHTML = `Your Exam List`
    let listExam = await getListExamCustom();
    let html = ``;
    for (let i = 0; i < listExam.length; i++) {
        html += `<div class="col-sm-12 col-lg-12" style="padding: 0 0; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);">
                     <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title d-flex" style="width: 100%; justify-content: space-between">
                              <h5 class="card-title">${listExam[i].title}</h5>
                              <div>
                                    <button class="btn" onclick="removeExam(${listExam[i].id})" style="color: darkred">Remove</button>
                                    <button class="btn" onclick="showCompleteExam(${listExam[i].id})" style="color: #1e3d73">Complete</button>
                              </div>
                           </div>
                        </div>
                        <div class="iq-card-body" style="padding: 0 2px 20px">
                           <div class="d-flex justify-content-start mt-3">
                             <div style="padding: 0 2%"><i class="fa-solid fa-circle-question" style="margin-right: 6px"></i>${listExam[i].questions.length} questions</div>
                             <div style="padding: 0 2%"><i class="fa-solid fa-stopwatch" style="margin-right: 6px"></i></i>${listExam[i].rate} minute</div>
                             <div style="padding: 0 2%; min-width: 10%"><i class="fa-solid fa-star" style="margin-right: 6px"></i>${listExam[i].type === "easy" ? "Dễ" : (listExam[i].type === "medium" ? "Trung Bình" : "Khó")}</div>
                             <div style="padding: 0 2%"><i class="fa-solid fa-book" style="margin-right: 6px"></i>${listExam[i].subject.name}</div>
                           </div>
                        </div>
                     </div>
                  </div>`
    }
    document.getElementById("data-exam").innerHTML = html;
}

async function showListExamUser() {
    document.getElementById("list-exam-title").innerHTML = `Selected Exam Papers`
    let listExam = await getListExam();
    let html = ``
    for (let i = 0; i < listExam.length; i++) {
        html += `<div class="col-sm-12 col-lg-12" style="padding: 0 0; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);">
                     <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title d-flex" style="width: 100%; justify-content: space-between">
                              <h5 class="card-title">${listExam[i].title}</h5>
                              <button class="btn"  onclick="showCompleteExam(${listExam[i].id})" style="color: #1e3d73">Complete</button>
                           </div>
                        </div>
                        <div class="iq-card-body" style="padding: 0 2px 20px">
                           <div class="d-flex justify-content-start mt-3">
                             <div style="padding: 0 2%"><i class="fa-solid fa-circle-question" style="margin-right: 6px"></i>${listExam[i].questions.length} questions</div>
                             <div style="padding: 0 2%"><i class="fa-solid fa-stopwatch" style="margin-right: 6px"></i></i>${listExam[i].rate} minute</div>
                             <div style="padding: 0 2%; min-width: 10%"><i class="fa-solid fa-star" style="margin-right: 6px"></i>${listExam[i].type === "easy" ? "Dễ" : (listExam[i].type === "medium" ? "Trung Bình" : "Khó")}</div>
                             <div style="padding: 0 2%"><i class="fa-solid fa-book" style="margin-right: 6px"></i>${listExam[i].subject.name}</div>
                           </div>
                        </div>
                     </div>
                  </div>`
    }
    document.getElementById("data-exam").innerHTML = html;
}

async function showDataTable() {
    let listExam = await getListExam();
    let auth = JSON.parse(localStorage.getItem("auth"));
    if (auth && auth.role === "USER") {
        if (localStorage.getItem("currentPage").includes("add-Exam-Custom")) {
            document.getElementById("btn-custom").innerHTML = `<button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">+</button>`
            await showListExamCustomUser();
            return;
        }
        await showListExamUser();
        return;
    }
    document.getElementById("data-exam").innerHTML = `
    <table id="user-list-table" class="table table-striped table-bordered mt-4" role="grid" aria-describedby="user-list-page-info">
                                 <thead>
                                     <tr>
                                        <th>Index</th>
                                        <th>Title</th>
                                        <th>Level</th>
                                        <th>Duration (Minute)</th>
                                        <th>Time At</th>
                                        <th>Subject</th>
                                        <th>Action</th>
                                     </tr>
                                 </thead>
                                 <tbody id="list-exam-table">
                                    
                                 </tbody>
                               </table>
    `;
    let html = '';
    for (let i = 0; i < listExam.length; i++) {
        html += `
                                 <tr>
                                    <td class="text-center">${i + 1}</td>
                                    <td>${listExam[i].title}</td>
                                    <td>${listExam[i].rate}</td>
                                    <td>${listExam[i].type === "easy" ? "Dễ" : (listExam[i].type === "medium" ? "Trung Bình" : "Khó")}</td>
                                    <td>${new Date(listExam[i].timeAt).toLocaleDateString('en-us', {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
        })}</td>
                                    <td>${listExam[i].subject.name}</td>
                                    <td>
                                       <div class="flex align-items-center list-user-action">
                                          <a class="iq-bg-primary"  title=""  onclick="showDetailExam(${listExam[i].id})"><i class="fa-solid fa-circle-info"></i></a>
                                          <a class="iq-bg-primary"  title=""  onclick="showFormEditExam(${listExam[i].id})"><i class="ri-pencil-line"></i></a>
                                          <a class="iq-bg-primary"  title=""  onclick="removeExam(${listExam[i].id})"><i class="ri-delete-bin-line"></i></a>
                                       </div>
                                    </td>
                                 </tr>
        `
    }
    document.getElementById('list-exam-table').innerHTML = html;
}

async function getListExamCustom() {
    let title = document.getElementById("title").value;
    let level = document.getElementById("level").value;
    let subject = document.getElementById("subject").value;
    let dataToken = JSON.parse(localStorage.getItem("auth"));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${dataToken.token}`
    };
    let {data} = await axios.get(`http://localhost:3000/exams/users/get?title=${title}&type=${level}&subject=${subject}`, {headers});
    return data;
}

async function getListExam() {
    let title = document.getElementById("title").value;
    let level = document.getElementById("level").value;
    let subject = document.getElementById("subject").value;
    let {data} = await axios.get(`http://localhost:3000/exams?title=${title}&type=${level}&subject=${subject}`);
    return data;
}

function removeExam(id) {
    axios.delete('http://localhost:3000/exams/' + id).then(() => {
        showListExam()
    })
}