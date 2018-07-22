import React, { Component } from 'react';
import './UserProjectsItem.component.css';
import UserProjectsTasks from '../UserProjectsTasks/UserProjectsTasks.component';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadProject, setProjectEmployees, setProjectTasks } from '../../redux/actions';	

class UserProjectsItem extends Component {
 
	changeProject = (id) => {
      const { dispatch } = this.props;
      dispatch(loadProject(id));
	  dispatch(setProjectEmployees(id));
      dispatch(setProjectTasks(id));
	}
  
	render() {
	
      const { projectId, projectName, tasks } = this.props;

      return (
        <div>
		  <li className="project-items">
		    
			<Link
			className="link--project"
			to={'/project/'+projectId}
			onClick={() => this.changeProject(projectId)}
		    >
			 
		    {projectName}
		    </Link>
			
			<UserProjectsTasks
			tasks={tasks}
			projectName={projectName}
			/>
			
		  </li>	
	    </div>

      );
	
	}
 
}


const mapStateToProps = (state) => {
	
	const {
		currentProject
	} = state.projects;
	 
	 
	return {
		currentProject
	};
}


export default connect(mapStateToProps)(UserProjectsItem);
