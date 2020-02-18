import React from 'react';
import PropTypes from 'prop-types'

class Add extends React.PureComponent {
  addSubmitListener = () => {
    document.addEventListener('keypress', this.submit)
  }
  removeSubmitListener = () => {
    document.removeEventListener('keypress', this.submit)
  }
  
  
  submit = (event) => {
    if (event.code !== 'Enter') return;
    
    const input = document.querySelector('.add__text');
    const text = input.value;
    if (text === '') return;
    input.value = '';
    
    this.props.onAddTask(text);
  }


  render() {
    return (
      <div className="add">
        <input
          className="add__text"
          type='text'
          placeholder="What needs to be done?"
          spellCheck="false"
          autoFocus={true}
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