function router(currentPage = localStorage.getItem("currentPage")) {
    let oldPage = localStorage.getItem("currentPage");
    if (oldPage && currentPage) {
        if (currentPage === "list-news") {
            showAll();
        } else if (currentPage === "add-news") {
            showFormAdd();
        }
        document.getElementById(oldPage).classList.remove("active");
        localStorage.setItem("currentPage", currentPage);
        document.getElementById(currentPage).classList.add("active");
    } else {
        showAll();
        localStorage.setItem("currentPage", "list-news");
        document.getElementById("list-news").classList.add("active");
    }
}

showMain();
router();