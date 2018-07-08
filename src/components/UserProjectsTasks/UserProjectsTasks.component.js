import React, { Component } from 'react';
import './UserProjectsTasks.component.css';
import UserProjectsTasksItem from '../UserProjectsTasksItem/UserProjectsTasksItem.component';

class UserProjectsTasks extends Component {
   

 render() {
	
	const { tasks, shortName } = this.props;

    return (
	
	<ul className="tasks-list">
	{tasks.map( (task, index) =>
	
	<UserProjectsTasksItem
	  {...task}
	  shortName={shortName}
	  key={index}
	/>

    )}
	</ul>
   
  );
	
 }
 
}

export default UserProjectsTasks;
