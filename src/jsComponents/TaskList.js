import React from 'react';
import PropTypes from 'prop-types'
import { Task } from './Task.js'


class TaskList extends React.Component {
  renderTasks = () => {
    const tasks = this.sortTasks(this.props.data, this.props.category);
    let tasksListTemplate = [];
    
    tasksListTemplate = tasks.map((item) => {
      return (
        <Task
          key={item.id}
          data={item}
          onTaskToggle={this.props.onTaskToggle}
          onTextChange={this.props.onTextChange}
          onDeleteTask={this.props.onDeleteTask}
        />
      )
    })
    
    return tasksListTemplate;
  }
  
  
  sortTasks = (tasks, category) => {
    const completedTasks = tasks.filter((item) => item.done);
    const activeTasks = tasks.filter((item) => !item.done);
    
    completedTasks.sort( (item1, item2) => (item1.id > item2.id ? 1 : -1) )
    activeTasks.sort( (item1, item2) => (item1.id > item2.id ? 1 : -1) )
    
    completedTasks.reverse();
    activeTasks.reverse();
    
    if (category === 'active'){
      return activeTasks;
    } else if (category === 'completed') {
      return completedTasks;
    } else {
      return activeTasks.concat(completedTasks);
    }
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
  category: PropTypes.string.isRequired,
}

export { TaskList }