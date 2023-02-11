const toDoForm = document.getElementById("to-do-form");
const toDoInput = document.getElementById("to-do-input");
const editForm = document.getElementById("edit-form");
const editInput = document.getElementById("edit-input");
const cancelEditBtn = document.getElementById(
    "cancel-edit-btn"
);
const toDoList = document.getElementById("to-do-list");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue = "";

const newToDo = (toDoTitle) => {
    const newToDo = document.createElement("div");
    newToDo.classList.add("to-do");

    const newToDoTitle = document.createElement("h3");
    newToDoTitle.innerText = toDoTitle;

    const finishToDoBtn = document.createElement("button");
    finishToDoBtn.type = "button";
    finishToDoBtn.classList.add("finish-to-do");
    finishToDoBtn.innerHTML =
        '<i class="fa-solid fa-check"></i>';

    const editToDoBtn = document.createElement("button");
    editToDoBtn.type = "button";
    editToDoBtn.classList.add("edit-to-do");
    editToDoBtn.innerHTML =
        '<i class="fa-solid fa-pen"></i>';

    const removeToDoBtn = document.createElement("button");
    removeToDoBtn.type = "button";
    removeToDoBtn.classList.add("remove-to-do");
    removeToDoBtn.innerHTML =
        '<i class="fa-solid fa-xmark"></i>';

    newToDo.append(
        newToDoTitle,
        finishToDoBtn,
        editToDoBtn,
        removeToDoBtn
    );
    toDoList.appendChild(newToDo);
};

toDoForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    let newTitle = toDoInput.value;

    if (newTitle) {
        newToDo(newTitle);
    }

    toDoInput.value = "";
});

const toggleForms = () => {
    editForm.classList.toggle("hide");
    editInput.focus();
};

toDoList.addEventListener("click", (ev) => {
    const targetEl = ev.target;
    const parentEl = targetEl.closest("div");
    let toDoTitle = "";

    if (parentEl && parentEl.querySelector("h3")) {
        toDoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-to-do")) {
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains("edit-to-do")) {
        toggleForms();
        editInput.value = toDoTitle;
        oldInputValue = toDoTitle;
    }

    if (targetEl.classList.contains("remove-to-do")) {
        parentEl.remove();
    }
});

const updateToDo = (newTitle) => {
    const toDoS = document.querySelectorAll(".to-do");

    toDoS.forEach((toDo) => {
        let actualTitle = toDo.querySelector("h3");
        if (actualTitle.innerText === oldInputValue) {
            actualTitle.innerText = newTitle;
        }
    });
};

editForm.addEventListener("submit", (ev) => {
    ev.preventDefault();

    let newTitle = editInput.value;
    if (newTitle) {
        updateToDo(newTitle);
    }
    toggleForms();
});

cancelEditBtn.addEventListener("click", () => {
    toggleForms();
});

const getSearchedToDoS = (search) => {
    const toDoS = document.querySelectorAll(".to-do");

    toDoS.forEach((toDo) => {
        const toDoTitle = toDo
            .querySelector("h3")
            .innerText.toLowerCase();

        toDo.style.display = "flex";

        if (!toDoTitle.includes(search)) {
            toDo.style.display = "none";
        }
    });
};

searchInput.addEventListener("keyup", (ev) => {
    const search = ev.target.value;

    getSearchedToDoS(search);
});

eraseBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    searchInput.value = "";

    const toDoS = document.querySelectorAll(".to-do");

    toDoS.forEach((toDo) => {
        toDo.style.display = "flex";
    });
});

const filterToDoS = (filterValue) => {
    const toDoS = document.querySelectorAll(".to-do");

    switch (filterValue) {
        case "all":
            toDoS.forEach((toDo) => {
                toDo.style.display = "flex";
            });

            break;

        case "done":
            toDoS.forEach((toDo) => {
                if (toDo.classList.contains("done")) {
                    toDo.style.display = "flex";
                } else {
                    toDo.style.display = "none";
                }
            });

            break;

        case "toDo":
            toDoS.forEach((toDo) => {
                if (!toDo.classList.contains("done")) {
                    toDo.style.display = "flex";
                } else {
                    toDo.style.display = "none";
                }
            });

            break;
    }
};

filterBtn.addEventListener("change", (ev) => {
    const filterValue = ev.target.value;
    filterToDoS(filterValue);
});
