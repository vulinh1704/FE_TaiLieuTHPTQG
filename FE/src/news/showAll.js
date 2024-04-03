function showAll() {
    axios.get("http://localhost:3000/news").then(({data}) => {
        if(data.length) {
            let html = `<div class="row">`;
            for (let i = 0; i < data.length; i++) {
                html += `
            <div class="col-sm-12 col-lg-6">
                         <div class="iq-card" onclick="showDetail(${data[i].id})"  data-toggle="modal" data-target="#modal-news-deatail">
                            <div class="iq-card-header d-flex justify-content-between">
                                <div class="iq-header-title mt-2">
                                    <h4 class="card-title">${data[i].title}</h4>
                                    <span>${data[i].timeAt}</span>
                                </div>
                            </div>
                            <div class="iq-card-body">
                            <div class="row">
                                <div class="col-3">
                                    <img class="avatar-news" src="${data[i].image}" alt="">
                                </div>
                                <div class="col-9">
                                     <p>${data[i].contentDemo}</p>
                                </div>
                             </div>
                            </div>
                        </div>
                    </div>
            `
            }
            html += `</div> 
                         <div class="modal fade" id="modal-news-deatail" tabindex="-1" aria-labelledby="modal-news-deatail" aria-hidden="true">
                          <div class="modal-dialog modal-lg">
                            <div class="modal-content" id="modal-content">
                            </div>
                            </div>
                          </div>
                         <div id="delete-news"></div>`
            document.getElementById('page-content').innerHTML = html;
        } else {
            document.getElementById('page-content').innerHTML = `<div class="row none d-flex justify-content-center align-items-center"><h2 class="color-none">Hiện tại không có bài viết nào</h2></div>`;
        }
    }).catch((error) => {
        console.log(error);
    });
}