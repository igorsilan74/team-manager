import React, { Component } from 'react';
import './EmployeeList.component.css';
import EmployeeListItem from '../EmployeeListItem/EmployeeListItem.component';
import { connect } from 'react-redux';
import { modalForm, sortGrid, sortImage, modalEditEmployee, modalConfirm } from '../../utils';
import { 
  saveEmployee,
  deleteEmployee,
  setEmployees,
  addEmployee,
  deleteEmployeeStore,
  setCurrentUser,
  updateEmployeeStore
} from '../../redux/actionsEmployee';	
import { List, ScrollSync } from "react-virtualized";


class EmployeeList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
      sortBy:'name',
      sortDirection:0,
	  
	  form: {
        employeeName: "",
        positionId:-1,
        position:"",
        locationId:-1,
        location:"",
        skillLevelId:-1,
        skillLevel:"",
        skillId:-1,
        skill:"",
        email:"",
        password:"",
        surName:"",
        birthday: new Date()
      }
	
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

    const isoBirthday=new Date(this.state.form.birthday).toISOString();

    if (this.formState.includes('EDIT')) {
      const changedEmployee={
        ...currentUser,
        name:this.state.form.employeeName,
        birthday:isoBirthday,
        positionId:this.state.form.positionId.toString(),
        position:{
          id:this.state.form.positionId.toString(),
          name:this.state.form.position
        },
        locationId:this.state.form.locationId.toString(),
        location:{
          id:this.state.form.locationId.toString(),
          name:this.state.form.location
        },

        email: this.state.form.email,
        password: this.state.form.password,
        surName: this.state.form.surName,

        skillLevelId:this.state.form.skillLevelId.toString(),
        skillLevel:{
          id:this.state.form.skillLevelId.toString(),
          name:this.state.form.skillLevel
        },

        skillId:this.state.form.skillId.toString(),
        skill:{
          id:this.state.form.skillId.toString(),
          name:this.state.form.skill
        }

      };

	  dispatch(updateEmployeeStore(changedEmployee));	  
      dispatch(saveEmployee(changedEmployee));

    } else {
      const newEmployee={
        name:this.state.form.employeeName,
        avatar: '',
        email: this.state.form.email,
        birthday:isoBirthday,
        password: this.state.form.password,
        surName: this.state.form.surName,
        positionId:this.state.form.positionId.toString(),
        position:{
          id:this.state.form.positionId.toString(),
          name:this.state.form.position
        },
        locationId:this.state.form.locationId.toString(),
        location:{
          id:this.state.form.locationId.toString(),
          name:this.state.form.location
        },
        skillLevelId:this.state.form.skillLevelId.toString(),
        skillId:this.state.form.skillId.toString(),
      };

      dispatch(addEmployee(newEmployee));
	  dispatch(setEmployees(newEmployee));	  
    }

    this.forceUpdateHandler();
    modalForm('editEmployeeModal',false);

  }


  handleShow = () => {
    this.setFormState('EDIT');  
    modalForm('editEmployeeModal',true);
  }	
  
  handleChange = e => {
    const { name, value } = e.target;
	
    this.setState( prevState => ({
      form: {
        ...prevState.form,
        [name]: value,
      }
    }));

  };
  
  handleChangeSelect = e => {
    const { name, value } = e.target;
    const selectedText=e.target.options[e.target.selectedIndex].innerHTML;
    this.setState( prevState => ({
      form: {
        ...prevState.form,
        [name+'Id']: value,
        [name]: selectedText
      }
    }));

  };  

  addEmployeeShow = () => {
    const { dispatch } = this.props;
    this.setFormState('ADD');

    this.setState( prevState => ({
      form: {
        ...prevState.form,
        employeeName: '',
        positionId: 0,
        position: '',
        locationId: 0,
        location: '',
        email: '',
        password: '',
        surName: '',
        skillLevelId: 0,
        skillLevel: '',
        skillId: 0,
        skill: '',
        birthday: new Date()
      }
    }));
	
    this.forceUpdateHandler();
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
    if (!(Object.keys(nextProps.currentUser).length === 0 && nextProps.currentUser.constructor === Object)) {
      console.log(nextProps.currentUser);
	  this.setState( prevState => ({
        form: {
          ...prevState.form,
          employeeName: nextProps.currentUser.name,
          positionId: nextProps.currentUser.positionId,
          position: nextProps.currentUser.position.name,
          locationId: nextProps.currentUser.locationId,
          location: nextProps.currentUser.location.name,
          email: nextProps.currentUser.email,
          password: nextProps.currentUser.password,
          surName: nextProps.currentUser.surName,
          skillLevelId: nextProps.currentUser.skillLevelId,
          skillLevel: nextProps.currentUser.skillLevel.name,
          skillId: nextProps.currentUser.skillId,
          skill: nextProps.currentUser.skill.name,
          birthday: new Date(nextProps.currentUser.birthday)
        }
      }));
    }
    this.forceUpdateHandler();

  }
  

  onBirthdayChange = birthday => {
	
    this.setState( prevState => ({
      form: {
        ...prevState.form,
        birthday,
      }
    }));
  }


renderRow = ( propsRender ) => {
  
  const { index, key, style } = propsRender;
   
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
    <select name="skillLevel" value={this.state.form.skillLevelId} onChange={this.handleChangeSelect} >
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
    <select name="skill" value={this.state.form.skillId} onChange={this.handleChangeSelect} >
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
    <select name="position" value={this.state.form.positionId} onChange={this.handleChangeSelect} >
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
    <select name="location" value={this.state.form.locationId} onChange={this.handleChangeSelect} >
      {locations.map( (location,index) => {
        return  <option key={index} value={location.id} >{location.name}</option>
      }
      )}
    </select>
  );			
}


render() {

  const { employees } = this.props;

  const listHeight = 350;
  const rowHeight = 33;
  const rowWidth = 1100;

  return (
    <div>

      {modalEditEmployee(
        this.handleCloseAndSave,
        this.onBirthdayChange,
        this.handleChange,
        this.state.form,
        this.modalSkillLevels(),
        this.modalSkills(),
        this.modalPositions(),
        this.modalLocations()
      )}

      {modalConfirm(this.confirmCloseAndDelete)}


      {/*employee list*/}   

      <div className="container">
        <div className="row">
          <div className="title-employee-list col-md-1">
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
            width={employees.length >10 ? rowWidth+17 : rowWidth} 
            height={listHeight}
            rowHeight={rowHeight}
            rowRenderer={this.renderRow}
            rowCount={employees.length} 
		  />
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