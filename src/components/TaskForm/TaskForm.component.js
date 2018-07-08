import React, { Component } from 'react';
import './TaskForm.component.css';

class TaskForm extends Component {

 render() {
	
   const { currentUser, currentTask , history } = this.props;

   return (
    <div>
		User-{currentUser.name}
		<br/>
		Task-{currentTask}
    </div>
  );
	
 }
 
}

export default TaskForm;
