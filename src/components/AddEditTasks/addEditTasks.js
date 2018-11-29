import $ from 'jquery';

import taskData from '../../helpers/data/taskData';
import initializeNeedsPage from '../NeedsDoingPage/needsDoing';

const formBuilder = (task) => {
  const form = `
    <div class="form-group">
      <label>Task to do</label>
      <input type="text" class="form-control" id="form-task-added" value="${task.task}" placeholder="Enter task to do">
    </div>
  `;
  return form;
};

const gettingTaskFromForm = () => {
  const task = {
    task: $('#form-task-added').val(),
    isComplete: false,
  };
  return task;
};

const buildAddForm = () => {
  const emptyTask = {
    task: '',
  };

  let domString = '<h3>Add New Task</h3>';
  domString += formBuilder(emptyTask);
  domString += '<button id="addTask">Save New Task</button>';
  $('#addEditTask').html(domString).show();
  $('#container').hide();
};

const addNewTask = () => {
  const newTask = gettingTaskFromForm();
  taskData.addNewTask(newTask)
    .then(() => {
      $('#addEditTask').html('').hide();
      $('#container').show();
      initializeNeedsPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

// bring up edit task form

const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  taskData.getSingleTask(idToEdit)
    .then((singleTask) => {
      let domString = '<h2>Edit Task</h2>';
      domString += formBuilder(singleTask);
      domString += `<button id="edit-task" data-single-edit-id=${singleTask.id}>Save Task</button>`;
      $('#addEditTask').html(domString).show();
      $('#single-container').hide();
    })
    .catch((error) => {
      console.error('error in getting task for edit', error);
    });
};

// update task

const updateTask = (e) => {
  const updatedTask = gettingTaskFromForm();
  const taskId = e.target.dataset.singleEditId;
  taskData.updateTask(updatedTask, taskId)
    .then(() => {
      $('#addEditTask').html('').hide();
      $('single-container').html('');
      initializeNeedsPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('click', '#addTask', addNewTask);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-task', updateTask);


export default buildAddForm;
