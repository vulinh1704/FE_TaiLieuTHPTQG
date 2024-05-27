function showDetail(id) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    if(auth && auth.role === "USER") {
        showDetailInUser(id)
        return;
    }
    axios.get("http://localhost:3000/news/" + id).then(({data}) => {
        document.getElementById("modal-content").innerHTML = `
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${data.title}</h5>
        <button type="button" class="close" id="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row" style="padding: 0 10px">
            <p>${data.contentDemo}</p>
        </div>
        <div class="row">
            <img src="${data.image}" alt="" style="width: 100%; height: 100%; object-fit: cover">
        </div>
        <div class="row mt-2">
            <div class="iq-header-title d-flex" style="flex-direction: column; padding: 0 10px">
                <span>Author: ${data.author}</span>
                <span>Time: ${data.timeAt}</span>
            </div>
        </div>
        <div class="row mt-2">
            <div class="iq-header-title d-flex" style="flex-direction: column; padding: 0 10px; box-sizing: border-box; width: 100%; overflow: hidden">
                <span>Post: </span>
                <div id="content-detail-news" style="width: 100%"></div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="remove(${id})">Delete</button>
        <button type="button" class="btn btn-primary" onclick="showFormEdit(${id})">Edit</button>
      </div>
    `
        document.getElementById("content-detail-news").innerHTML = data.content;
    })
}

function remove(id) {
    let isConfirm = confirm("Bạn có chắc chắn xóa bài viết này ?")
    if(isConfirm) {
        axios.delete("http://localhost:3000/news/" + id).then(() => {
            document.getElementById("close").click()
            showAll();
        })
    }
}

function showDetailInUser(id) {
    axios.get("http://localhost:3000/news/" + id).then(({data}) => {
        document.getElementById("page-content").innerHTML = `
      <div style="padding: 0 15%">
          <div class="modal-header row">
            <div class="col-12" style="padding: 0">
                <h3 class="modal-title" id="exampleModalLabel">${data.title}</h3>
            </div>
            <div class="col-6" style="padding: 0">
                <p>${data.author}</p>
            </div>
            <div class="col-6 d-flex justify-content-end">
                <p>${new Date(data.timeAt).toLocaleDateString('en-us', {weekday: "long", year: "numeric", month: "short", day: "numeric"})}</p>
            </div>
          </div>
          <div class="modal-body">
            <div class="row" style="padding: 0 10px">
                <p>${data.contentDemo}</p>
            </div>
            <div class="row" style="display: flex; justify-content: start">
                <img src="${data.image}" alt="" style="width: 35%; height: 35%; object-fit: cover">
            </div>
            <div class="row mt-2">
                <div class="iq-header-title d-flex" style="flex-direction: column; padding: 0 10px; box-sizing: border-box; width: 100%; overflow: hidden">
                    <div id="content-detail-news" style="width: 100%"></div>
                </div>
            </div>
          </div>
          <div>
            <button type="button" class="btn btn-outline-primary mb-3" onclick="showAll()">Back to home</button>
          </div>
      </div>
    `
        document.getElementById("content-detail-news").innerHTML = data.content;
    })
}