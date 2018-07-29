import React, { Component } from 'react';
import './ProjectListItem.component.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadProject, setProjectEmployees, setProjectTasks } from '../../redux/actionsProjects';	

import { formatDate } from '../../utils';

class ProjectListItem extends Component {

changeProject = (id) => {
  const { dispatch } = this.props;
  dispatch(loadProject(id));
  dispatch(setProjectEmployees(id));
  dispatch(setProjectTasks(id));
}


deleteProject = (id) => {
  const { dispatch } = this.props;
  dispatch(loadProject(id));
  this.props.modalConfirmShow();
}


editShow = (id) => {
  const { dispatch } = this.props;
  dispatch(loadProject(id));
  this.props.onEditShow();
}


render() {

  const { id, name, description, creationDate } = this.props;

  const formattedCreationDate=formatDate(creationDate);


  return (

    <li className="projects-list-item">

      <div id="projects-item" className="container">
        <div className="row">
          <div id="project-link" className="col-md-4 grid">
            <Link
              className="link--project"
              to={'/project/'+id}
              onClick={() => this.changeProject(id)}
            >
              {name}
            </Link>
          </div>
          <div className="col-md-4 grid"> 
            {description}
          </div>
          <div className="col-md-2 grid"> 
            {formattedCreationDate}
          </div>

          <div className="col-md-1 grid"> 
            <button id="btn-edit-project" type="button" className="btn btn-primary btn-sm" onClick={() => this.editShow(id)}>
              Edit
            </button>
          </div>

          <div className="col-md-1 grid"> 
            <button id="btn-delete-project" type="button" className="btn btn-primary btn-sm" onClick={() => this.deleteProject(id)} >
              Delete
            </button>
          </div>
        </div> 
      </div>	 
    </li>
  );
}

}


const mapStateToProps = state => {

  const {
    projects
  } = state.projects;

  return {
    projects
  };
}

export default connect(mapStateToProps)(ProjectListItem);
