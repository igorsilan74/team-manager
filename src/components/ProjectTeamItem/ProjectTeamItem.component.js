import React, { Component } from 'react';
import './ProjectTeamItem.component.css';
import { setCurrentUserData } from '../../redux/actions';	
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';

class ProjectTeamItem extends Component {
 
	changeCurrentUser = (id) => {
      const { dispatch } = this.props;
      dispatch(setCurrentUserData(id));
	}
  
	deleteProject = (id) => {
	  this.props.modalConfirmShow(id);
	}
 
	render() {
	
      const { id, name, position ,location , birthday } = this.props;
      const formattedBirthday=formatDate(birthday);
	
	  return (
	    <div>
	      <li className="project-team-items">
				
		    <div id="team-item" className="container">
			  <div className="row">
			    <div id="project-link" className="col-md-3 grid">
				  <Link
				  className="link--employee"
				  to={'/employee/'+id}
				  onClick={() => this.changeCurrentUser(id)}
				  >
				  {name}
				  </Link>
				</div>
				<div className="col-md-3 grid"> 
				  {position.name}
				</div>
					 
				<div className="col-md-2 grid"> 
				  {location.name}
				</div>
					 
				<div className="col-md-2 grid"> 
				  {formattedBirthday}
				</div>
					 
				<div className="col-md-1 grid"> 
				  <Link
				  className="link--employee"
				  to={'/employee/'+id}
				  onClick={() => this.changeCurrentUser(id)}
				  >
				    <button id="btn-edit-project" type="button" className="btn btn-primary btn-sm" >
				      Edit
				    </button>
				  </Link>
				</div>

				<div className="col-md-1 grid"> 
				  <button id="btn-delete-project-employee" type="button" className="btn btn-primary btn-sm" onClick={() => this.deleteProject(id)} >
				    Delete
				  </button>
				</div>
					 
			  </div> 
			</div>	 			
				
		  </li>	
		  
		</div>

	);
	
	}
 
}


const mapStateToProps = state => {
 
	const {
		currentUser
	} = state.employee;
	 
	return {
		currentUser
	};
}

export default connect(mapStateToProps)(ProjectTeamItem);
