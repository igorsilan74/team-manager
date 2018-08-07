import React, { Component } from 'react'; 
import DateTimePicker from 'react-datetime-picker';

export let currentId;
export const scrollBarWidth = 17;

export function setCurrentId(id) {
  currentId = id;
}

export const formatDate = (utcDate) => {

  const aDate=new Date(utcDate);
  let day = aDate.getDate();
  let month = (aDate.getMonth()+1);
  const year = aDate.getFullYear();
  if (month.toString().length < 2) month = '0' + month;
  if (day.toString().length < 2) day = '0' + day;
  const  formattedDate=day+'.'+month+'.'+year;

  return formattedDate;
}


export const sortGrid = (sortedData,sortBy,sortDirection) => {
  if (sortBy.includes('.')) {
    return sortComplicatedGrid(sortedData,
      sortBy.substring(0, sortBy.indexOf('.')),sortBy.substring(sortBy.indexOf('.')+1,sortBy.length),sortDirection);
  }

  if (sortDirection===1) {
    sortedData.sort( (a,b) => {return (a[sortBy].toUpperCase() > b[sortBy].toUpperCase()) ? 1 : ((b[sortBy].toUpperCase() > a[sortBy].toUpperCase()) ? -1 : 0);} );
  } else {
    if (sortDirection===2) {
      sortedData.sort( (a,b) => {return (a[sortBy].toUpperCase() < b[sortBy].toUpperCase()) ? 1 : ((b[sortBy].toUpperCase() < a[sortBy].toUpperCase()) ? -1 : 0);} );
    }
  }
  return sortedData;		
}

const sortComplicatedGrid =(sortedData,sortBy,subField,sortDirection) => {
  if (sortDirection===1) {
    sortedData.sort( (a,b) => {return (a[sortBy][subField].toUpperCase() > b[sortBy][subField].toUpperCase()) ? 1 : ((b[sortBy][subField].toUpperCase() > a[sortBy][subField].toUpperCase()) ? -1 : 0);} );
  } else {
    if (sortDirection===2) {
      sortedData.sort( (a,b) => {return (a[sortBy][subField].toUpperCase() < b[sortBy][subField].toUpperCase()) ? 1 : ((b[sortBy][subField].toUpperCase() < a[sortBy][subField].toUpperCase()) ? -1 : 0);} );
    }
  }
  return sortedData;		
}


export const modalForm = (formName,isHide=false) => {
  if (isHide) {
    document.getElementById(formName).classList.add("show"); 
  } else {
    document.getElementById(formName).classList.remove("show");
  }
}	

export const sortImage = (sortDirection,sortBy,columnName) => {
  return (	
    ((sortDirection>0)&&(sortBy===columnName)) ? 
	  <img
        alt="sort-image"
        className="sort-image"
        src={"/img/sort_"+sortDirection+".png"}
        width="16px"
        height="16px"
      /> 
      : null
  );
}

const modalClose = (name) => {
  modalForm(name,false);
}

