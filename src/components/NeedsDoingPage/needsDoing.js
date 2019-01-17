import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import taskData from '../../helpers/data/taskData';
import './needsDoing.scss';

const printTasks = (tasksArray) => {
  let cardString = '';
  tasksArray.forEach((task) => {
    cardString += `
    <div class="card" style="width: 16rem;">
      <div class="card-body">
        <h4 class="card-text">${task.task}</h4>
        <button class="btn btn-info edit-btn" data-edit-id=${task.id}>Edit</button>
        <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete</button>
        <div class="form-check form-check-inline">
        <label class="form-check-label" for="inlineCheckbox1">Is complete?</label>
        <input class="checkIsComplete" type="checkbox" id="${task.id}">
        </div>
      </div>
    </div>`;
    if (task.isCompleted) {
      $('.checkIsComplete').attr('checked', true);
      $('#single-container').html(cardString);
    // } else {
    //   ('.checkIsComplete').attr('', false);
    //   $('#completed-container').html(cardString);
    }
  });
};
console.log(printTasks);


// const getSingleTask = (e) => {
//   const taskId = e.target.dataset.dropdownId;
//   taskData.getSingleTask(taskId)
//     .then((singleTask) => {
//       printSingleTask(singleTask);
//     })
//     .catch((error) => {
//       console.error('error getting one task', error);
//     });
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
  // $('body').on('click', '.get-single', getSingleTask);
  $('body').on('click', '.delete-btn', deleteTask);
  $('body').on('click', '.checkIsComplete', updateIsComplete);
};

const initializeNeedsPage = () => {
  tasksPage();
  bindEvents();
};

export default initializeNeedsPage;
