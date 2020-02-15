import React from 'react';
import './App.scss';
import { TaskList } from './jsComponents/TaskList.js';
import { Add } from './jsComponents/Add.js';
import { Menu } from './jsComponents/Menu.js';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nextId: 3,
      choosenCategory: 'all',
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
          done: false,
        },
      ],
    }
  }
  
  
  toggleTask = (id) => {
    const index = this.state.tasks.findIndex((item) => item.id === id);
    
    const newTasks = this.state.tasks.slice();
    newTasks[index].done = !newTasks[index].done;
    
    this.setState({
      tasks: newTasks,
    })
  }
  
  
  changeTaskText = (id, text) => {
    const index = this.state.tasks.findIndex((item) => item.id === id);
    
    const newTasks = this.state.tasks.slice();
    newTasks[index].text = text;
    
    this.setState({
      tasks: newTasks,
    })
  }
  
  
  deleteTask = (id) => {
    const index = this.state.tasks.findIndex((item) => item.id === id);
    
    const newTasks = this.state.tasks.slice();
    newTasks.splice(index, 1);
    
    this.setState({
      tasks: newTasks,
    })
  }
  
  
  addTask = (text) => {
    const id = this.state.nextId;
    const newTasks = this.state.tasks.slice();
    newTasks.push({
      id: id,
      text: text,
      done: false,
    })
    
    this.setState({
      nextId: id + 1,
      tasks: newTasks,
    })
  }
  
  
  changeCategory = (category) => {
    this.setState({
      choosenCategory: category,
    })
  }
  
  
  clearCompleted = () => {
    let newTasks = this.state.tasks.slice();
    newTasks = newTasks.filter(item => !item.done)
    this.setState({
      tasks: newTasks,
    })
  }
  
  
  render() {
    return(
      <div className="todo">
        <Menu
          onChangeCategory={this.changeCategory}
          onClearCompleted={this.clearCompleted}
        />
        
        <div className="todo__body">
          <Add onAddTask={this.addTask} />
          
          <TaskList
            data={this.state.tasks}
            category={this.state.choosenCategory}
            onTaskToggle={this.toggleTask}
            onTextChange={this.changeTaskText}
            onDeleteTask={this.deleteTask}
          />
        </div>
      </div>
    )
  }
}

export default App;
