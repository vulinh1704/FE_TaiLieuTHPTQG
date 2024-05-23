function router(currentPage = localStorage.getItem("currentPage")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
        let oldPage = localStorage.getItem("currentPage");
        if (oldPage && currentPage) {
            if (currentPage === "idResultExam") {
                showCompleteExam();
                return;
            }
            localStorage.removeItem("idResultExam");
            localStorage.removeItem("currentAnswer");
            localStorage.removeItem("arrAnswers");
            localStorage.removeItem('endTime');
            if (currentPage.includes("post")) {
                document.getElementById("post").classList.add("active");
                if (currentPage.includes("list-news")) {
                    showAll();
                } else if (currentPage.includes("add-news")) {
                    showFormAdd();
                }
            } else if (currentPage.includes("exam")) {
                document.getElementById("exam").classList.add("active");
                if (currentPage.includes("list-exam")) {
                    showListExam();
                } else if (currentPage.includes("add-exam")) {
                    showFormAddExam();
                } else if (currentPage.includes("result-exam")) {
                    showListResultExam();
                } else if (currentPage.includes("add-Exam-Custom")) {
                    showListExam();
                }
            } else if (currentPage.includes("user")) {
                document.getElementById("user").classList.add("active");
                if (currentPage.includes("profile")) {
                    showProfile();
                } else if (currentPage.includes("change-password")) {
                    showFormChangePassWord();
                }
            }
            if (oldPage !== "idResultExam") {
                document.getElementById(oldPage.split('/')[0]).classList.remove("active-menu");
                document.getElementById(oldPage.split('/')[1]).classList.remove("active");
            }
            localStorage.setItem("currentPage", currentPage);
            document.getElementById(currentPage.split('/')[1]).classList.add("active");
        } else {
            showAll();
            localStorage.setItem("currentPage", "post/list-news");
            document.getElementById("list-news").classList.add("active");
        }
    } else {
        showFormAuth();
        showFormLogin();
    }
}


showMain();
router();

