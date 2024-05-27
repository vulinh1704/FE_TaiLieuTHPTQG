async function showListSubjects() {
    document.getElementById("page-content").innerHTML = `
    <div class="container-fluid">
         <div class="row">
            <div class="col-sm-12">
                  <div class="iq-card">
                     <div class="iq-card-header d-flex justify-content-between">
                        <div class="iq-header-title">
                           <h4 class="card-title" id="list-exam-title">List Subject</h4>
                        </div>
                        <div id="btn-custom">
                            <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">+</button>
                        </div>
                     </div>
                     <div class="iq-card-body">
                        <div class="">
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
                    <h5 class="modal-title" id="exampleModalLabel">Add Subject</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="iq-card-body">
                           <div>
                              <div class="form-group">
                                 <input type="text" class="form-control" id="nameSubject" placeholder="Name">
                              </div>
                           </div>
                        </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" style="display: none" class="btn btn-secondary" data-dismiss="modal" id="close">Close</button>
                    <button type="button" class="btn btn-primary" onclick="addSubject()">Add</button>
                  </div>
                </div>
              </div>
            </div>

`
    await showDataSubject()
}

function addSubject() {
    let name = document.getElementById("nameSubject").value;
    let subject = {
        name: name
    }
    axios.post(`http://localhost:3000/subjects`, subject).then(async () => {
        await showDataSubject();
        document.getElementById("close").click();
    });

}

async function showDataSubject() {
    let listSubject =  await axios.get(`http://localhost:3000/subjects`);
    listSubject = listSubject.data;
    document.getElementById("data-exam").innerHTML = `
    <table id="user-list-table" class="table table-striped table-bordered mt-4" role="grid" aria-describedby="user-list-page-info">
                                 <thead>
                                     <tr>
                                        <th>Index</th>
<!--                                        <th>ID</th>-->
                                        <th>Name</th>
                                     </tr>
                                 </thead>
                                 <tbody id="list-exam-table">
                                    
                                 </tbody>
                               </table>
                               
    `;
    let html = '';
    for (let i = 0; i < listSubject.length; i++) {
        html += `
                                 <tr>
                                    <td class="text-center">${i + 1}</td>
<!--                                    <td>${listSubject[i].id}</td>-->
                                    <td>${listSubject[i].name}</td>
                                 </tr>
        `
    }
    document.getElementById('list-exam-table').innerHTML = html;
}