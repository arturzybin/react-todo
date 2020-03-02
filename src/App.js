import React from 'react';
import './App.scss';

import { TaskList } from './Components/TaskList.js';
import { Add } from './Components/Add.js';
import { Menu } from './Components/Menu.js';


class App extends React.Component {
  state = {
    selectedCategory: 'all',
    tasks: [],
  }


  componentDidMount() {
     const storedTasks =JSON.parse(localStorage.getItem('tasks'));
     if (!storedTasks) return;
     this.setState( {tasks: storedTasks} );
  }

  componentDidUpdate() {
     localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }


  addTask = (text) => {
    const id = Date.now();
    const tasks = this.state.tasks.slice();
    tasks.push({
      id: id,
      text: text,
      isCompleted: false,
    })
    
    this.setState({
      nextId: id + 1,
      tasks: tasks,
    })
  }
  
  
  deleteTask = (id) => {
    const tasks = this.state.tasks.slice();
    const index = tasks.findIndex((task) => task.id === id);
    
    tasks.splice(index, 1);
    
    this.setState({
      tasks: tasks,
    })
  }
  
  
  toggleTask = (id) => {
    const tasks = this.state.tasks.slice();
    const index = tasks.findIndex((task) => task.id === id);
    
    tasks[index] = {
      ...tasks[index],
      isCompleted: !tasks[index].isCompleted,
    };
    
    this.setState({
      tasks: tasks,
    })
  }
  
  
  changeTaskText = (id, text) => {
    const tasks = this.state.tasks.slice();
    const index = tasks.findIndex((task) => task.id === id);

    tasks[index] = {
      ...tasks[index],
      text: text,
    };
    
    this.setState({
      tasks: tasks,
    })
  }
  
  
  clearCompleted = () => {
    let tasks = this.state.tasks.slice();
    tasks = tasks.filter(task => !task.isCompleted)
    this.setState({
      tasks: tasks,
    })
  }
  
  
  selectAll = () => {
    let tasks = this.state.tasks.slice();
    
    tasks = tasks.map(task => {
      return {
        ...task,
        isCompleted: true,
      };
    });
    
    this.setState({
      tasks: tasks,
    })
  }
  
  
  unselectAll = () => {
    let tasks = this.state.tasks.slice();
    
    tasks = tasks.map(task => {
      return {
        ...task,
        isCompleted: false,
      };
    });
    
    this.setState({
      tasks: tasks,
    })
  }
  

  // needs for Menu to toggle 'select all' checkbox
  checkIsAllSelected = () => {
    if (this.state.tasks.length === 0){
      return false;
    }
    
    for (let task of this.state.tasks) {
      if ( !task.isCompleted) {
        return false;
      }
    }
    
    return true;
  }


  changeCategory = (category) => {
    this.setState({
      selectedCategory: category,
    })
  }
  
  
  render() {
    const isAllSelected = this.checkIsAllSelected();
    const {tasks, selectedCategory} = this.state;
    
    return(      
      <div className="todo">
        {tasks.length
          ? <Menu
            onChangeCategory={this.changeCategory}
            onClearCompleted={this.clearCompleted}
            onSelectAll={this.selectAll}
            onUnselectAll={this.unselectAll}
            isAllSelected={isAllSelected}
          />
          : null
        }
        
        <div className="todo__body">
          <Add onAddTask={this.addTask} />
          
          <TaskList
            data={tasks}
            category={selectedCategory}
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
