import React from 'react';
import PropTypes from 'prop-types'
import { Task } from './Task.js'


function TaskList(props) {
  
  const renderTasks = () => {
    const tasks = sortTasks(props.data, props.category);
    let tasksListTemplate = [];
    
    tasksListTemplate = tasks.map((task) => {
      return (
        <Task
          key={task.id}
          taskData={task}
          onTaskToggle={props.onTaskToggle}
          onTextChange={props.onTextChange}
          onDeleteTask={props.onDeleteTask}
        />
      )
    })
    
    return tasksListTemplate;
  }
  
  
  const sortTasks = (tasks, category) => {
    const completedTasks = tasks.filter((task) => task.isCompleted);
    const activeTasks = tasks.filter((task) => !task.isCompleted);
    
    // sorting in order of creating (newest on the top of todo list)
    completedTasks.sort( (task1, task2) => (task1.id > task2.id ? -1 : 1) )
    activeTasks.sort( (task1, task2) => (task1.id > task2.id ? -1 : 1) )
    
    if (category === 'active'){
      return activeTasks;
    } else if (category === 'completed') {
      return completedTasks;
    } else {
      return activeTasks.concat(completedTasks);
    }
  }
  
  
  return (
    <div className="todo__tasklist">
      {renderTasks()}
    </div>
  )
}


TaskList.propTypes = {
  data: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
}


export { TaskList }