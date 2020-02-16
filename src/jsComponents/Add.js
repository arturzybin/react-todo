import React from 'react';
import PropTypes from 'prop-types'

class Add extends React.Component {
  addSubmitListener = () => {
    document.addEventListener('keypress', this.submit)
  }
  removeSubmitListener = () => {
    document.removeEventListener('keypress', this.submit)
  }
  
  
  submit = (event) => {
    const input = document.querySelector('.add__text')
    if (event.code !== 'Enter') return;
    const text = input.value;
    input.value = '';
    if (text === '') return;
    this.props.onAddTask(text);
  }
  
  
  shouldComponentUpdate() {
    return false;
  }
  
  
  render() {
    return (
      <div className="add">
        <input
          className="add__text"
          type='text'
          placeholder="What needs to be done?"
          spellCheck="false"
          onFocus={this.addSubmitListener}
          onBlur={this.removeSubmitListener}
        />
      </div>
    )
  }
}


Add.propTypes = {
  onAddTask: PropTypes.func.isRequired,
}

export { Add }