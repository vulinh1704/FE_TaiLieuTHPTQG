function showAll() {
    let auth = JSON.parse(localStorage.getItem("auth"));
    if(auth && auth.role === "USER") {
        showAllInUser();
        return;
    }
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
                                    <span>${new Date(data[i].timeAt).toLocaleDateString('en-us', {weekday: "long", year: "numeric", month: "short", day: "numeric"})}</span>
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

function showAllInUser() {
    axios.get("http://localhost:3000/news").then(({data}) => {
        if(data.length) {
            let html = `
            <div class="row">
            <div class="col-lg-12 " style="font-size: 16px; text-align: justify">
            <h3 class="mt-2">Introduce</h3>
                <span style="color: #3269ef">Tài Liệu Thi THPT Quốc Gia</span> được thành lập để tạo ra một Thư Viện các Đề Thi Trung Học Phổ Thông (THPT) Quốc Gia. Các đề thi được tổng hợp và chọn lọc từ các đề thi chính thức, tham khảo của Bộ Giáo Dục, các Sở Giáo Dục và các Trường Chuyên trong cả nước. Hy vọng Thi Thử Online sẽ là nguồn tài liệu tham khảo hữu ích cho các bạn học sinh (và giáo viên) để chuẩn bị tốt nhất cho kỳ thi đại học hay thi THPT Quốc gia. Hãy đăng ký thành viên và bắt đầu Thi Thử Online hoàn toàn miễn phí. Bài làm sẽ được chấm điểm ngay sau khi Nộp bài và được lưu lại trong phần Bảng Điểm của từng thành viên để cho các bạn tiện theo dõi.
                <p>
                    Nếu các bạn thấy trang <span style="color: #3269ef">Tài Liệu Thi THPT Quốc Gia</span> hữu ích, các bạn hãy ấn <span style="color: #3269ef">"Ủng Hộ"</span> và <span style="color: #3269ef">"Chia sẻ"</span> để cho nhiều người cùng sử dụng (khi đó các bạn sẽ được thi thử miễn phí không bị giới hạn bởi số đề thi). Và khi có nhiều người cùng sử dụng trang, chúng tôi sẽ cập nhật càng nhiều đề thi, đáp án và nhiều tính năng khác nữa.
                </p>
                <div>
                    <button  class="btn btn-outline-primary" onclick="router('exam/list-exam')">Take Exam Now >></button>
                </div>
            </div>
            </div>
            <div class="row mt-2">
             <div class="col-lg-12">
                <h3>News</h3>
            </div> `;
            for (let i = 0; i < data.length; i++) {
                html += `
            <div class="col-sm-12 col-lg-6 mt-3">
                         <div class="iq-card" onclick="showDetail(${data[i].id})"  data-toggle="modal" data-target="#modal-news-deatail">
                            <div class="iq-card-header d-flex justify-content-between">
                                <div class="iq-header-title mt-2">
                                    <h4 class="card-title">${data[i].title}</h4>
                                    <span>${new Date(data[i].timeAt).toLocaleDateString('en-us', {weekday: "long", year: "numeric", month: "short", day: "numeric"})}</span>
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
            html += `</div>`
            document.getElementById('page-content').innerHTML = html;
        } else {
            document.getElementById('page-content').innerHTML = `<div class="row none d-flex justify-content-center align-items-center"><h2 class="color-none">Hiện tại không có bài viết nào</h2></div>`;
        }
    }).catch((error) => {
        console.log(error);
    });
}