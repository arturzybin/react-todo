import React from 'react';
import './App.scss';
import { TaskList } from './jsComponents/TaskList.js';
import { Add } from './jsComponents/Add.js';
import { Menu } from './jsComponents/Menu.js';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nextId: 0,
      choosenCategory: 'all',
      tasks: [],
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
  
  
  selectAll = () => {
    let newTasks = this.state.tasks.slice();
    newTasks = newTasks.map(item => {
      item.done = true;
      return item;
    });
    this.setState({
      tasks: newTasks,
    })
  }
  
  
  unselectAll = () => {
    let newTasks = this.state.tasks.slice();
    newTasks = newTasks.map(item => {
      item.done = false;
      return item;
    });
    this.setState({
      tasks: newTasks,
    })
  }
  
  
  checkAllSelected = () => {
    if (this.state.tasks.length === 0){
      return false;
    }
    
    for (let item of this.state.tasks) {
      if ( !item.done) {
        return false;
      }
    }
    
    return true;
  }
  
  
  
  render() {
    const allSelected = this.checkAllSelected();
    
    return(
      <div className="todo">
        <Menu
          onChangeCategory={this.changeCategory}
          onClearCompleted={this.clearCompleted}
          onSelectAll={this.selectAll}
          onUnselectAll={this.unselectAll}
          allSelected={allSelected}
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
