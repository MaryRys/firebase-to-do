import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import taskData from '../../helpers/data/taskData';

const printSingleTask = (task) => {
  const cardString = `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">To Do</h5>
      <p class="card-text">${task.task}</p>
      <button class="btn btn-info edit-btn" data-edit-id=${task.id}>Edit</button>
      <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete</button>
        <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="customCheck1">
          <label class="custom-control-label" for="customCheck1">Complete</label>
        </div>
    </div>
  </div>
  `;
  $('#single-container').append(cardString);
};

const getSingleTask = (e) => {
  const taskId = e.target.dataset.dropdownId;
  taskData.getSingleTask(taskId)
    .then((singleTask) => {
      printSingleTask(singleTask);
    })
    .catch((error) => {
      console.error('error getting one task', error);
    });
};

const buildDropdown = (tasksArray) => {
  let dropdown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Pick a Task
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (tasksArray.length) {
    tasksArray.forEach((task) => {
      dropdown += `<div class="dropdown-item get-single" data-dropdown-id=${task.id}>${task.task}</div>`;
    });
  } else {
    dropdown += '<div class="dropdown-item">You have no tasks</div>';
  }
  dropdown += '<div></div>';
  $('#dropdown-container').html(dropdown);
};

const tasksPage = () => {
  const uid = authHelpers.getCurrentUid();
  taskData.getAllTasks(uid)
    .then((tasksArray) => {
      buildDropdown(tasksArray);
    })
    .catch((error) => {
      console.error('error in getting tasks', error);
    });
};

const deleteTask = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  console.log(idToDelete);
  taskData.deleteTask(idToDelete)
    .then(() => {
      tasksPage();
      $('#single-container').html('');
    })
    .catch((error) => {
      console.error('error in deleting task', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleTask);
  $('body').on('click', '.delete-btn', deleteTask);
};

const initializeNeedsPage = () => {
  tasksPage();
  bindEvents();
};

export default initializeNeedsPage;