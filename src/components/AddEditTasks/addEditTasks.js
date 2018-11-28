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

$('body').on('click', '#addTask', addNewTask);


export default buildAddForm;
