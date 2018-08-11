import React, { Component } from 'react';
import './EmployeeList.component.css';
import EmployeeListItem from '../EmployeeListItem/EmployeeListItem.component';
import { connect } from 'react-redux';
import { modalForm, sortGrid, sortImage, modalEditEmployee, modalConfirm, scrollBarWidth } from '../../utils';
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

  static defaultProps = {
    form: {
      name: "",
      positionId:"0",
      position:{
	    id:"0",
        name:""		  
      },
      locationId:"0",
      location:{
	    id:"0",
        name:""		  
      },
      skillLevelId:"0",
      skillLevel:{
        id:"0",
        name:""		  
      },
      skillId:"0",
      skill:{
        id:"0",
        name:""		  
      },
      email:"",
	  avatar: "",
      password:"",
      surName:"",
      birthday: new Date()
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      sortBy:'name',
      sortDirection:0,
	  searchValue:'',
	  filteredEmployees:[],
	  form: {...props.form}
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

 	let employee={
      ...this.state.form,
      birthday:new Date(this.state.form.birthday).toISOString()
    };
	
    if (this.formState.includes('EDIT')) {
      employee={
        ...currentUser,
        ...employee
      };

	  dispatch(updateEmployeeStore(employee));	  
      dispatch(saveEmployee(employee));

    } else {
      dispatch(addEmployee(employee));
	  dispatch(setEmployees(employee));	  
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

  handleChangeSearch = e => {
    const { name, value } = e.target;
	
    this.setState( prevState => ({
      searchValue: value
    }));

  };
  

  handleKeyPress = e => {
    if (e.key === 'Enter') {
	  this.filterEmployee();
    }
  }

  filterEmployee = () => {
    const { searchValue } = this.state;
    const { employees, dispatch } = this.props;
    const filteredEmployees = employees.filter(({ name, surName }) => {
      return (name+surName).toLowerCase().includes(searchValue.toLowerCase())
    }
    );
    this.setState( prevState => ({
      filteredEmployees,
	  searchValue:''
    }));

    dispatch(setEmployees());
    this.forceUpdateHandler();
  }  
  
  handleChangeSelect = e => {
    const { name, value } = e.target;
    const selectedText=e.target.options[e.target.selectedIndex].innerHTML;
    this.setState( prevState => ({
      form: {
        ...prevState.form,
        [name+'Id']: value.toString(),
        [name]:{
		  id:value.toString(),
		  name:selectedText
        }
      }
    }));

  };  

  addEmployeeShow = () => {
    const { dispatch, form } = this.props;
    this.setFormState('ADD');

    this.setState( prevState => ({
      form: { ...form }
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
      const { birthday, ...userData } = nextProps.currentUser;
	  const { employees } = this.props;

	  this.setState( prevState => ({
        form: {
          ...prevState.form,
          ...userData,
          birthday: new Date(birthday)
        },
        filteredEmployees: ((employees.length===0)&&(nextProps.employees.length>0)) ?  [...nextProps.employees] : prevState.filteredEmployees
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
  
  const { sortBy, sortDirection, filteredEmployees, searchValue } = this.state;	

  const sortedEmployees =  sortGrid([...filteredEmployees],sortBy,sortDirection) ;

  return (
    <div className="employees-list-item" key={key} style={style}>	
      {
	    sortedEmployees.length>0 ?	
          <EmployeeListItem
            {...sortedEmployees[index]}
            onEditShow={this.handleShow}
            modalConfirmShow={this.modalConfirmShow}
          />
	    : null
      }	  
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
  const { searchValue, filteredEmployees } = this.state;
  
  const listHeight = 350;
  const rowHeight = 33;
  const rowWidth = 1100;

  const rowCount = filteredEmployees.length;

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
          <div className="col-md-3"></div>
		  <div className="col-md-3">
            <input id="enployeeNameSearch" type="text" placeholder="Enter employee's name" size="35" value={this.state.searchValue}
			  onChange={this.handleChangeSearch}
			  onKeyPress={this.handleKeyPress}
            >
            </input><br/>
          </div>
          <div id="btnFilterEmployee" className="col-md-1">
            <button className="btn btn-primary btn-sm" onClick={this.filterEmployee}>Filter</button>
          </div>		  
          <div className="col-md-1"></div>
        </div>
      </div>
      <br/>


      <ul className="employee-list">
	  
        <div className="list">
          {
	  	    rowCount ?
              <div className="table-header">
                <li className="employees-list-item">
                  <div id="employees-item" className="container">
                    <div className="row header-row">
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
              : <div>
			  No data was found
			  </div>
          } 
          <List
            {...this.props}
            width={rowCount >10 ? rowWidth+scrollBarWidth : rowWidth} 
            height={listHeight}
            rowHeight={rowHeight}
            rowRenderer={this.renderRow}
            rowCount={rowCount} 
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