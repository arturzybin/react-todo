import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {
  
  handleDoubleClick = (event) => {
    const span = event.target;
    const oldText = span.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('task__text');
    input.value = oldText;
    span.closest('.task').replaceChild(input, span);
    input.focus();
    
    
    input.onblur = () => {
      let newText = input.value;
      if (newText === '') {
        newText = oldText;
      };
      
      span.textContent = newText;
      input.closest('.task').replaceChild(span, input);
      
      const {id} = this.props.data;
      this.props.onTextChange(id, newText);
    }
  }


  render() {
    const {id, text, done} = this.props.data;
    const textClassName = (done ? ' task__text_done' : '');
    
    return(
      <div className="task">
        <label className="checkbox">
          <input
            className="checkbox__input"
            type='checkbox'
            checked={done}
            onChange={() => this.props.onTaskToggle(id)}
          />
          <span className="checkbox__checkmark">&#10004;</span>
        </label>
        
        <div className={"task__text" + textClassName} onDoubleClick={this.handleDoubleClick}>{text}</div>
        
        <button
          className="task__destroy"
          onClick={() => this.props.onDeleteTask(id)}
        ></button>
      </div>
    )
  }
}

Task.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }),
  onTaskToggle: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
}

export { Task }