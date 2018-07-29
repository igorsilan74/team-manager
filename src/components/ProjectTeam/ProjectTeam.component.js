import React, { Component } from 'react';
import './ProjectTeam.component.css';
import ProjectTeamItem from '../ProjectTeamItem/ProjectTeamItem.component';
import { modalConfirm, modalForm, setCurrentId, currentId, sortGrid, sortImage, modalAddUserToProject } from '../../utils';
import { setEmployees } from '../../redux/actionsEmployee';
import { deleteProjectEmployee, addProjectEmployee } from '../../redux/actionsProjects';
import { connect } from 'react-redux';
import { List } from "react-virtualized";

class ProjectTeam extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sortBy:'name',
      sortDirection:0				
    }

  }


  modalConfirmShow = (id) => {
    setCurrentId(id);
    modalForm('confirmModal',true);
  }


forceUpdateHandler = () => {
  this.forceUpdate();
}		


confirmCloseAndDelete = () => {
  const { dispatch, currentProject } = this.props;  
  dispatch(deleteProjectEmployee(currentProject.id,currentId));
  this.forceUpdateHandler();
  modalForm('confirmModal',false);
}


addEmployeeShow = () => {
  const { employees } = this.props;
  modalForm('employeeModal',true);
}


addEmployeeCloseAndSave = () => {
  const { dispatch, currentProject } = this.props;  
  dispatch(addProjectEmployee(currentProject.id,document.getElementById('employee-select').value));
  this.forceUpdateHandler();

  modalForm('employeeModal',false);
}

sortClick(columnName) {
  const { dispatch } = this.props;
  const sortDirection = (this.state.sortBy===columnName) ? ((this.state.sortDirection+1) % 3) : 1;
  this.setState({sortBy:columnName, sortDirection});
  dispatch(setEmployees());
  this.forceUpdateHandler();
}


renderRow = ({ index, key, style }) => {

  const { currentProjectTeam } = this.props;	
  const { sortBy, sortDirection } = this.state;	
  const sortedTeam = sortGrid([...currentProjectTeam],sortBy,sortDirection);

  return (
    <div key={key} style={style}>	

      <ProjectTeamItem
        {...sortedTeam[index]}
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


modalBody = () => {
  const { currentProjectTeam,employees } = this.props;
  const currentProjectEmployeeIds=currentProjectTeam.map((employee) => {
    return employee.id;
  });

  const freeEmployees = employees.filter( employee => (!currentProjectEmployeeIds.includes(employee.id)) );

  return (	
    <div>
      Select an employee:
      <select id="employee-select" >
        {freeEmployees.map( (employee,index) => {
          return  <option key={index} value={employee.id} >{employee.name+' '+employee.surName}</option>
        }
        )}
      </select>
    </div>
  );			
}


render() {

  const { currentProjectTeam } = this.props;

  const listHeight = 495;
  const rowHeight = 33;
  const rowWidth = 1100;

  return (
    <div>

      {modalAddUserToProject(this.addEmployeeCloseAndSave,this.modalBody())}
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
                    <div className="col-md-3 grid" onClick={() => this.sortClick('name')}>
                      Name{sortImage(this.state.sortDirection,this.state.sortBy,'name')}
                    </div>
                    <div className="col-md-3 grid" onClick={() => this.sortClick('position.name')}> 
                      Position{sortImage(this.state.sortDirection,this.state.sortBy,'position.name')}
                    </div>
                    <div className="col-md-2 grid" onClick={() => this.sortClick('location.name')}> 
                      Location{sortImage(this.state.sortDirection,this.state.sortBy,'location.name')}
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
