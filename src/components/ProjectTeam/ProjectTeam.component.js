import React, { Component } from 'react';
import './ProjectTeam.component.css';
import ProjectTeamItem from '../ProjectTeamItem/ProjectTeamItem.component';
import { modalConfirm, modalForm, setCurrentId, currentId } from '../../utils';
import { deleteProjectEmployee, addProjectEmployee, setEmployees } from '../../redux/actions';	
import { connect } from 'react-redux';
import { List } from "react-virtualized";

class ProjectTeam extends Component {
	
	constructor(props) {
    	super(props);
    	this.modalConfirmShow = this.modalConfirmShow.bind(this);
		this.confirmCloseAndDelete = this.confirmCloseAndDelete.bind(this);
		
		this.addEmployeeShow = this.addEmployeeShow.bind(this);	
		this.addEmployeeClose = this.addEmployeeClose.bind(this);		
		this.addEmployeeCloseAndSave = this.addEmployeeCloseAndSave.bind(this);		
    	this.forceUpdateHandler = this.forceUpdateHandler.bind(this);		
    }
 
 
	modalConfirmShow(id) {
	  setCurrentId(id);
      modalForm('confirmModal',true);
	}
  
  
	forceUpdateHandler = () => {
      this.forceUpdate();
	}		

	
	confirmCloseAndDelete() {
	  const { dispatch, currentProject } = this.props;  
	  dispatch(deleteProjectEmployee(currentProject.id,currentId));
	  this.forceUpdateHandler();
	  modalForm('confirmModal',false);
	}
  
  
	addEmployeeClose() {
	  modalForm('employeeModal',false);
	}

  
	addEmployeeShow() {
	  const { employees } = this.props;
      modalForm('employeeModal',true);
	}

  
	addEmployeeCloseAndSave() {
	  const { dispatch, currentProject } = this.props;  
	  dispatch(addProjectEmployee(currentProject.id,document.getElementById('employee-select').value));
	  this.forceUpdateHandler();
  
	  modalForm('employeeModal',false);
    }
 
  
	renderRow = ({ index, key, style }) => {
	return (
	  <div key={key} style={style}>	
	
      <ProjectTeamItem
	    {...this.props.currentProjectTeam[index]}
	    key={index}
	    modalConfirmShow={this.modalConfirmShow}
	  />
    
	  </div>
	);
   
	}

 
	componentDidMount() {
	  const { dispatch, employees } = this.props;
	  dispatch(setEmployees());
	}  

 
	render() {
	
	  const { currentProjectTeam,employees } = this.props;
	   
	  const currentProjectEmployeeIds=currentProjectTeam.map((employee) => {
	    return employee.id;
	  });
	   
	  const freeEmployees = employees.filter( employee => (!currentProjectEmployeeIds.includes(employee.id)) );
	   
	  const listHeight = 495;
	  const rowHeight = 33;
	  const rowWidth = 1100;
	   
	  return (
	    <div>
	   
		  {/*modal add user to project*/}   
		  <div className="modal fade" id="employeeModal"  role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
			<div className="modal-dialog" role="document">
			<div className="modal-content">
			  <div className="modal-header">
				<h5 className="modal-title" id="confirmModalLabel">Add employee</h5>
				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true" onClick={this.addEmployeeClose}>&times;</span>
				</button>
			  </div>
			  <div className="modal-body">
			    Select an employee:
			    <select id="employee-select" >
				  {freeEmployees.map( (employee,index) => {
				    return  <option key={index} value={employee.id} >{employee.name+' '+employee.surName}</option>
				  }
				  )}
				</select>
			  </div>
			  <div className="modal-footer">
				<button id="confirm-modal-ok" type="button" className="btn btn-primary" onClick={this.addEmployeeCloseAndSave} >OK</button>
				<button id="confirm-modal-close" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.addEmployeeClose}>CANCEL</button>
			  </div>
			</div>
			</div>
		  </div>
	   
	      {modalConfirm(this.confirmCloseAndDelete)}

		  <div>
		  
		  <div className="container">
		    <div className="row">
			  <div className="project-team--title col-md-1">
			    Team
			  </div>
			  <div className="col-md-3">
			    <button className="btn btn-primary btn-sm" onClick={this.addEmployeeShow}>Add user to project</button>
			  </div>
			</div>
		  </div>
		  <br/>
		  
		  <ul className="project-team">
		  
			<div className="list">
			
			  <div>
				<li className="projects-list-item">
				  <div id="projects-item" className="container">
					<div className="row">
					  <div className="col-md-3 grid">
					    Name
					  </div>
					  <div className="col-md-3 grid"> 
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
			  rowCount={currentProjectTeam.length} />
			</div>
		  
		  </ul>
		  
		  
		  </div>
		
	    </div>
	);
	
	}
 
}


const mapStateToProps = state => {
	
	const {
		employees
	} = state.employee;	  
	 
    const {
		currentProject,
		currentProjectTeam
	} = state.projects;
	 
	return {
		currentProject,
		currentProjectTeam,
		employees
	};
}

export default connect(mapStateToProps)(ProjectTeam);
