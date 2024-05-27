async function showDetailExam(id) {
    let exam = await getDetailExam(id);
    document.getElementById("page-content").innerHTML = `
    <div class="container-fluid">
               <div class="row">
                  <div class="col-sm-12 col-lg-12">
                     <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title">
                              <h4 class="card-title">Detail Exam</h4>
                           </div>
                        </div>
                        <div class="iq-card-body">
                           <div>
                              <div class="form-group">
                                 <label for="title">Title: ${exam.title}</label>
                              </div>
                              <div class="form-group">
                                 <label for="rate">Duration: ${exam.rate} minute</label>
                              </div>
                              <div class="form-group">
                                 <label for="type">Level: ${exam.type === "easy" ? "Dễ" : (exam.type === "medium" ? "Trung Bình" : "Khó")}</label>
                              </div>
                              <div class="form-group">
                                 <label for="timeAt">Time at: ${new Date(exam.timeAt).toLocaleDateString('en-us', {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    })}</label>
                              </div>
                              <div class="form-group">
                                 <label for="subject">Subject: ${exam.subject.name}</label>
                              </div>
                              <div class="form-group">
                                 <h5 class="card-title">Questions (${exam.questions.length})</h5>
                                 <div id="questions">
                                    
                                 </div>
                              </div>
                              <button type="submit" class="btn btn-primary" onclick="showListExam()">Back List Exam</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
    `
    let html = ''
    for (let i = 0; i < exam.questions.length; i++) {
        html += `
                                     <div class="iq-card">
                                        <div class="iq-card-header d-flex justify-content-between">
                                           <div class="iq-header-title">
                                              <label class="card-title">Question ${i + 1}</label>
                                           </div>
                                        </div>
                                        <div class="iq-card-body">
                                                <div class="row">
                                                <div class="col-12">
                                                     <label for="rate">Content: ${exam.questions[i].content}</label>
                                                 </div>
                                                 <div class="col-12" id="${'image-question-' + i}" style="display: none">
                                                     <label for="aa"></label>
                                                 </div>
                                                 <div class="col-12">
                                                     <label for="rate">Level: ${exam.questions[i].type === "easy" ? "Dễ" : (exam.questions[i].type === "medium" ? "Trung Bình" : "Khó")}</label>
                                                 </div>
                                                 <div class="col">
                                                    <label for="rate">Type: ${exam.questions[i].type.id === 1 ? "Nhiều đáp án" : (exam.questions[i].type.id === 2 ? "Một đáp án" : "Tự luận")}</label>
                                                 
                                                 </div>
                                              </div>
                                        <div id="answers-${i}" class="form-group">
                                             
                                        </div>
                                        <div id="btn-type">
                                             
                                        </div>
                                        </div>
                                     </div>
        `
    }
    document.getElementById("questions").innerHTML = html;
    for (let i = 0; i < exam.questions.length; i++) {
        if (exam.questions[i].image) {
            document.getElementById('image-question-' + i).style.display = "block";
            document.getElementById('image-question-' + i).innerHTML = `<img src="${exam.questions[i].image}" style="width: 200px; height: 200px;" alt=""/>`;
        }
    }
    for (let i = 0; i < exam.questions.length; i++) {
        let htmlInner = ``
        for (let j = 0; j < exam.questions[i].answers.length; j++) {
            if (exam.questions[i].type.id === 2) {
                if (exam.questions[i].answers[j].isTrue) {
                    htmlInner += `
                    <div class="custom-control custom-radio ml-2 mt-2" style="width: 90%">
                      <input type="radio" class="custom-control-input" id="is-true-${i}.${j}" checked="" readonly>
                      <label class="custom-control-label" for="is-true-${i}.${j}" style="width: 100%">${exam.questions[i].answers[j].content}</label>
                    </div>
            `
                } else {
                    htmlInner += `
                    <div class="custom-control custom-radio ml-2 mt-2" style="width: 90%">
                      <input type="radio"  class="custom-control-input" id="is-true-${i}.${j}" disabled="">
                      <label class="custom-control-label" for="is-true-${i}.${j}" style="width: 100%">${exam.questions[i].answers[j].content}</label>
                    </div>
            `
                }
            }
            if (exam.questions[i].type.id === 1) {
                if (exam.questions[i].answers[j].isTrue) {
                    htmlInner += `
                    <div class="custom-control custom-checkbox custom-control-inline ml-2 mt-2" style="width: 90%">
                      <input type="checkbox" class="custom-control-input" id="is-true-${i}.${j}" checked="" readonly>
                      <label class="custom-control-label" for="is-true-${i}.${j}" style="width: 100%">${exam.questions[i].answers[j].content}</label>
                    </div>
            `
                } else {
                    htmlInner += `
                    <div class="custom-control custom-checkbox custom-control-inline ml-2 mt-2" style="width: 90%">
                      <input type="checkbox" class="custom-control-input" id="is-true-${i}.${j}" disabled="">
                      <label class="custom-control-label" for="is-true-${i}.${j}" style="width: 100%">${exam.questions[i].answers[j].content}</label>
                    </div>
            `
                }
            }

        }
        document.getElementById(`answers-${i}`).innerHTML = htmlInner;
    }
}

async function getDetailExam(id) {
    let {data} = await axios.get('http://localhost:3000/exams/' + id);
    return data;
}