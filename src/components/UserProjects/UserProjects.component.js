import React, { Component } from 'react';
import './UserProjects.component.css';
import UserProjectsItem from '../UserProjectsItem/UserProjectsItem.component';

class UserProjects extends Component {
 
 render() {
	
	const { currentUserProjectsTasks, history } = this.props;

   return (
   <div>
   
   {
	  ((currentUserProjectsTasks)&&(currentUserProjectsTasks.length>0))
	  ? <div>
	  <ul className="projects-list">
	  <div className="project--title">
	    Projects
	  </div>
	  {currentUserProjectsTasks.map((project,index) => {
	  return (
		 <UserProjectsItem
			  {...project}
			  key={index}
             		 
		  />
		  )
	  } 
	  )}
      </ul>
	  </div>
	  : null
   }
   </div>
  );
	
 }
 
}

export default UserProjects;
