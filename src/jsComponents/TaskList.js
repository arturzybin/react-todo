import React from 'react';
import PropTypes from 'prop-types'
import { Task } from './Task.js'


class TaskList extends React.Component {
  renderTasks = () => {
    const tasks = this.props.data;
    let tasksListTemplate = [];
    
    tasksListTemplate = tasks.map((item) => {
      return (
        <Task
          key={item.id}
          data={item}
          onTaskDone={this.props.onTaskDone}
          onTextChange={this.props.onTextChange}
        />
      )
    })
    
    return tasksListTemplate;
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
  onTaskDone: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
}

export { TaskList }