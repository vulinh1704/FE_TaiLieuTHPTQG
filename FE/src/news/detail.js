function showDetail(id) {
    axios.get("http://localhost:3000/news/" + id).then(({data}) => {
        document.getElementById("modal-content").innerHTML = `
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${data.title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
        <button type="button" class="btn btn-primary">Delete</button>
        <button type="button" class="btn btn-primary" onclick="showFormEdit()">Edit</button>
      </div>
    `
        document.getElementById("content-detail-news").innerHTML = data.content;
    })
}