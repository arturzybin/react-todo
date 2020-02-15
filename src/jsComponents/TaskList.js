import React from 'react';
import PropTypes from 'prop-types'
import { Task } from './Task.js'


class TaskList extends React.Component {
  renderTasks = () => {
    const tasks = this.sortTasks(this.props.data);
    let tasksListTemplate = [];
    
    tasksListTemplate = tasks.map((item) => {
      return (
        <Task
          key={item.id}
          data={item}
          onTaskDone={this.props.onTaskDone}
          onTextChange={this.props.onTextChange}
          onDeleteTask={this.props.onDeleteTask}
        />
      )
    })
    
    return tasksListTemplate;
  }
  
  sortTasks = (tasks) => {
    const doneTasks = tasks.filter((item) => item.done);
    const undoneTasks = tasks.filter((item) => !item.done);
    
    doneTasks.sort( (item1, item2) => (item1.id > item2.id ? 1 : -1) )
    undoneTasks.sort( (item1, item2) => (item1.id > item2.id ? 1 : -1) )
    
    doneTasks.reverse();
    undoneTasks.reverse();
    
    return undoneTasks.concat(doneTasks)
  }
  
  render() {
    return(
      <div className="todo__tasklist">
        {this.renderTasks()}
      </div>
    )
  }
}

TaskList.propTypes = {
  data: PropTypes.array.isRequired,
}

export { TaskList }