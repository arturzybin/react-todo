import React from 'react';
import './App.scss';
import { TaskList } from './jsComponents/TaskList.js';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     nextId: 3,
      tasks: [
        {
          id: 0,
          text: 'take a rest',
          done: false,
        },
        {
          id: 1,
          text: 'make cleaning',
          done: false,
        },
        {
          id: 2,
          text: 'play football',
          done: true,
        },
      ],
    }
  }
  
  handleDoneTask = (id) => {
    const index = this.state.tasks.findIndex((item) => item.id === id);
    
    const newTasks = this.state.tasks.slice();
    newTasks[index].done = !newTasks[index].done;
    
    this.setState({
      tasks: newTasks,
    })
  }
  
  handleTextChange = (id, text) => {
    const index = this.state.tasks.findIndex((item) => item.id === id);
    
    const newTasks = this.state.tasks.slice();
    newTasks[index].text = text;
    
    this.setState({
      tasks: newTasks,
    })
  }
  
  handleDeleteTask = (id) => {
    const index = this.state.tasks.findIndex((item) => item.id === id);
    
    const newTasks = this.state.tasks.slice();
    newTasks.splice(index, 1);
    
    this.setState({
      tasks: newTasks,
    })
  }
  
  render() {
    return(
      <div className="todo">
        <TaskList
          data={this.state.tasks}
          onTaskDone={this.handleDoneTask}
          onTextChange={this.handleTextChange}
          onDeleteTask={this.handleDeleteTask}
        />
      </div>
    )
  }
}

export default App;
