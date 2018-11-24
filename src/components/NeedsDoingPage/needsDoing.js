import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import taskData from '../../helpers/data/taskData';

const printSingleTask = (task) => {
  const cardString = `
  <div>
    <h1>To Do</h1>
    <h3>${task.task}</h3>
    <h3>${task.isCompleted}</h3>
  </div>
  `;
  $('#single-container').html(cardString);
};

const getSingleTask = (e) => {
  const taskId = e.target.dataset.dropdownId;
  taskData(taskId)
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
  taskData(uid)
    .then((tasksArray) => {
      buildDropdown(tasksArray);
    })
    .catch((error) => {
      console.error('error in getting tasks', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleTask);
};

const initializeNeedsPage = () => {
  tasksPage();
  bindEvents();
};

export default initializeNeedsPage;
