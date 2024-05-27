async function showFormAddExam() {
    let subjects = await getDataSubject();
    document.getElementById('page-content').innerHTML = `
    <div class="container-fluid">
               <div class="row">
                  <div class="col-sm-12 col-lg-12">
                     <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title">
                              <h4 class="card-title">Add Exam</h4>
                           </div>
                        </div>
                        <div class="iq-card-body">
                           <div>
                              <div class="form-group">
                                 <label for="title">Title</label>
                                 <input type="text" class="form-control" id="title"  placeholder="Title">
                              </div>
                              <div class="form-group">
                                 <label for="rate">Duration</label>
                                 <input type="number" class="form-control" id="rate" placeholder="Duration Limit">
                              </div>
                              <div class="form-group">
                                 <label for="timeAt">Time at</label>
                                 <input type="time" class="form-control" id="timeAt" readonly="">
                              </div>
                              <div class="form-group">
                                 <label for="type-exam">Level</label>
                                 <select class="form-control" id="type-exam">
                                    <option selected="" disabled="">Select Level</option>
                                    <option value="easy">Dễ</option>
                                    <option value="medium">Trung bình</option>
                                    <option value="difficult">Khó</option>
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
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
    `
    let str = "";
    for (let i = 0; i < subjects.length; i++) {
        str += `<option value="${subjects[i].id}">${subjects[i].name}</option>`
    }
    document.getElementById('subject').innerHTML = str;
    document.getElementById("timeAt").valueAsDate = new Date();
    let exam = {
        "title": "",
        "rate": "0",
        "subject": {},
        "timeAt": "",
        "questions": [],
        "type": "",
        "image": ""
    };
    localStorage.setItem("newExam", JSON.stringify(exam));
}

function addQuestion() {
    let newExam = JSON.parse(localStorage.getItem("newExam"));
    let keyQuestion = newExam.questions.length;
    newExam.questions.push({
        "type": {"id": ""},
        "content": "",
        "answers": []
    });
    localStorage.setItem("newExam", JSON.stringify(newExam));
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
                                                    <input type="text" class="form-control" placeholder="Content" id="content-question-${keyQuestion}">
                                                 </div>
                                                 <div class="form-group col">
                                                     <select class="form-control" id="level-question-${keyQuestion}">
                                                        <option selected="" disabled="">Select Level</option>
                                                        <option value="easy">Dễ</option>
                                                        <option value="medium">Trung Bình</option>
                                                        <option value="difficult">Khó</option>
                                                     </select>
                                                  </div>
                                                 <div class="col">
                                                     <select class="form-control" id="type-${keyQuestion}" onchange="selectType(event, ${keyQuestion})">
                                                        <option selected="" disabled="">Type</option>
                                                        <option value="1">Nhiêu đáp án</option>
                                                        <option value="2">Một đáp án</option>
                                                        <option value="3">Tự luận</option>
                                                     </select>
                                                 </div>
                                                 <div class="col">
                                                    <div class="form-group">
                                                         <input type="file" class="form-control-file" id="exampleFormControlFile1" onchange="uploadQuestion(event, ${keyQuestion})">
                                                      </div>
                                                    </div>
                                              </div>
                                        <div>
                                            <img style="width: 200px; height: 200px; display: none" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Ddefault%2Bimage&psig=AOvVaw11jw-yX7Ztd2J7EFgewYy6&ust=1716883122171000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMi_vZaurYYDFQAAAAAdAAAAABAE" id="image-question-${keyQuestion}"/>
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
}


function selectType(event, keyQuestion) {
    let value = event.target.value;
    let newExam = JSON.parse(localStorage.getItem("newExam"));
    newExam.questions[keyQuestion].answers = [];
    localStorage.setItem("newExam", JSON.stringify(newExam));
    if (value === "1") {
        document.getElementById(`btn-type-${keyQuestion}`).innerHTML = `
         <div class="card-title ml-2 text-primary" style="font-size: 20px;" onclick="createInputMultipleChoice(${keyQuestion})"> + </div> 
        `
        document.getElementById(`answers-${keyQuestion}`).innerHTML = `
            <p class="card-title ml-2 mt-2">Answer...</p> 
        `
        createInputMultipleChoice(keyQuestion);
    }
    if (value === "2") {
        document.getElementById(`btn-type-${keyQuestion}`).innerHTML = `
         <div class="card-title ml-2 text-primary" style="font-size: 20px;" onclick="createInputSingleChoice(${keyQuestion})"> + </div> 
        `
        document.getElementById(`answers-${keyQuestion}`).innerHTML = `
            <p class="card-title ml-2 mt-2">Answer...</p> 
        `
        createInputSingleChoice(keyQuestion);
    }
    if (value === "3") {
        document.getElementById(`btn-type-${keyQuestion}`).innerHTML = ``
        document.getElementById(`answers-${keyQuestion}`).innerHTML = ``
        let newExam = JSON.parse(localStorage.getItem("newExam"));
        newExam.questions[keyQuestion].answers.push({});
        localStorage.setItem("newExam", JSON.stringify(newExam));
    }
}


