import React, { Component } from 'react';
import './EmployeeList.component.css';
import EmployeeListItem from '../EmployeeListItem/EmployeeListItem.component';
import { connect } from 'react-redux';
import { modalForm, sortGrid, sortImage, modalEditEmployee, modalConfirm  } from '../../utils';
import { saveEmployee, deleteEmployee, setEmployees, addEmployee, deleteEmployeeStore, setCurrentUser } from '../../redux/actionsEmployee';	
import { List } from "react-virtualized";


class EmployeeList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      birthday: ((this.props.currentUser)&&(this.props.currentUser.birthday)) 
        ? new Date(this.props.currentUser.birthday) 
        : new Date(),
      sortBy:'name',
      sortDirection:0
    }

    this.formState='';

  }	


  setFormState(state) {
    this.formState = state;
  }	


  forceUpdateHandler = () => {
    this.forceUpdate();
  }		


  handleCloseAndSave = () => {
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


  handleShow = () => {
    this.setFormState('EDIT');  
    modalForm('editEmployeeModal',true);
  }	


  addEmployeeShow = () => {
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


  modalConfirmShow = () => {
    modalForm('confirmModal',true);
  }


  confirmCloseAndDelete = () => {
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


  sortClick(columnName) {
    const { dispatch } = this.props;
    const sortDirection = (this.state.sortBy===columnName) ? ((this.state.sortDirection+1) % 3) : 1;
    this.setState({sortBy:columnName, sortDirection});
    dispatch(setEmployees());
    this.forceUpdateHandler();
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
  const { employees } = this.props;	
  const { sortBy, sortDirection } = this.state;	

  const sortedEmployees = sortGrid([...employees],sortBy,sortDirection);

  return (
    <div key={key} style={style}>	
      <EmployeeListItem
        {...sortedEmployees[index]}
        onEditShow={this.handleShow}
        modalConfirmShow={this.modalConfirmShow}
      />
    </div>
  );
}

modalSkillLevels() {
  const { skillLevels } = this.props;

  return (	
    <select id="skill-level-select" >
      {skillLevels.map( (level,index) => {
        return  <option key={index} value={level.id} >{level.name}</option>
      }
      )}
    </select>
  );			
}

modalSkills() {
  const { skills } = this.props;

  return  (	
    <select id="skill-select" >
      {skills.map( (skill,index) => {
        return  <option key={index} value={skill.id} >{skill.name}</option>
      }
      )}
    </select>
  );			
}

modalPositions() {
  const { positions } = this.props;

  return (	
    <select id="positions-select" >
      {positions.map( (position,index) => {
        return  <option key={index} value={position.id} >{position.name}</option>
      }
      )}
    </select>
  );			
}


modalLocations() {
  const { locations } = this.props;

  return (	
    <select id="locations-select" >
      {locations.map( (location,index) => {
        return  <option key={index} value={location.id} >{location.name}</option>
      }
      )}
    </select>
  );			
}


render() {

  const { employees } = this.props;

  const listHeight = 495;
  const rowHeight = 33;
  const rowWidth = 1100;

  return (
    <div>

      {modalEditEmployee(this.handleCloseAndSave,this.modalSkillLevels(),this.modalSkills(),
        this.modalPositions(),this.modalLocations(),this.onBirthdayChange,this.state.birthday)}

      {modalConfirm(this.confirmCloseAndDelete)}


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
                  <div className="col-md-4 grid" onClick={() => this.sortClick('name')} >
                    Name{sortImage(this.state.sortDirection,this.state.sortBy,'name')}
                  </div>
                  <div className="col-md-2 grid" onClick={() => this.sortClick('position.name')}> 
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