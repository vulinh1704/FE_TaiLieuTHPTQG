function createResultExam(idCurrentExam) {
    let dataToken = JSON.parse(localStorage.getItem("auth"));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${dataToken.token}`
    };
    let resultExam = {
        timeAt: new Date(),
        exam: {
            id: idCurrentExam
        },
        score: 0
    };
    return axios.post("http://localhost:3000/resultExams", resultExam, {headers});
}

async function showCompleteExam(idCurrentExam = localStorage.getItem("idCurrentExam"), idResultExam = localStorage.getItem("idResultExam")) {
    if (!idResultExam) {
        let resultExam = await createResultExam(idCurrentExam);
        resultExam = resultExam.data;
        localStorage.setItem("idResultExam", resultExam.id);
    }
    localStorage.setItem("idCurrentExam", idCurrentExam);
    localStorage.setItem("currentPage", "idResultExam");
    document.getElementById('page-content').innerHTML = `
    <div class="container-fluid">
               <div class="row">
                  <div class="col-lg-8">
                     <div class="col-sm-12 col-lg-12">
                     <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title">
                              <h4 class="card-title ml-3" id="timer" style="color: #1e3d73">00:00</h4>
                           </div>
                        </div>
                        <div class="iq-card-body">
                                 <div>
                                    <div class="iq-card-body">
                                       <div class="row">
                                          <div class="col-md-12">
                                             <div id="form-wizard3" class="text-center">
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                  </div>
                  <div class="col-lg-4">
                     <div class="iq-card" style="padding: 20px 15px; display: flex; flex-wrap: wrap; gap: 10px" id="stt">
                     </div>
                  </div>
               </div>
            </div>
    `
    let exam = await getDetailExam(idCurrentExam);
    let htmlBtn = ``;
    for (let i = 0; i < exam.questions.length; i++) {
        if (i <= 9) htmlBtn += `<div><button id="btn-${i}" class="btn btn-outline-primary mb-3" onclick="handleBtn(${i})">0${i + 1}</button></div>`;
        else htmlBtn += `<div><button id="btn-${i}" class="btn btn-outline-primary mb-3" onclick="handleBtn(${i})">${i + 1}</button></div>`;
        let htmlInner = ` 
         <fieldset id="questions-${i}" style="display: none; opacity: 0">
             <div class="form-card text-left" id="question-${i}">
              <div class="ml-2" style="width: 90%"><h5 class="card-title"><span style="font-weight: 800">Task ${i + 1}:</span> ${exam.questions[i].content}</h5></div>
             <div id="answers-${i}"></div>
         </fieldset>`;
        let newDiv = document.createElement("div");
        newDiv.innerHTML = htmlInner;
        let questionDiv = document.getElementById("form-wizard3");
        questionDiv.appendChild(newDiv);

        let htmlAnswers = ``;
        for (let j = 0; j < exam.questions[i].answers.length; j++) {
            if (exam.questions[i].type.id === 2) {
                htmlAnswers += `
                       <div class="custom-control custom-radio ml-2 mt-2" style="width: 90%">
                          <input type="radio" class="custom-control-input" name="answers-${i}" id="answer-${i}.${j}" value="${exam.questions[i].answers[j].content}">
                          <label class="custom-control-label" for="answer-${i}.${j}" style="width: 100%">${exam.questions[i].answers[j].content}</label>
                      </div>`
            }
            if (exam.questions[i].type.id === 1) {
                htmlAnswers += `
                    <div class="custom-control custom-checkbox custom-control-inline ml-2 mt-2" style="width: 90%">
                      <input type="checkbox" class="custom-control-input" name="answers-${i}" id="answer-${i}.${j}" value="${exam.questions[i].answers[j].content}">
                      <label class="custom-control-label" for="answer-${i}.${j}" style="width: 100%">${exam.questions[i].answers[j].content}</label>
                    </div>`
            }
        }
        if (i === 0 && i !== exam.questions.length - 1) {
            htmlAnswers += `<button name="next" class="btn btn-primary next float-right" value="Next" onClick="handNextQuestion(${i})">Next</button>`;
        } else if (i > 0 && i < exam.questions.length - 1) {
            htmlAnswers += `
            <div class="float-right">
                <button name="next" class="btn btn-primary next float-right" value="Next" onClick="handNextQuestion(${i})">Next</button>
                <button type="button" class="btn btn-dark previous action-button-previous float-right mr-3" onclick="handlePrevQuestion(${i})">Previous</button>
            </div>`;
        } else if (i === 0 &&  exam.questions.length === 1) {
            htmlAnswers += `
            <div class="float-right">
                <button name="next" class="btn btn-primary next" value="Next" onClick="handleSubmit(${idCurrentExam})">Submit</button>
            </div>`;
        } else {
            htmlAnswers += `
            <div class="float-right">
                <button type="button" class="btn btn-dark previous action-button-previous mr-2" onclick="handlePrevQuestion(${i})">Previous</button>
                <button name="next" class="btn btn-primary next" value="Next" onClick="handleSubmit(${idCurrentExam})">Submit</button>
            </div>`;
        }
        document.getElementById(`answers-${i}`).innerHTML = htmlAnswers;
        document.getElementById("stt").innerHTML = htmlBtn;
    }

    if (localStorage.getItem("arrAnswers")) {
        let arrAnswers = JSON.parse(localStorage.getItem("arrAnswers"));
        for (let i = 0; i < arrAnswers.length; i++) {
            document.getElementById(arrAnswers[i].result).checked = true;
            document.getElementById(`btn-${arrAnswers[i].index}`).classList.remove("btn-outline-primary");
            document.getElementById(`btn-${arrAnswers[i].index}`).classList.add("btn-primary");
        }
    } else {
        localStorage.setItem("arrAnswers", JSON.stringify([]))
    }

    let currentAnswer = localStorage.getItem("currentAnswer");
    if (!currentAnswer || currentAnswer === "-1") {
        currentAnswer = -1;
        localStorage.setItem("currentAnswer", currentAnswer + '');
        handNextQuestion(-1);
    } else {
        handleBtn()
    }

    let detailExam = await getDetailExam(idCurrentExam);
    const duration = detailExam.rate * 60; // Chuyển 90 phút thành giây
    const display = document.getElementById('timer');
    startTimer(duration, display);
}

function handleBtn(index = +localStorage.getItem("currentAnswer")) {
    let oldAnswer = +localStorage.getItem("currentAnswer");
    checkIsComplete(oldAnswer);
    localStorage.setItem("currentAnswer", index + "");
    document.getElementById(`questions-${oldAnswer}`).style.opacity = 0;
    document.getElementById(`questions-${oldAnswer}`).style.display = "none";
    document.getElementById(`questions-${oldAnswer}`).style.position = "relative";

    document.getElementById(`questions-${index}`).style.opacity = 1;
    document.getElementById(`questions-${index}`).style.display = "block";
    document.getElementById(`questions-${index}`).style.position = "relative";
}

function handlePrevQuestion(index) {
    index = +index;
    checkIsComplete(index);
    localStorage.setItem("currentAnswer", index - 1 + "");
    document.getElementById(`questions-${index}`).style.opacity = 0;
    document.getElementById(`questions-${index}`).style.display = "none";
    document.getElementById(`questions-${index}`).style.position = "relative";

    document.getElementById(`questions-${index - 1}`).style.opacity = 1;
    document.getElementById(`questions-${index - 1}`).style.display = "block";
    document.getElementById(`questions-${index - 1}`).style.position = "relative";
}

function handNextQuestion(index) {
    index = +index;
    if (index >= 0) {
        checkIsComplete(index);
        document.getElementById(`questions-${index}`).style.opacity = 0;
        document.getElementById(`questions-${index}`).style.display = "none";
        document.getElementById(`questions-${index}`).style.position = "relative";
    }
    localStorage.setItem("currentAnswer", index + 1 + "");
    document.getElementById(`questions-${index + 1}`).style.opacity = 1;
    document.getElementById(`questions-${index + 1}`).style.display = "block";
    document.getElementById(`questions-${index + 1}`).style.position = "relative";
}

async function handleSubmit(idCurrentExam) {
    let exam = await getDetailExam(idCurrentExam);
    let resultAnswers = [];
    for (let i = 0; i < exam.questions.length; i++) {
        let arrBoolean = Array.from(document.querySelectorAll(`input[name="answers-${i}"]`))
        for (let j = 0; j < exam.questions[i].answers.length; j++) {
            let a = {
                question: {id: exam.questions[i].id},
                resultExam: {id: localStorage.getItem("idResultExam")}
            };
            if (arrBoolean[j].checked) {
                if (exam.questions[i].answers[j].isTrue) {
                    a.answer = {
                        id: exam.questions[i].answers[j].id
                    };
                    a.isTrue = true;
                } else {
                    a.answer = {
                        id: exam.questions[i].answers[j].id
                    };
                    a.isTrue = false;
                }
                resultAnswers.push(a);
            }
        }
    }
    const scores = {};

    resultAnswers.forEach(item => {
        if (!item.isTrue) {
            scores[item.question.id] = false;
        }
        if (scores[item.question.id] === undefined) {
            scores[item.question.id] = true;
        }
    });
    const totalScore = ((Object.values(scores).filter(value => value).length) / Object.keys(scores).length).toFixed(2) * 10 || 0;
    axios.post("http://localhost:3000/resultAnswers", resultAnswers).then(() => {
        let dataToken = JSON.parse(localStorage.getItem("auth"));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${dataToken.token}`
        };
        axios.get("http://localhost:3000/resultExams/" + localStorage.getItem("idResultExam"), {headers}).then(({data}) => {
            delete data.question;
            delete data.exam;
            delete data.resultAnswers;
            data.score = totalScore;
            axios.post("http://localhost:3000/resultExams", data, {headers}).then(() => {
                clearInterval(cd);
                router('exam/result-exam');
            });
        });
    });
}


