import React, { Component } from 'react';
import './ProjectList.component.css';
import ProjectListItem from '../ProjectListItem/ProjectListItem.component';
import { connect } from 'react-redux';
import { modalForm, sortGrid, sortImage, modalConfirm, modalEditProject } from '../../utils';
import DateTimePicker from 'react-datetime-picker';
import { saveProject, deleteProject, setProjects, addProject, deleteProjectStore, setCurrentProject, updateProjectStore } from '../../redux/actionsProjects';	
import { List } from "react-virtualized";


class ProjectList extends Component {

  constructor(props) {
    super(props);

    this.state = {

      sortBy:'name',
      sortDirection:0,
	  
	  form: {
	    projectName:'',
        description:'',
        creationDate:new Date()
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
  const { dispatch,currentProject } = this.props;
  const isoDate=new Date(this.state.form.creationDate).toISOString();

  if (this.formState.includes('EDIT')) {
    const changedProject={
      ...currentProject,
      name:this.state.form.projectName,
      description:this.state.form.description,
      creationDate:isoDate
    };

    dispatch(updateProjectStore(changedProject));	
    dispatch(saveProject(changedProject));
	
  } else {
    const newProject={
      name:this.state.form.projectName,
      description:this.state.form.description,
      creationDate:isoDate
    };
    dispatch(addProject(newProject));
    dispatch(setProjects());	
  }	


  this.forceUpdateHandler();
  modalForm('editProjectModal',false);

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

addProjectShow = () => {
  this.setFormState('ADD');
  
  this.setState( prevState => ({
    form: {
      ...prevState.form,
      projectName: '',
      description: '',
      creationDate: new Date()
    }
  }));
  
  this.forceUpdateHandler();
  modalForm('editProjectModal',true);
}


handleShow = () => {
  this.setFormState('EDIT');  
  modalForm('editProjectModal',true);
}	


modalConfirmShow = () => {
  modalForm('confirmModal',true);
}


confirmCloseAndDelete = () => {
  const { dispatch, currentProject } = this.props;  
  dispatch(deleteProject(currentProject.id));
  dispatch(deleteProjectStore(currentProject.id));
  dispatch(setProjects());
  this.forceUpdateHandler();
  modalForm('confirmModal',false);
}


componentDidMount() {
  const { dispatch } = this.props;
  dispatch(setProjects());
}  


componentWillReceiveProps(nextProps) {

  if (!(Object.keys(nextProps.currentProject).length === 0 && nextProps.currentProject.constructor === Object)) {
    this.setState( prevState => ({
      form: {
        ...prevState.form,
        projectName: nextProps.currentProject.name,
        description: nextProps.currentProject.description,
        creationDate: new Date(nextProps.currentProject.creationDate) 
      }
    }));
  }
  this.forceUpdateHandler();
}


sortClick(columnName) {
  const { dispatch } = this.props;
  const sortDirection = (this.state.sortBy===columnName) ? ((this.state.sortDirection+1) % 3) : 1;
  this.setState({sortBy:columnName, sortDirection});
  dispatch(setProjects());
  this.forceUpdateHandler();
}


  onCreationDateChange = creationDate => {
	
    this.setState( prevState => ({
      form: {
        ...prevState.form,
        creationDate,
      }
    }));
  }

renderRow = ({ index, key, style }) => {
  const { projects } = this.props;	
  const { sortBy, sortDirection } = this.state;	
  const sortedProjects = sortGrid([...projects],sortBy,sortDirection);
  return (

    <div key={key} style={style}>	
      <ProjectListItem
        {...sortedProjects[index]}
        onEditShow={this.handleShow}
        modalConfirmShow={this.modalConfirmShow}
        even={index % 2}
      />
    </div>
  );

}


render() {

  const { projects } = this.props;

  const listHeight = 350;
  const rowHeight = 33;
  const rowWidth = 1100;
  
  return (
    <div>

      {modalEditProject(this.handleCloseAndSave,this.onCreationDateChange,this.handleChange,this.state.form)}
      {modalConfirm(this.confirmCloseAndDelete)}

      {/*projects list*/}   
      <div className="container">
        <div className="row">
          <div className="title-list col-md-1">
            Projects
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary btn-sm" onClick={this.addProjectShow}>Add new project</button>
          </div>
        </div>
      </div>
      <br/>

      <ul className="project-list">

        <div className="list">

          <div className="table-header">
            <li className="projects-list-item">
              <div id="projects-item" className="container">
                <div className="row header-row">
                  <div className="col-md-4 grid" onClick={() => this.sortClick('name')}>
                    Name{sortImage(this.state.sortDirection,this.state.sortBy,'name')}
                  </div>
                  <div className="col-md-4 grid" onClick={() => this.sortClick('description')}> 
                    Description{sortImage(this.state.sortDirection,this.state.sortBy,'description')}
                  </div>
                  <div className="col-md-2 grid"> 
                    Creation date
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
            width={projects.length >10 ? rowWidth+17 : rowWidth} 
            height={listHeight}
            rowHeight={rowHeight}
            rowRenderer={this.renderRow}
            rowCount={projects.length} />
        </div>

      </ul>
    </div>
  );

}

}

const mapStateToProps = (state) => {

  const {
    projects,
    currentProject
  } = state.projects;

  return {
    currentProject,
    projects
  };
}


export default connect(mapStateToProps)(ProjectList);