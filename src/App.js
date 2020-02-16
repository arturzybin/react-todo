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
    const newTasks = this.state.tasks.slice();
    const index = newTasks.findIndex((item) => item.id === id);
    
    newTasks[index] = {
      ...newTasks[index],
      done: !newTasks[index].done,
    };
    
    this.setState({
      tasks: newTasks,
    })
  }
  
  
  changeTaskText = (id, text) => {
    const newTasks = this.state.tasks.slice();
    const index = newTasks.findIndex((item) => item.id === id);

    newTasks[index] = {
      ...newTasks[index],
      text: text,
    };
    
    this.setState({
      tasks: newTasks,
    })
  }
  
  
  deleteTask = (id) => {
    const newTasks = this.state.tasks.slice();
    const index = newTasks.findIndex((item) => item.id === id);
    
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
      return {
        ...item,
        done: true,
      };
    });
    
    this.setState({
      tasks: newTasks,
    })
  }
  
  
  unselectAll = () => {
    let newTasks = this.state.tasks.slice();
    
    newTasks = newTasks.map(item => {
      return {
        ...item,
        done: false,
      };
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
    const {tasks, choosenCategory} = this.state;
    
    return(
      <div className="todo">
        {tasks.length
          ? <Menu
            onChangeCategory={this.changeCategory}
            onClearCompleted={this.clearCompleted}
            onSelectAll={this.selectAll}
            onUnselectAll={this.unselectAll}
            allSelected={allSelected}
          />
          : null
        }
        
        <div className="todo__body">
          <Add onAddTask={this.addTask} />
          
          <TaskList
            data={tasks}
            category={choosenCategory}
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
