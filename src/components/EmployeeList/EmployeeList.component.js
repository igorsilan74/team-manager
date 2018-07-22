import React, { Component } from 'react';
import './EmployeeList.component.css';
import EmployeeListItem from '../EmployeeListItem/EmployeeListItem.component';
import { connect } from 'react-redux';
import { modalForm } from '../../utils';
import DateTimePicker from 'react-datetime-picker';
import { saveEmployee, deleteEmployee, setEmployees, addEmployee, deleteEmployeeStore, setCurrentUser } from '../../redux/actions';	
import { List } from "react-virtualized";


class EmployeeList extends Component {
	
	constructor(props) {
		super(props);
    	this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleCloseAndSave = this.handleCloseAndSave.bind(this);
    	this.modalConfirmShow = this.modalConfirmShow.bind(this);
		this.confirmClose = this.confirmClose.bind(this);
		this.confirmCloseAndDelete = this.confirmCloseAndDelete.bind(this);
		
		this.addEmployeeShow = this.addEmployeeShow.bind(this);
		this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
				
		this.state = {
          birthday: ((this.props.currentUser)&&(this.props.currentUser.birthday)) 
					? new Date(this.props.currentUser.birthday) 
					: new Date()
        }
		
		this.formState='';

   }	
	

	setFormState(state) {
      this.formState = state;
    }	
	
	
	forceUpdateHandler = () => {
      this.forceUpdate();
    }		
	
	
	handleClose() {
	  modalForm('editEmployeeModal',false);
    }
  
  
	handleCloseAndSave() {
		const { dispatch,currentUser } = this.props;

		const positionSelect=document.getElementById('positions-select');
		const locationSelect=document.getElementById('locations-select');
		const skillLevelSelect=document.getElementById('skill-level-select');
		const skillSelect=document.getElementById('skill-select');
		const isoBirthday=new Date(this.state.birthday).toISOString();

		if (this.formState.includes('EDIT')) {
		  const changedEmployee={
			...currentUser,
			name:document.getElementById('employee-name').value,
			birthday:isoBirthday,
			positionId:positionSelect.value,
			position:{
				id:positionSelect.value,
				name:positionSelect.options[positionSelect.selectedIndex].innerHTML
			},
			locationId:locationSelect.value,
			location:{
				id:locationSelect.value,
				name:locationSelect.options[locationSelect.selectedIndex].innerHTML
			},
			
			email: document.getElementById('employee-email').value,
			password: document.getElementById('employee-password').value,
			surName: document.getElementById('employee-surname').value,
			
			skillLevelId:skillLevelSelect.value,
			skillLevel:{
				id:skillLevelSelect.value,
				name:skillLevelSelect.options[skillLevelSelect.selectedIndex].innerHTML
			},
			
			skillId:skillSelect.value,
			skill:{
				id:skillSelect.value,
				name:skillSelect.options[skillSelect.selectedIndex].innerHTML
			}
			
		  };
		
		  dispatch(saveEmployee(changedEmployee));
		
		} else {
		  const newEmployee={
			name:document.getElementById('employee-name').value,
			avatar: '',
			email: document.getElementById('employee-email').value,
			birthday:isoBirthday,
			password: document.getElementById('employee-password').value,
			surName: document.getElementById('employee-surname').value,  
			positionId:document.getElementById('positions-select').value,
			locationId:document.getElementById('locations-select').value,
			skillLevelId:document.getElementById('skill-level-select').value,
			skillId:document.getElementById('skill-select').value
		  };	
		  dispatch(addEmployee(newEmployee));	

		}
		
		dispatch(setEmployees());
		dispatch(setCurrentUser(currentUser));
		this.forceUpdateHandler();
		modalForm('editEmployeeModal',false);

    }

  
	handleShow() {
	  this.setFormState('EDIT');  
	  modalForm('editEmployeeModal',true);
    }	

	
	addEmployeeShow() {
	  const { dispatch } = this.props;
	  this.setFormState('ADD');

	  document.getElementById('employee-name').value='';
	  document.getElementById('positions-select').value=0;
	  document.getElementById('locations-select').value=0;
	  this.setState({ birthday: new Date() });
	  document.getElementById('employee-email').value='';
	  document.getElementById('employee-password').value='';
	  document.getElementById('employee-surname').value='';
	  document.getElementById('skill-level-select').value=0;
	  document.getElementById('skill-select').value=0;	 	
	 
	  modalForm('editEmployeeModal',true);
    }

	
	confirmClose() {
	  modalForm('confirmModal',false);
    }

	
	modalConfirmShow() {
      modalForm('confirmModal',true);
    }

	
    confirmCloseAndDelete() {
	  const { dispatch, currentUser } = this.props;  
	
	  dispatch(deleteEmployee(currentUser.id));
	  dispatch(deleteEmployeeStore(currentUser.id));
	  dispatch(setEmployees());
	  this.forceUpdateHandler();
	  modalForm('confirmModal',false);
    }
  
 
	componentDidMount() {
	  const { dispatch } = this.props;
	  dispatch(setEmployees());
    }  
  
  
    componentWillReceiveProps(nextProps) {
	  document.getElementById('employee-name').value=nextProps.currentUser.name;
	  document.getElementById('positions-select').value=nextProps.currentUser.positionId;
	  document.getElementById('locations-select').value=nextProps.currentUser.locationId;
	  this.setState({
	    birthday: new Date(nextProps.currentUser.birthday)
	  });

	  document.getElementById('employee-email').value=nextProps.currentUser.email;
	  document.getElementById('employee-password').value=nextProps.currentUser.password;
	  document.getElementById('employee-surname').value=nextProps.currentUser.surName;
	  document.getElementById('skill-level-select').value=nextProps.currentUser.skillLevelId;
	  document.getElementById('skill-select').value=nextProps.currentUser.skillId;	 	
    }

	
    onBirthdayChange = birthday => {
	  this.setState({ birthday });
    }
  
  
	renderRow = ({ index, key, style }) => {
	  return (
		<div key={key} style={style}>	
			<EmployeeListItem
			  {...this.props.employees[index]}
			  onEditShow={this.handleShow}
			  modalConfirmShow={this.modalConfirmShow}
			/>
		</div>
	  );
    }

 
	render() {
	
	  const { employees,positions,locations,currentUser,skillLevels, skills } = this.props;

	  const listHeight = 495;
      const rowHeight = 33;
      const rowWidth = 1100;

      return (
	  <div>
   
	  {/*modal edit*/}   
	  <div className="modal fade" id="editEmployeeModal"  role="dialog" aria-labelledby="editEmployeeModalLabel" aria-hidden="true">
		<div className="modal-dialog" role="document">
		<div className="modal-content">
		  <div className="modal-header">
			<h5 className="modal-title" id="editEmployeeModalLabel">Edit</h5>
			<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true" onClick={this.handleClose}>&times;</span>
			</button>
		  </div>
		  <div className="modal-body">
		   
			<div id="employees-item" className="container">
			<div className="row">
			  <div className="col-md-2">
				<label>Name:</label>
			  </div>
			  
			  <div className="col-md-10">
				<input id="employee-name" type="text" placeholder="Enter you name" size="50"></input><br/>
			  </div>
			</div>  

			<div className="row">
			  <div className="col-md-2">
				<label>Surname:</label>
			  </div>
			  
			  <div className="col-md-10">
				<input id="employee-surname" type="text" placeholder="Enter you surname" size="50"></input><br/>
			  </div>
			</div>  

			<div className="row">
			  <div className="col-md-2">
				<label>Email:</label>
			  </div>
			  
			  <div className="col-md-10">
				<input id="employee-email" type="text" placeholder="Enter you email" size="50"></input><br/>
			  </div>
			</div>  
			
			<div className="row">
			  <div className="col-md-2">
				<label>Password:</label>
			  </div>
			  
			  <div className="col-md-10">
				<input id="employee-password" type="password" placeholder="Enter you password" size="50"></input><br/>
			  </div>
			</div>  
			
			<div className="row">
			  <div className="col-md-2">
				<label>Birthday:</label>
			  </div>
			  
			  <div className="col-md-10">
				 <DateTimePicker
				  id='dtpBirthday'
				  onChange={this.onBirthdayChange}
				  value={this.state.birthday}
				 />
			  </div>
			</div>
			
			<div className="row">
			  <div className="col-md-2">
				<label>Skill level:</label>
			  </div>
			  <div className="col-md-10">
				<select id="skill-level-select" >
				 {skillLevels.map( (level,index) => {
				   return  <option key={index} value={level.id} >{level.name}</option>
				 }
				 )}
				</select>
			  </div>
			</div>  

			<div className="row">
			  <div className="col-md-2">
				<label>Skill:</label>
			  </div>
			  <div className="col-md-10">
				 <select id="skill-select" >
					 {skills.map( (skill,index) => {
					   return  <option key={index} value={skill.id} >{skill.name}</option>
					 }
					 )}
				 </select>
			  </div>
			</div> 		


			<div className="row">
			  <div className="col-md-2">
				<label>Position:</label>
			  </div>
			  <div className="col-md-10">
				<select id="positions-select" >
				 {positions.map( (position,index) => {
				   return  <option key={index} value={position.id} >{position.name}</option>
				 }
				 )}
				</select>
			  </div>
			</div>  

			<div className="row">
			  <div className="col-md-2">
				<label>Location:</label>
			  </div>
			  <div className="col-md-10">
				 <select id="locations-select" >
					 {locations.map( (location,index) => {
					   return  <option key={index} value={location.id} >{location.name}</option>
					 }
					 )}
				 </select>
			  </div>
			</div>  

			</div> 
		  </div>
		  <div className="modal-footer">
			<button id="employee-modal-ok" type="button" className="btn btn-primary" onClick={this.handleCloseAndSave} >OK</button>
			<button id="employee-modal-close" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>CANCEL</button>
		  </div>
		</div>
		</div>
	  </div>


	  {/*modal confirm*/}   
	  <div className="modal fade" id="confirmModal"  role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
		<div className="modal-dialog" role="document">
		<div className="modal-content">
		  <div className="modal-header">
			<h5 className="modal-title" id="confirmModalLabel">Confirm</h5>
			<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true" onClick={this.confirmClose}>&times;</span>
			</button>
		  </div>
		  <div className="modal-body">
			<label>Are you realy want to delete record?</label>
		  </div>
		  <div className="modal-footer">
			<button id="confirm-modal-ok" type="button" className="btn btn-primary" onClick={this.confirmCloseAndDelete} >OK</button>
			<button id="confirm-modal-close" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.confirmClose}>CANCEL</button>
		  </div>
		</div>
		</div>
	  </div>
	  

	  {/*employee list*/}   
		
	  <div className="container">
		  <div className="row">
			  <div className="title-employee-list col-md-2">
				Employees
			  </div>
			  <div id="btnAddEmployee" className="col-md-3">
				<button className="btn btn-primary btn-sm" onClick={this.addEmployeeShow}>Add new employee</button>
			  </div>
		  </div>
	  </div>
	  <br/>
		  

	  <ul className="employee-list">
		
		<div className="list">
		
			<div className="table-header">
				<li className="employees-list-item">
				 <div id="employees-item" className="container">
					<div className="row">
					  <div className="col-md-4 grid">
						 Name
					  </div>
					 <div className="col-md-2 grid"> 
						 Position
					 </div>
					 <div className="col-md-2 grid"> 
						 Location
					 </div>
					 <div className="col-md-2 grid"> 
						 Birthday
					 </div>
					 
					 <div className="col-md-1 grid"> 
					 </div>

					 <div className="col-md-1 grid"> 
					 </div>
					 
				  </div> 
				 </div>	 
				 </li>
			</div>	 
		
			<List
			{...this.props}
			width={rowWidth}
			height={listHeight}
			rowHeight={rowHeight}
			rowRenderer={this.renderRow}
			rowCount={employees.length} />
		</div>
		
		
	  </ul>
	  </div>

      );
	
    }
 
}

const mapStateToProps = (state) => {
	
    const {
		locations,
		skills,
		skillLevels,
		positions
	} = state.common;
	 
    const {
		employees,
		currentUser,
	} = state.employee;
	 
    return {
		locations,
		skills,
		skillLevels,
		positions,
		currentUser,
		employees
    };
}

export default connect(mapStateToProps)(EmployeeList);