async function showListResultExam() {
    document.getElementById("page-content").innerHTML = `
    <div class="container-fluid">
         <div class="row">
            <div class="col-sm-12">
                  <div class="iq-card">
                     <div class="iq-card-header d-flex justify-content-between">
                        <div class="iq-header-title">
                           <h4 class="card-title" id="list-exam-title">Completed Exam List</h4>
                        </div>
                     </div>
                     <div class="iq-card-body">
                        <div class="table-responsive">
                           <div id="data-exam">
                               
                           </div>
                          
                        </div>
                     </div>
                  </div>
            </div>
         </div>
      </div>
    `
    await showDataResultExam();
}

async function showDataResultExam() {
    let dataToken = JSON.parse(localStorage.getItem("auth"));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${dataToken.token}`
    };
    let {data} = await axios.get(`http://localhost:3000/resultExams`, {headers});
    let html = ``
    for (let i = 0; i < data.length; i++) {
        html += `<div class="col-sm-12 col-lg-12" style="padding: 0 0; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);">
                     <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title d-flex" style="width: 100%; justify-content: space-between">
                              <h5 class="card-title">${data[i].exam.title} - Score: ${data[i].score}</h5>
                              <button class="btn"  onclick="showDetailResult(${data[i].id})" style="color: #1e3d73" >Detail</button>
                           </div>
                        </div>
                        <div class="iq-card-body" style="padding: 0 2px 20px">
                           <div class="d-flex justify-content-start mt-3">
                             <div style="padding: 0 2%"><i class="fa-solid fa-circle-question" style="margin-right: 6px"></i>${data[i].exam.questions.length} questions</div>
                             <div style="padding: 0 2%"><i class="fa-solid fa-stopwatch" style="margin-right: 6px"></i></i>${data[i].exam.rate} minute</div>
                             <div style="padding: 0 2%; min-width: 10%"><i class="fa-solid fa-star" style="margin-right: 6px"></i>${data[i].exam.type}</div>
                             <div style="padding: 0 2%"><i class="fa-solid fa-book" style="margin-right: 6px"></i>${data[i].exam.subject.name}</div>
                             <div style="padding: 0 2%"><i class="fa-solid fa-circle-check" style="margin-right: 6px"></i>${new Date(data[i].timeAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</div>
                           </div>
                        </div>
                     </div>
                  </div>`
    }
    document.getElementById("data-exam").innerHTML = html;
}