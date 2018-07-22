import React, { Component } from 'react';
import './ProjectForm.component.css';
import ProjectTeam from '../ProjectTeam/ProjectTeam.component';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';
import { connect } from 'react-redux';

class ProjectForm extends Component {
  
	render() {
	
      const { currentProject } = this.props;
   
      const formattedCreationDate=formatDate(currentProject.creationDate);
   
	  return (
		
	  <div id="project-team" className="container">

	    <div className="row">
		  <div className="col-md-3 project-details">
		    {currentProject.name}
		  </div>
		 
		  <div className="col-md-2">
		    {formattedCreationDate}
		  </div>
		 
		  <div className="col-md-2">
		    <Link
			className="link--task-manager"
			to='/tasks'
			>
			<button className="btn btn-primary btn-sm" >Task manager</button>
		    </Link>
		  </div>
		</div> 
		
		<div className="row">
		  <div className="col-md-7 project-details">
		    {currentProject.description}
		  </div>
		</div>
		
		<br/>
		
		<ProjectTeam
		/> 
		
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


export default connect(mapStateToProps)(ProjectForm);
