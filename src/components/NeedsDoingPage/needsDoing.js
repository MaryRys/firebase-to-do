import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import taskData from '../../helpers/data/taskData';

import './needsDoing.scss';

const printTasks = (tasksArray) => {
  let cardString = '';
  tasksArray.forEach((task) => {
    cardString += `
  <div class="tasksContainer">
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">To Do</h5>
      <p class="card-text">${task.task}</p>
      <button class="btn btn-info edit-btn" data-edit-id=${task.id}>Edit</button>
      <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete</button>
      <div class="form-check form-check-inline">
      <label class="form-check-label" for="inlineCheckbox1">Is complete?</label>
      <input class="checkIsComplete" type="checkbox" id="${task.id}">
      </div>
    </div>
  </div>
  </div>`;
    $('#single-container').append(cardString);
  });
};

// const printCompletedTasks = (completedTasksArray) => {
//   let cardString = '';
//   completedTasksArray.forEach((task) => {
//     cardString += `
//   <div class="container">
//   <div class="card" style="width: 18rem;">
//     <div class="card-body">
//       <h5 class="card-title">To Do</h5>
//       <p class="card-text">${task.task}</p>
//       <button class="btn btn-info edit-btn" data-edit-id=${task.id}>Edit</button>
//       <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete</button>
//       <div class="form-check form-check-inline">
//       <label class="form-check-label" for="inlineCheckbox1">Is complete?</label>
//       <input class="checkIsComplete" type="checkbox" id="${task.id}">
//       </div>
//     </div>
//   </div>
//   </div>`;
//     $('#completed-container').append(cardString);
//   });
// };

// const printSingleTask = (task) => {
//   const cardString = `
//   <div class="container">
//   <div class="card" style="width: 18rem;">
//     <div class="card-body">
//       <h5 class="card-title">To Do</h5>
//       <p class="card-text">${task.task}</p>
//       <button class="btn btn-info edit-btn" data-edit-id=${task.id}>Edit</button>
//       <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete</button>
//       <div class="form-check form-check-inline">
//       <label class="form-check-label" for="inlineCheckbox1">Is complete?</label>
//       <input class="checkIsComplete" type="checkbox" id="${task.id}">
//       </div>
//     </div>
//   </div>
//   </div>`;
//   $('#single-container').append(cardString);
//   if (task.isCompleted) {
//     $('.checkIsComplete').attr('checked', true);
//   }
// };

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

// const buildDropdown = (tasksArray) => {
//   let dropdown = `<div class="dropdown">
//   <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//     Pick a Task
//   </button>
//   <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
//   if (tasksArray.length) {
//     tasksArray.forEach((task) => {
//       dropdown += `<div class="dropdown-item get-single" data-dropdown-id=${task.id}>${task.task}</div>`;
//     });
//   } else {
//     dropdown += '<div class="dropdown-item">You have no tasks</div>';
//   }
//   dropdown += '<div></div>';
//   $('#dropdown-container').html(dropdown);
// };

const tasksPage = () => {
  const uid = authHelpers.getCurrentUid();
  taskData.getAllTasks(uid)
    .then((tasksArray) => {
      // const tasksToDo = tasksArray.filter(task => task.isCompleted === false);
      // const completedTasks = tasksArray.filter(task => task.isComplete === true);
      printTasks(tasksArray);
      // printTasks(tasksToDo);
      // printCompletedTasks(completedTasks);
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

const updateIsComplete = (e) => {
  const taskId = e.target.id;
  const isCompleted = e.target.checked;
  taskData.updatedIsComplete(taskId, isCompleted)
    .then(() => {
      tasksPage();
    })
    .catch((err) => {
      console.error('error in updating flag', err);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleTask);
  $('body').on('click', '.delete-btn', deleteTask);
  $('body').on('click', '.checkIsComplete', updateIsComplete);
};

const initializeNeedsPage = () => {
  tasksPage();
  bindEvents();
};

export default initializeNeedsPage;
