import React, { Component } from 'react';
import './UserForm.component.css';
import UserProjects from '../UserProjects/UserProjects.component';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';
import { connect } from 'react-redux';

class UserForm extends Component {

static defaultProps = {
  imageData: '/img/Default.png'
};


avatarClick = () => {
  const avatarButton = document.getElementById("user-img--input");
  avatarButton.click();
}

handleAvatar = (e) => {
  const files=document.querySelector('[name=user-img--input]').files;
  const img = document.getElementById('user-img');
  const changeImage = this.imageChange;
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    if (!file.type.startsWith('image/')){ continue }
    img.file = file;
    const reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result;changeImage(); }; })(img);
    reader.readAsDataURL(file);
  }

}

skillChange = event => {
  const element=event.target;
  const skillId = element.value;
  const skillName = element.options[element.selectedIndex].innerHTML;
  this.props.onSkillChange(skillId,skillName);
}


skillLevelChange = event => {
  const element=event.target;
  const skillLevelId = element.value;
  const skillLevelName = element.options[element.selectedIndex].innerHTML;
  this.props.onSkillLevelChange(skillLevelId,skillLevelName);
}


imageChange = () => {
  const element=document.getElementById('user-img');
  const imgData=element.src;
  this.props.onAvatarChange(imgData);
}


setCurrentUserProjectsTasks = (currentUserProjects,currentUserTasks) => {
  let currentUserProjectsTasks = [];
  let currentUserProjectsTask={};

  for (let i=0;i<currentUserProjects.length;i++) {
    let tasks=currentUserTasks.filter((task) => { return ((task.projectId === currentUserProjects[i].id)&&(task.statusId!=3)) });
    currentUserProjectsTask={
      projectId:currentUserProjects[i].id,
      projectName:currentUserProjects[i].name,
      shortName:currentUserProjects[i].name.substring(0, 4),
      tasks:tasks.length ? tasks  : []
    };
    currentUserProjectsTasks.push(currentUserProjectsTask);
  }

  return currentUserProjectsTasks;
}


componentWillReceiveProps(nextProps) {
  document.getElementById('skill-select').value=nextProps.currentUser.skillId;
  document.getElementById('skillLevel-select').value=nextProps.currentUser.skillLevelId;
} 

render() {

  const { currentUser, currentUserProjects, currentUserTasks, skillLevels, skills, imageData } = this.props;
  const formattedBirthday=formatDate(currentUser.birthday);
  const currentUserProjectsTasks=this.setCurrentUserProjectsTasks(currentUserProjects,currentUserTasks);

  return (

    <div>

      <form>
        <div id="projects-tasks-item" className="container">

          <div className="row">
            <div id="avatar-block" className="col-md-3">
              <img
                id="user-img"
                alt={`${currentUser.name}-avatar`}
                className="user-image"
                src={ currentUser.avatar || imageData }
                width="60px"
                height="60px"
              />

              <br/>
              <Link
                className="link--avatar"
                to='#'
                onClick={this.avatarClick}
              >
                Choose new avatar
              </Link>

              <input onChange={this.handleAvatar}
                id="user-img--input"
                type="file"
                name="user-img--input"
              />

            </div>

            <div className="col-md-3">
              <div className="row">
                <div className="col-md-6 user-name-block">{currentUser.name}</div>
                <div className="col-md-6 user-name-block">{currentUser.position.name}</div>
              </div>

              <div className="row">
                <div className="col-md-6">Birthday:</div>
                <div className="col-md-6">{formattedBirthday}</div>
              </div>

              <div className="row">
                <div className="col-md-6">Location:</div>
                <div className="col-md-6">{currentUser.location.name}</div>
              </div>
            </div>

            <div className="col-md-2"></div>

            <div className="col-md-2">
              <div className="row skill-block">
                Skill
              </div>
              <div className="row">
                <select id="skill-select" onChange={this.skillChange} >
                  {skills.map( (skill,index) => {
                    return  <option key={index} value={skill.id} >{skill.name}</option>
                  }
                  )}
                </select>
              </div>

              <div className="row"></div>
            </div>

            <div className="col-md-2">
              <div className="row skill-block">
                Level
              </div>
              <div className="row">
                <select id="skillLevel-select" onChange={this.skillLevelChange} >
                  {skillLevels.map( (level,index) => {
                    return <option key={index} value={level.id} >{level.name}</option>
                  }
                  )}
                </select>
              </div>

              <div className="row"></div>
            </div>

          </div> 

          <br/>

          <div className="row">
            <div className="col-md-8">
              <UserProjects
                currentUserProjectsTasks={currentUserProjectsTasks}
              /> 
            </div>
          </div>   

        </div>

      </form>
    </div>
  );

}

}

const mapStateToProps = (state) => {

  const {
    skillLevels,
    skills
  } = state.common;

  const {
    currentUser,
    currentUserProjects,
    currentUserTasks
  } = state.employee;

  return {
    skillLevels,
    skills,
    currentUser,
    currentUserProjects,
    currentUserTasks
  };
}


export default connect(mapStateToProps)(UserForm);
