import React, { Component } from 'react';
import './EmployeeListItem.component.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUserData, loadEmployee } from '../../redux/actions';	
import { formatDate } from '../../utils';

class EmployeeListItem extends Component {
   
	changeCurrentUser = (id) => {
      const { dispatch } = this.props;
      dispatch(setCurrentUserData(id));
	}

	
	deleteUser = (id) => {
      const { dispatch } = this.props;
	  dispatch(loadEmployee(id));
	  this.props.modalConfirmShow();
	}

	
	editShow = (id) => {
	  const { dispatch } = this.props;
	  dispatch(loadEmployee(id));
	  this.props.onEditShow();
    }
  
	render() {
	
		const { id, name, position, location, birthday } = this.props;

		const formattedBirthday=formatDate(birthday);
		
		return (

		<li className="employees-list-item">
		 
		  <div id="employees-item" className="container">
			<div className="row">
			  <div id="employee-link" className="col-md-4 grid">
				<Link
				className="link--employee"
				to={'/employee/'+id}
				onClick={() => this.changeCurrentUser(id)}
				>
				{name}
				</Link>
			  </div>
			  <div className="col-md-2 grid"> 
				{position.name}
			  </div>
			  <div className="col-md-2 grid"> 
			   {location.name}
			  </div>
			  <div className="col-md-2 grid"> 
			   {formattedBirthday}
			  </div>
			 
			  <div className="col-md-1 grid"> 
				<button id="btn-edit-employee" type="button" className="btn btn-primary btn-sm" onClick={() => this.editShow(id)}>
				  Edit
				</button>
			  </div>

			  <div className="col-md-1 grid"> 
				<button id="btn-delete-employee" type="button" className="btn btn-primary btn-sm" onClick={() => this.deleteUser(id)} >
				  Delete
				</button>
			  </div>
			 
			</div> 
		  </div>	 
		</li>
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

export default connect(mapStateToProps)(EmployeeListItem);