function checkIsComplete(index) {
    let isTrue = false;
    let arr = Array.from(document.getElementsByName(`answers-${index}`));
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].checked) {
            isTrue = true;
            break;
        }
    }
    if (isTrue) {
        document.getElementById(`btn-${index}`).classList.remove("btn-outline-primary");
        document.getElementById(`btn-${index}`).classList.add("btn-primary");
    } else {
        document.getElementById(`btn-${index}`).classList.add("btn-outline-primary");
        document.getElementById(`btn-${index}`).classList.remove("btn-primary");
    }

    let arrAnswers = JSON.parse(localStorage.getItem("arrAnswers"));
    arrAnswers = arrAnswers.filter(item => item.index != index);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].checked) {
            arrAnswers.push({index: index, result: arr[i].id})
        }
    }
    localStorage.setItem("arrAnswers", JSON.stringify(arrAnswers));
}

let cd;

function startTimer(duration, display) {
    let endTime = +localStorage.getItem('endTime');
    if (!endTime) {
        endTime = new Date().getTime() + duration * 1000;
        localStorage.setItem('endTime', endTime + '');
    }
    let timer = Math.round((new Date(endTime) - new Date()) / 1000);

    if (timer < 0) {
        localStorage.removeItem('endTime'); // Xóa endTime
        display.textContent = "00:00";
        handleSubmit(localStorage.getItem("idCurrentExam")).then(() => {
            router('exam/list-exam');
        });
        return;
    }

    let minutes, seconds;
    let countdown = setInterval(function () {
        if (timer < 0) {
            clearInterval(countdown);
            localStorage.removeItem('endTime');
            display.textContent = "00:00";
            handleSubmit(localStorage.getItem("idCurrentExam")).then(() => {
                router('exam/list-exam');
            });
            return;
        }

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        timer--;
    }, 1000);
    cd = countdown;
}



