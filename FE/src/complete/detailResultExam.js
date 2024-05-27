async function showDetailResult(id) {
    let result = await getDataDetailResult(id);
    let exam = await getDetailExam(result.exam.id);
    document.getElementById("page-content").innerHTML = `
    <div class="container-fluid">
               <div class="row">
                  <div class="col-sm-12 col-lg-12">
                     <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title">
                              <h4 class="card-title">Detail Result</h4>
                           </div>
                        </div>
                        <div class="iq-card-body">
                           <div>
                              <div class="form-group">
                                 <label for="title"><span style="font-weight: 700">Title:</span> ${exam.title}</label>
                              </div>
                              <div class="form-group">
                                 <label for="rate"><span style="font-weight: 700">Duration:</span> ${exam.rate} minute</label>
                              </div>
                              <div class="form-group">
                                 <label for="type"><span style="font-weight: 700">Level:</span> ${exam.type === "easy" ? "Dễ" : (exam.type === "medium" ? "Trung Bình" : "Khó")}</label>
                              </div>
                              <div class="form-group">
                                 <label for="timeAt"><span style="font-weight: 700">Time at:</span> ${new Date(exam.timeAt).toLocaleDateString('en-us', {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric"
                                })}</label>
                              </div>
                              <div class="form-group">
                                 <label for="subject"><span style="font-weight: 700">Subject:</span> ${exam.subject.name}</label>
                              </div>
                              <div class="form-group">
                                 <label for="type"><span style="font-weight: 700">Score:</span> ${result.score}</label>
                              </div>
                              <div class="form-group">
                                 <h5 class="card-title">Questions (${exam.questions.length})</h5>
                                 <div id="questions">
                                    
                                 </div>
                              </div>
                              <button type="button" class="btn btn-outline-primary mb-3" onclick="showListResultExam()">Back</button>
                              <button type="button" class="btn btn-outline-danger mb-3 ml-1" onclick="removeExamResult(${id})">Remove</button>
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
                                              <label class="card-title" style="font-weight: 700">Question ${i + 1}</label>
                                           </div>
                                        </div>
                                        <div class="iq-card-body">
                                            <div class="row" style="padding: 0 0">
                                                <div class="col-12">
                                                     <label for="rate">Content: ${exam.questions[i].content}</label>
                                                 </div>
                                                 <div class="col-12">
                                                     <label for="rate">Level: ${exam.questions[i].level === "easy" ? "Dễ" : (exam.questions[i].level === "medium" ? "Trung Bình" : "Khó")}</label>
                                                 </div>
                                                 <div class="col-12">
                                                    <label for="rate">Type: ${exam.questions[i].type.id === 1 ? "Nhiều đáp án" : (exam.questions[i].type.id === 2 ? "Một đáp án" : "Tự luận")}</label>
                                                 </div>
                                                 <div class="col-12" id="div-question-${i}"></div>
                                             </div>
                                            <div id="answers-${i}" class="form-group">
                                                 
                                            </div>
                                            <div class="row">
                                                    <div class="col-12">
                                                         <label for="rate">Your Result</label>
                                                     </div>
                                              </div>
                                            <div id="result-${i}">
                                                 
                                            </div>
                                        </div>
                                     </div>
        `
    }
    document.getElementById("questions").innerHTML = html;
    for (let i = 0; i < exam.questions.length; i++) {
        let htmlInner = "";
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

        let htmlResult = ``
        for (let j = 0; j < result.resultAnswers.length; j++) {
            if(result.resultAnswers[j].question.id === exam.questions[i].id) {
                if(exam.questions[i].type.id === 2 || exam.questions[i].type.id === 1) {
                    if (result.resultAnswers[j].isTrue) {
                        htmlResult += `
                            <div class="mt-1 ml-2" style="width: 90%">
                                   <label style="width: 100%"><i class="fa-solid fa-circle-check mr-1" style="color: darkgreen"></i> ${result.resultAnswers[j].answer.content}</label>
                            </div>
                        `
                    } else {
                        htmlResult += `
                            <div class="mt-1 ml-2" style="width: 90%">
                              <label style="width: 100%"><i class="fa-solid fa-circle-xmark mr-1" style="color: darkred"></i> ${result.resultAnswers[j].answer.content}</label>
                            </div>
                        `
                    }
                }
            }
        }
        document.getElementById(`answers-${i}`).innerHTML = htmlInner;
        document.getElementById(`result-${i}`).innerHTML = htmlResult;
        if(exam.questions[i].image) {
            document.getElementById(`div-question-${i}`).innerHTML = `<img style="width: 200px; height: 200px"  src="${exam.questions[i].image}"/>`
        }
    }
}

async function removeExamResult(id) {
    let isConfirm = confirm("Bạn có chắc chắn muốn xóa kết quả này?")
    if(isConfirm) {
        let dataToken = JSON.parse(localStorage.getItem("auth"));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${dataToken.token}`
        };
        await axios.delete('http://localhost:3000/resultExams/' + id, {headers});
        await showListResultExam();
    }
}

async function getDataDetailResult(id) {
    let dataToken = JSON.parse(localStorage.getItem("auth"));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${dataToken.token}`
    };
    let {data} = await axios.get('http://localhost:3000/resultExams/' + id, {headers})
    return data;
}