async function showFormEditExam(id) {
    let subjects = await getDataSubject();
    let examEdit = await getDetailExam(id);
    document.getElementById('page-content').innerHTML = `
    <div class="container-fluid">
               <div class="row">
                  <div class="col-sm-12 col-lg-12">
                     <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title">
                              <h4 class="card-title">Edit Exam</h4>
                           </div>
                        </div>
                        <div class="iq-card-body">
                           <div>
                              <div class="form-group">
                                 <label for="title">Title</label>
                                 <input type="text" class="form-control" id="title" value="${examEdit.title}" placeholder="Title">
                              </div>
                              <div class="form-group">
                                 <label for="rate">Duration</label>
                                 <input type="number" class="form-control" id="rate" value="${examEdit.rate}" placeholder="Duration Limit">
                              </div>
                              <div class="form-group">
                                 <label for="timeAt">Time at</label>
                                 <input type="text" class="form-control" id="timeAt" value="${examEdit.timeAt}" readonly="">
                              </div>
                              <div class="form-group">
                                 <label for="type-exam">Level</label>
                                 <select class="form-control" id="type-exam">
                                    <option selected="" disabled="">Select Level</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="difficult">Difficult</option>
                                 </select>
                              </div>
                              <div class="form-group">
                                 <label for="subject">Subject</label>
                                 <select multiple="" class="form-control" id="subject">
                                    <option>select-1</option>
                                 </select>
                              </div>
                              <div class="form-group">
                                 <h5 class="card-title">Questions</h5>
                                 <div id="questions">
                                    
                                 </div>
                                 <div style="width: 100%; font-size: 20px; display: flex; justify-content: end; padding-right: 20px; padding-bottom: 20px; color: #1e3d73">
                                    <div onclick="addQuestion()"><i class="fa-regular fa-square-plus"></i></div>
                                 </div>
                              </div>
                              <button type="submit" class="btn btn-primary" onclick="addExam()">Submit</button>
                              <button type="submit" class="btn btn-primary" onclick="showListExam()">Back List Exam</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
    `
    let str = "";
    for (let i = 0; i < subjects.length; i++) {
        if (subjects[i].id === examEdit.subject.id) {
            str += `<option value="${subjects[i].id}" selected="">${subjects[i].name}</option>`
        }
        str += `<option value="${subjects[i].id}">${subjects[i].name}</option>`
    }
    document.getElementById('subject').innerHTML = str;
    document.getElementById("type-exam").value = examEdit.type;
    localStorage.setItem("newExam", JSON.stringify(examEdit));
    showOldQuestion(examEdit.questions)
}

function showOldQuestion(questions) {
    for (let keyQuestion = 0; keyQuestion < questions.length; keyQuestion++) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `
                                        <div class="iq-card">
                                        <div class="iq-card-header d-flex justify-content-between">
                                           <div class="iq-header-title">
                                              <label class="card-title">Question ${keyQuestion + 1}</label>
                                           </div>
                                        </div>
                                        <div class="iq-card-body">
                                                <div class="row">
                                                 <div class="col">
                                                    <input type="text" class="form-control" placeholder="Content" id="content-question-${keyQuestion}" value="${questions[keyQuestion].content}">
                                                 </div>
                                                 <div class="form-group col">
                                                     <select class="form-control" id="level-question-${keyQuestion}">
                                                        <option selected="" disabled="">Select Level</option>
                                                        <option value="easy">Easy</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="difficult">Difficult</option>
                                                     </select>
                                                  </div>
                                                 <div class="col">
                                                     <select class="form-control" id="type-${keyQuestion}" onchange="selectType(event, ${keyQuestion})">
                                                        <option selected="" disabled="">Type</option>
                                                        <option value="1">Multiple Choice</option>
                                                        <option value="2">Single Choice</option>
                                                        <option value="3">Essay</option>
                                                     </select>
                                                 </div>
                                              </div>
                                        <div id="answers-${keyQuestion}">
                                             
                                        </div>
                                        <div id="btn-type-${keyQuestion}">
                                             
                                        </div>
                                        </div>
                                     </div>
    `;
        let answersDiv = document.getElementById("questions");
        answersDiv.appendChild(newDiv);
        document.getElementById(`type-${keyQuestion}`).value = questions[keyQuestion].type.id;
        document.getElementById(`level-question-${keyQuestion}`).value = questions[keyQuestion].level;
        document.getElementById(`answers-${keyQuestion}`).innerHTML = `<p class="card-title ml-2 mt-2">Answer...</p>`;
        for (let keyAnswer = 0; keyAnswer < questions[keyQuestion].answers.length; keyAnswer++) {
            if (questions[keyQuestion].type.id === 1) {
                document.getElementById(`btn-type-${keyQuestion}`).innerHTML = `<div class="card-title ml-2 text-primary" style="font-size: 20px;" onclick="createInputMultipleChoice(${keyQuestion})"> + </div>`
                let newDiv = document.createElement("div");
                newDiv.innerHTML = `
                    <div class="custom-control custom-checkbox ml-2 mt-2" style="width: 90%">
                          <input type="checkbox" name="is-true-${keyQuestion}" class="custom-control-input" id="is-true-${keyQuestion}.${keyAnswer}" checked="${questions[keyQuestion].answers[keyAnswer].isTrue}">
                          <label class="custom-control-label" style="width: 100%" for="is-true-${keyQuestion}.${keyAnswer}"> <input type="text" class="form-control" value="${questions[keyQuestion].answers[keyAnswer].content}" id="answer-${keyQuestion}.${keyAnswer}" placeholder="Answer ${keyAnswer + 1}" ></label>
                    </div>
                    `;
                let answersDiv = document.getElementById(`answers-${keyQuestion}`);
                console.log(newDiv)
                answersDiv.appendChild(newDiv);
            }

            if (questions[keyQuestion].type.id === 2) {
                document.getElementById(`btn-type-${keyQuestion}`).innerHTML = `<div class="card-title ml-2 text-primary" style="font-size: 20px;" onclick="createInputSingleChoice(${keyQuestion})"> + </div>`
                let newDiv = document.createElement("div");
                newDiv.innerHTML = `
                    <div class="custom-control custom-radio custom-control-inline ml-2 mt-2" style="width: 90%">
                          <input type="radio" name="is-true-${keyQuestion}" class="custom-control-input" id="is-true-${keyQuestion}.${keyAnswer}" checked="${questions[keyQuestion].answers[keyAnswer].isTrue}">
                          <label class="custom-control-label" for="is-true-${keyQuestion}.${keyAnswer}" style="width: 100%"><input type="text" class="form-control" id="answer-${keyQuestion}.${keyAnswer}" value="${questions[keyQuestion].answers[keyAnswer].content}" placeholder="Answer ${keyAnswer + 1}" ></label>
                    </div>
                    `;
                let answersDiv = document.getElementById(`answers-${keyQuestion}`);
                answersDiv.appendChild(newDiv);
            }

            if (questions[keyQuestion].type.id === 3) {
                document.getElementById(`btn-type-${keyQuestion}`).innerHTML = ``
                document.getElementById(`answers-${keyQuestion}`).innerHTML = ``
            }
        }
    }
}

