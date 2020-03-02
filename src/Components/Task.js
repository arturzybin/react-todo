import React from 'react';
import PropTypes from 'prop-types';


class Task extends React.Component {
  
  handleDoubleClick = (event) => {
    // use closures because it is the cleanest way to remove keypress event listener
    const applyNewText = (event) => {
      if (event.keyCode && event.keyCode !== 13) return;

      input.onblur = null;
      document.removeEventListener('keypress', applyNewText);

      let newText = input.value;
      if (newText === '') {
        newText = oldText;
      };
      
      span.textContent = newText;
      input.closest('.task').replaceChild(span, input);
      
      const {id} = this.props.taskData;
      this.props.onTextChange(id, newText);
    }


    const span = event.target;
    const oldText = span.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('task__text');
    input.value = oldText;
    input.spellcheck = false;
    span.closest('.task').replaceChild(input, span);
    input.focus();
    
    
    input.onblur = applyNewText;
    document.addEventListener('keypress', applyNewText);
  }
  
  
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.taskData.isCompleted !== this.props.taskData.isCompleted
      || nextProps.taskData.text !== this.props.taskData.text
    )
  }


  render() {
    const {id, text, isCompleted} = this.props.taskData;
    const textClassName = (isCompleted ? ' task__text_completed' : '');
    
    return(
      <div className="task">
        <label className="checkbox">
          <input
            className="checkbox__input"
            type='checkbox'
            checked={isCompleted}
            onChange={() => this.props.onTaskToggle(id)}
          />
          <span className="checkbox__checkmark">&#10004;</span>
        </label>
        
        <div
          className={"task__text" + textClassName}
          onDoubleClick={this.handleDoubleClick}
        >{text}</div>
        
        <button
          className="task__destroy"
          onClick={() => this.props.onDeleteTask(id)}
        ></button>
      </div>
    )
  }
}

Task.propTypes = {
  taskData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }),
  onTaskToggle: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
}

export { Task }