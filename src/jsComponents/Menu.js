import React from 'react';
import PropTypes from 'prop-types';

class Menu extends React.Component {
  handleCategoryChange = (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() !== 'button') return;
    
    document.querySelectorAll('.menu__choose-category button').forEach(item => item.classList.remove('choosen'));
    target.classList.add('choosen');
    
    const category = target.dataset.value;
    this.props.onChangeCategory(category);
  }
  
  
  render() {
    return(
      <div className='menu'>
        <label className="checkbox">
          <input
            className="checkbox__input"
            type='checkbox'
          />
          <span className="checkbox__checkmark">&#10004;</span>
        </label>
        
        <nav className="menu__choose-category" onClick={this.handleCategoryChange}>
          <button className="menu__all-tasks choosen" data-value="all">All</button>
          <button className="menu__active-tasks" data-value="active">Active</button>
          <button className="menu__completed-tasks" data-value="completed">Completed</button>
        </nav>
        
        <button
          className="menu__clear-completed"
          onClick={this.props.onClearCompleted}
        >
          Clear<br/>completed
        </button>
      </div>
    )
  }
}


Menu.propTypes = {
  onChangeCategory: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}

export {Menu};