function createInputSingleChoice(keyQuestion) {
    keyQuestion = +keyQuestion;
    let newExam = JSON.parse(localStorage.getItem("newExam"));
    let keyAnswer = newExam.questions[keyQuestion].answers.length;
    newExam.questions[keyQuestion].answers.push({});
    localStorage.setItem("newExam", JSON.stringify(newExam));
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <div class="custom-control custom-radio custom-control-inline ml-2 mt-2" style="width: 90%">
          <input type="radio" name="is-true-${keyQuestion}" class="custom-control-input" id="is-true-${keyQuestion}.${keyAnswer}">
          <label class="custom-control-label" for="is-true-${keyQuestion}.${keyAnswer}" style="width: 100%"><input type="text" class="form-control" id="answer-${keyQuestion}.${keyAnswer}" placeholder="Answer ${keyAnswer + 1}" ></label>
    </div>
    `;
    let answersDiv = document.getElementById(`answers-${keyQuestion}`);
    answersDiv.appendChild(newDiv);
}

function createInputMultipleChoice(keyQuestion) {
    let newExam = JSON.parse(localStorage.getItem("newExam"));
    keyQuestion = +keyQuestion;
    let keyAnswer = newExam.questions[keyQuestion].answers.length;
    newExam.questions[keyQuestion].answers.push({});
    localStorage.setItem("newExam", JSON.stringify(newExam));
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <div class="custom-control custom-checkbox ml-2 mt-2" style="width: 90%">
          <input type="checkbox" name="is-true-${keyQuestion}" class="custom-control-input" id="is-true-${keyQuestion}.${keyAnswer}">
          <label class="custom-control-label" style="width: 100%" for="is-true-${keyQuestion}.${keyAnswer}"> <input type="text" class="form-control" id="answer-${keyQuestion}.${keyAnswer}" placeholder="Answer ${keyAnswer + 1}" ></label>
    </div>
    `;
    let answersDiv = document.getElementById(`answers-${keyQuestion}`);
    answersDiv.appendChild(newDiv);
}

function addExam() {
    let newExam = JSON.parse(localStorage.getItem("newExam"));
    for (let i = 0; i < newExam.questions.length; i++) {
        newExam.questions[i].type = document.getElementById(`type-${i}`).value;
        console.log(newExam.questions[i].type === "3")
        if (newExam.questions[i].type !== "3") {
            newExam.questions[i].content = document.getElementById(`content-question-${i}`).value;
            newExam.questions[i].level = document.getElementById(`level-question-${i}`).value;
            let arrBoolean = Array.from(document.querySelectorAll(`input[name="is-true-${i}"]`))
            for (let j = 0; j < newExam.questions[i].answers.length; j++) {
                newExam.questions[i].answers[j].isTrue = arrBoolean[j].checked;
                newExam.questions[i].answers[j].content = document.getElementById(`answer-${i}.${j}`).value;
            }
        } else {
            newExam.questions[i].content = document.getElementById(`content-question-${i}`).value;
            newExam.questions[i].level = document.getElementById(`level-question-${i}`).value;
            delete newExam.questions[i].answers;
        }
        if(document.getElementById('image-question-' + i).src !== "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Ddefault%2Bimage&psig=AOvVaw11jw-yX7Ztd2J7EFgewYy6&ust=1716883122171000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMi_vZaurYYDFQAAAAAdAAAAABAE") newExam.questions[i].image = document.getElementById('image-question-' + i).src;
    }

    newExam.title = document.getElementById("title").value;
    newExam.rate = document.getElementById("rate").value;
    newExam.subject.id = document.getElementById("subject").value;
    newExam.type = document.getElementById("type-exam").value;
    newExam.timeAt = new Date();
    axios.post('http://localhost:3000/exams', newExam).then(() => {
        localStorage.removeItem("newExam");
        router('exam/list-exam')
    })
}

async function getDataSubject() {
    let {data} = await axios.get('http://localhost:3000/subjects');
    return data;
}