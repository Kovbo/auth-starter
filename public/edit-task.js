const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let tempName;

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`);
    const { id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTask();

editFormDOM.addEventListener("submit", async (e) => {
  editBtnDOM.textContent = "Завантаження...";
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;

    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });

    const { id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `Збережено`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    console.error(error);
    taskNameDOM.value = tempName;
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `Помилка, спробуйте пізніше`;
  }
  editBtnDOM.textContent = "Edit";
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
