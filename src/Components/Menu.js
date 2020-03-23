import React from 'react';
import PropTypes from 'prop-types';

class Menu extends React.PureComponent {
  handleCategoryChange = (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() !== 'button') return;
    
    document.querySelectorAll('.menu__choose-category button')
      .forEach(button => button.classList.remove('choosen'));
    target.classList.add('choosen');
    
    const category = target.dataset.value;
    this.props.handleChangeCategory(category);
  }
  
  
  handleSelectAll = (event) => {
    const checked = event.target.checked;
    if (checked) {
      this.props.handleSelectAll();
    } else {
      this.props.handleUnselectAll();
    }
  }


  render() {
    return(
      <div className='menu'>
        <label className="checkbox">
          <input
            className="checkbox__input"
            type='checkbox'
            checked={this.props.isAllSelected}
            onChange={this.handleSelectAll}
          />
          <span className="checkbox__checkmark">&#10004;</span>
          <span className="checkbox__select-all-label">Select<br/>all ({this.props.tasksCount})</span>
        </label>
        
        <nav className="menu__choose-category" onClick={this.handleCategoryChange}>
          <button className="menu__all-tasks choosen" data-value="all">All</button>
          <button className="menu__active-tasks" data-value="active">Active</button>
          <button className="menu__completed-tasks" data-value="completed">Completed</button>
        </nav>
        
        <button
          className="menu__clear-completed"
          onClick={this.props.handleClearCompleted}
        >
          Clear<br/>completed
        </button>
      </div>
    )
  }
}


Menu.propTypes = {
  handleChangeCategory: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  handleUnselectAll: PropTypes.func.isRequired,
  isAllSelected: PropTypes.bool.isRequired,
  tasksCount: PropTypes.number.isRequired
}

export {Menu};