import React, { Component } from 'react';
import './UserProjectsTasksItem.component.css';
import { Link } from 'react-router-dom';

class UserProjectsTasksItem extends Component {
   

 render() {
	
	const { id, name, shortName,statusName } = this.props;

    return (
	
     <li className="task-item">
     <div id="projects-tasks-item" className="container">
    	<div className="row">
		  <div className="col-md-2">
			 <Link
			   className="link--task"
			   to={'/task/'+id}
			 >
			 {shortName+'-'+id}
			 </Link>
		  </div>
		 <div className="col-md-4"> 
		 {name}
		 </div>
		 <div className="col-md-2"> 
	     {statusName}
		 </div>
	  </div> 
	 </div>	 
     </li>
   
  );
	
 }
 
}

export default UserProjectsTasksItem;
