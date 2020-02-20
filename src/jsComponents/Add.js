import React from 'react';
import PropTypes from 'prop-types'


function Add(props) {
  
  const addSubmitListener = () => {
    document.addEventListener('keypress', submit)
  }
  const removeSubmitListener = () => {
    document.removeEventListener('keypress', submit)
  }
  
  
  const submit = (event) => {
    if (event.keyCode !== 13) return;
    
    const input = document.querySelector('.add__text');
    const text = input.value;
    if (text === '') return;
    input.value = '';
    
    props.onAddTask(text);
  }


  return (
    <div className="add">
      <input
        className="add__text"
        type='text'
        placeholder="What needs to be done?"
        spellCheck="false"
        autoFocus={true}
        onFocus={addSubmitListener}
        onBlur={removeSubmitListener}
      />
    </div>
  )
}


Add.propTypes = {
  onAddTask: PropTypes.func.isRequired,
}

export { Add }