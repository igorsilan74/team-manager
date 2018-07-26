import React, { Component } from 'react';
import './ProjectList.component.css';
import ProjectListItem from '../ProjectListItem/ProjectListItem.component';
import { connect } from 'react-redux';
import { modalForm, sortGrid, sortImage, modalConfirm, modalEditProjectFull } from '../../utils';
import DateTimePicker from 'react-datetime-picker';
import { saveProject, deleteProject, setProjects, addProject, deleteProjectStore, setCurrentProject } from '../../redux/actions';	
import { List } from "react-virtualized";


class ProjectList extends Component {
	
	constructor(props) {
		super(props);
    	this.handleShow = this.handleShow.bind(this);
		this.handleCloseAndSave = this.handleCloseAndSave.bind(this);
    	this.modalConfirmShow = this.modalConfirmShow.bind(this);
		this.confirmCloseAndDelete = this.confirmCloseAndDelete.bind(this);
		this.addProjectShow = this.addProjectShow.bind(this);
    	this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
		
		this.state = {
          creationDate: ((this.props.currentProject)&&(this.props.currentProject.creationDate)) 
					    ? new Date(this.props.currentProject.creationDate) 
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
	
	
	handleCloseAndSave() {
      const { dispatch,currentProject } = this.props;
	  const isoDate=new Date(this.state.creationDate).toISOString();

	  if (this.formState.includes('EDIT')) {
	    const changedProject={
		  ...currentProject,
		  name:document.getElementById('project-name').value,
		  description:document.getElementById('project-description').value,
		  creationDate:isoDate
	    };
	
	    dispatch(saveProject(changedProject));
	  } else {
	    const newProject={
		  name:document.getElementById('project-name').value,
		  description:document.getElementById('project-description').value,
		  creationDate:isoDate
	    };
	    dispatch(addProject(newProject));	
	  }	
	
	  dispatch(setProjects());
	  dispatch(setCurrentProject(currentProject));
      this.forceUpdateHandler();
	  modalForm('editProjectModal',false);

    }
  
	addProjectShow() {
	  this.setFormState('ADD');
	   document.getElementById('project-name').value='';
	   document.getElementById('project-description').value='';
	   this.setState({ creationDate: new Date() });
	 
	   modalForm('editProjectModal',true);
    }

  
	handleShow() {
	  this.setFormState('EDIT');  
	  modalForm('editProjectModal',true);
    }	


	modalConfirmShow() {
      modalForm('confirmModal',true);
    }

	
	confirmCloseAndDelete() {
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
      document.getElementById('project-name').value=nextProps.currentProject.name;
      document.getElementById('project-description').value=nextProps.currentProject.description;
   
      this.setState({
        creationDate: ((nextProps.currentProject)&&(nextProps.currentProject.creationDate)) 
		              ?  new Date(nextProps.currentProject.creationDate) 
					  : new Date()
      });

    }

	
	onCreationDateChange = creationDate => {
	  this.setState({ creationDate });
    }
	
	
	sortClick(columnName) {
	  const { dispatch } = this.props;
      const sortDirection = (this.state.sortBy===columnName) ? ((this.state.sortDirection+1) % 3) : 1;
	  this.setState({sortBy:columnName, sortDirection});
	  dispatch(setProjects());
      this.forceUpdateHandler();
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
			/>
			</div>
		);
   
    }

 
	render() {
	
	  const { projects } = this.props;

	  const listHeight = 495;
      const rowHeight = 33;
      const rowWidth = 1100;

      return (
        <div>

 		  {modalEditProjectFull(this.handleCloseAndSave,this.onCreationDateChange,this.state.creationDate)}
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
						<div className="row">
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
				width={rowWidth}
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