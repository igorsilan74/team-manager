import React, { Component } from 'react';
import './UserProjectsItem.component.css';
import UserProjectsTasks from '../UserProjectsTasks/UserProjectsTasks.component';
import { Link } from 'react-router-dom';

class UserProjectsItem extends Component {
 
 render() {
	
   const { projectId, projectName,shortName, tasks, history } = this.props;

   return (
   <div>
		  <li className="project-items">
		    
			 <Link
			   className="link--project"
			   to={'/projects/'+projectId}
		     >
		    {projectName}
		     </Link>
			
			<UserProjectsTasks
			  tasks={tasks}
			  shortName={shortName}
			/>
			
		  </li>	
	</div>

  );
	
 }
 
}

export default UserProjectsItem;