export const modalConfirm = (confirmCloseAndDelete) => {
  return (

    <div className="modal fade" id="confirmModal"  role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmModalLabel">Confirm</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" onClick={() => modalClose('confirmModal')}>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <label>Are you realy want to delete record?</label>
          </div>
          <div className="modal-footer">
            <button id="confirm-modal-ok" type="button" className="btn btn-primary" onClick={confirmCloseAndDelete} >OK</button>
            <button id="confirm-modal-close" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => modalClose('confirmModal')}>CANCEL</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const modalAddUserToProject = (addEmployeeCloseAndSave,body) => {
  return (
    <div className="modal fade" id="employeeModal"  role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmModalLabel">Add employee</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" onClick={() => modalClose('employeeModal')}>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {body}
          </div>
          <div className="modal-footer">
            <button id="confirm-modal-ok" type="button" className="btn btn-primary" onClick={addEmployeeCloseAndSave} >OK</button>
            <button id="confirm-modal-close" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => modalClose('employeeModal')}>CANCEL</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const modalEditTask = (taskEditCloseAndSave,handleChangeTaskForm,body,form) => {
  return (

    <div className="modal fade" id="editTaskModal"  role="dialog" aria-labelledby="editTaskModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editTaskModalLabel">Edit</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" onClick={() => modalClose('editTaskModal')}>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div id="projects-item" className="container">

              <div className="row">
                <div className="col-md-2">
                  <label>Select an employee:</label>
                </div>
                <div className="col-md-10">
                  {body}
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <label>Name:</label>
                </div>
                <div className="col-md-10">
                  <input name="taskName" type="text" placeholder="Enter task name" size="50"  value={form.taskName} onChange={handleChangeTaskForm}></input><br/>
                </div>
              </div>  

              <div className="row">
                <div className="col-md-2">
                  <label style={{fontSize:'0.9em'}}>Description:</label>
                </div>
                <div className="col-md-10">
                  <input name="taskDescription" type="text" placeholder="Enter task description" size="50" value={form.taskDescription} onChange={handleChangeTaskForm}></input><br/>
                </div>
              </div>  

            </div> 
          </div>
          <div className="modal-footer">
            <button id="project-modal-ok" type="button" className="btn btn-primary" onClick={taskEditCloseAndSave} >OK</button>
            <button id="project-modal-close" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => modalClose('editTaskModal')}>CANCEL</button>
          </div>
        </div>
      </div>
    </div>

  );
}


export const modalEditProject = (handleCloseAndSave,onCreationDateChange,handleChange,form) => {
  return (

    <div className="modal fade" id="editProjectModal"  role="dialog" aria-labelledby="editProjectModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editProjectModalLabel">Edit</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" onClick={() => modalClose('editProjectModal')}>&times;</span>
            </button>
          </div>
          <div className="modal-body">

            <div id="projects-item" className="container">
              <div className="row">
                <div className="col-md-2">
                  <label>Name:</label>
                </div>

                <div className="col-md-10">
                  <input name="projectName" type="text" placeholder="Enter project name" size="50" value={form.projectName} onChange={handleChange}></input><br/>
                </div>
              </div>  

              <div className="row">
                <div className="col-md-2">
                  <label style={{fontSize:'0.9em'}}>Description:</label>
                </div>

                <div className="col-md-10">
                  <input name="description" type="text" placeholder="Enter project description" size="50" value={form.description} onChange={handleChange}></input><br/>
                </div>
              </div>  

              <div className="row">
                <div className="col-md-2">
                  <label>Creation date:</label>
                </div>

                <div className="col-md-10">
                  <DateTimePicker
                    id='dtpCreationDate'
                    onChange={onCreationDateChange}
                    value={form.creationDate}
                  />
                </div>
              </div>

            </div> 
          </div>
          <div className="modal-footer">
            <button id="project-modal-ok" type="button" className="btn btn-primary" onClick={handleCloseAndSave} >OK</button>
            <button id="project-modal-close" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => modalClose('editProjectModal')}>CANCEL</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export const modalEditEmployee = (handleCloseAndSave,onBirthdayChange,handleChange,form,skillLevels,skills,positions,locations) => {
  return (

    <div className="modal fade" id="editEmployeeModal"  role="dialog" aria-labelledby="editEmployeeModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editEmployeeModalLabel">Edit</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" onClick={() => modalClose('editEmployeeModal')}>&times;</span>
            </button>
          </div>
          <div className="modal-body">

            <div id="employees-item" className="container">
              <div className="row">
                <div className="col-md-2">
                  <label>Name:</label>
                </div>

                <div className="col-md-10">
                  <input name="name" type="text" placeholder="Enter you name" size="50" value={form.name} onChange={handleChange}></input><br/>
                </div>
              </div>  

              <div className="row">
                <div className="col-md-2">
                  <label>Surname:</label>
                </div>

                <div className="col-md-10">
                  <input name="surName" type="text" placeholder="Enter you surname" size="50" value={form.surName} onChange={handleChange}></input><br/>
                </div>
              </div>  

              <div className="row">
                <div className="col-md-2">
                  <label>Email:</label>
                </div>

                <div className="col-md-10">
                  <input name="email" type="text" placeholder="Enter you email" size="50" value={form.email} onChange={handleChange}></input><br/>
                </div>
              </div>  

              <div className="row">
                <div className="col-md-2">
                  <label>Password:</label>
                </div>

                <div className="col-md-10">
                  <input name="password" type="password" placeholder="Enter you password" size="50" value={form.password} onChange={handleChange}></input><br/>
                </div>
              </div>  

              <div className="row">
                <div className="col-md-2">
                  <label>Birthday:</label>
                </div>

                <div className="col-md-10">
                  <DateTimePicker
                    id='dtpBirthday'
                    onChange={onBirthdayChange}
                    value={form.birthday}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <label>Skill level:</label>
                </div>
                <div className="col-md-10">
                  {skillLevels}
                </div>
              </div>  

              <div className="row">
                <div className="col-md-2">
                  <label>Skill:</label>
                </div>
                <div className="col-md-10">
                  {skills}
                </div>
              </div> 		


              <div className="row">
                <div className="col-md-2">
                  <label>Position:</label>
                </div>
                <div className="col-md-10">
                  {positions}
                </div>
              </div>  

              <div className="row">
                <div className="col-md-2">
                  <label>Location:</label>
                </div>
                <div className="col-md-10">
                  {locations}
                </div>
              </div>  

            </div> 
          </div>
          <div className="modal-footer">
            <button id="employee-modal-ok" type="button" className="btn btn-primary" onClick={handleCloseAndSave} >OK</button>
            <button id="employee-modal-close" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => modalClose('editEmployeeModal')}>CANCEL</button>
          </div>
        </div>
      </div>
    </div>

  );
} 