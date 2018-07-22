import React, { Component } from 'react';
import './ProjectList.component.css';
import ProjectListItem from '../ProjectListItem/ProjectListItem.component';
import { connect } from 'react-redux';
import { modalForm } from '../../utils';
import DateTimePicker from 'react-datetime-picker';
import { saveProject, deleteProject, setProjects, addProject } from '../../redux/actions';	
import { List } from "react-virtualized";


class ProjectList extends Component {
	
	constructor(props) {
		super(props);
    	this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleCloseAndSave = this.handleCloseAndSave.bind(this);
    	this.modalConfirmShow = this.modalConfirmShow.bind(this);
		this.confirmClose = this.confirmClose.bind(this);
		this.confirmCloseAndDelete = this.confirmCloseAndDelete.bind(this);
		this.addProjectShow = this.addProjectShow.bind(this);
    	this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
		
		this.state = {
          creationDate: ((this.props.currentProject)&&(this.props.currentProject.creationDate)) 
					    ? new Date(this.props.currentProject.creationDate) 
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
	  modalForm('editProjectModal',false);
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


	confirmClose() {
	  modalForm('confirmModal',false);
    }

	
	modalConfirmShow() {
      modalForm('confirmModal',true);
    }

	
	confirmCloseAndDelete() {
	  const { dispatch, currentProject } = this.props;  
	  dispatch(deleteProject(currentProject.id));
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
  
  
	renderRow = ({ index, key, style }) => {
		return (
			<div key={key} style={style}>	
			<ProjectListItem
			  {...this.props.projects[index]}
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
	   
	      {/*modal edit*/}   
	   
		  <div className="modal fade" id="editProjectModal"  role="dialog" aria-labelledby="editProjectModalLabel" aria-hidden="true">
			<div className="modal-dialog" role="document">
			<div className="modal-content">
			  <div className="modal-header">
				<h5 className="modal-title" id="editProjectModalLabel">Edit</h5>
				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true" onClick={this.handleClose}>&times;</span>
				</button>
			</div>
			<div className="modal-body">
			   
			  <div id="projects-item" className="container">
			  <div className="row">
				<div className="col-md-2">
				  <label>Name:</label>
				</div>
				  
				<div className="col-md-10">
				  <input id="project-name" type="text" placeholder="Enter project name" size="50"></input><br/>
				</div>
			  </div>  

			  <div className="row">
			    <div className="col-md-2">
				  <label>Description:</label>
				</div>
				  
				<div className="col-md-10">
				  <input id="project-description" type="text" placeholder="Enter project description" size="50"></input><br/>
				</div>
			  </div>  
				  
			  <div className="row">
			    <div className="col-md-2">
				  <label>Creation date:</label>
				</div>
				  
				<div className="col-md-10">
				  <DateTimePicker
				  id='dtpCreationDate'
				  onChange={this.onCreationDateChange}
				  value={this.state.creationDate}
				  />
				 </div>
			  </div>
				
			  </div> 
			</div>
			<div className="modal-footer">
			  <button id="project-modal-ok" type="button" className="btn btn-primary" onClick={this.handleCloseAndSave} >OK</button>
			  <button id="project-modal-close" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>CANCEL</button>
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
						  <div className="col-md-4 grid">
							 Name
						  </div>
						  <div className="col-md-4 grid"> 
							 Description
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