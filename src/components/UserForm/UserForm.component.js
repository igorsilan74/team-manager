import React, { Component } from 'react';
import './UserForm.component.css';
import UserProjects from '../UserProjects/UserProjects.component';
import { Link } from 'react-router-dom';

class UserForm extends Component {

   static defaultProps = {
      imageData: 'img/Default.png'
   };
   
  avatarClick = () => {
    const avatarButton = document.getElementById("user-img--input");
    avatarButton.click();
  }

  handleAvatar = (e) => {
		const files=document.querySelector('[name=user-img--input]').files;
		const img = document.getElementById('user-img');

		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			if (!file.type.startsWith('image/')){ continue }
			img.file = file;
			const reader = new FileReader();
			reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
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
	this.props.onImageChange(imgData);
  }
  

 render() {
	
   const { currentUser, currentUserProjects, currentUserProjectsTasks, history, skillLevels, skills, imageData } = this.props;

   const birthDate=new Date(currentUser.birthday);
   let day = birthDate.getDate();
   let month = (birthDate.getMonth()+1);
   const year = birthDate.getFullYear();
   if (month.length < 2) month = '0' + month;
   if (day.length < 2) day = '0' + day;
   const  formattedBirthday=day+'.'+month+'.'+year;
   
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
			src={currentUser.avatar || imageData }
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
				 const selected = (skill.id===currentUser.skillId) ? ' selected' : '';
			     return  <option key={index} value={skill.id} selected={ selected } >{skill.name}</option>
			 }
			 )}
		 </select>
		 </div>
		 
		 <div className="row">
		 </div>
	 </div>
	 
	 <div className="col-md-2">
		 <div className="row skill-block">
		 Level
		 </div>
		 <div className="row">
		 <select id="skillLevel-select" onChange={this.skillLevelChange} >
			 {skillLevels.map( (level,index) => {
				 const selected = (level.id===currentUser.skillLevelId) ? ' selected' : '';
			     return <option key={index} value={level.id} selected={ selected }>{level.name}</option>
			 }
			 )}
		 </select>
		 </div>

		 <div className="row">
		 </div>
	 </div>

		
 
	 
  </div> 

  <br/>
  
  <div className="row">
    <div className="col-md-8">
     {
	 ((currentUserProjects)&&(currentUserProjects.length>0))
	 ? <UserProjects
       history={history}     
	   currentUserProjectsTasks={currentUserProjectsTasks}
     /> 
	 : null
	 }
	</div>
  </div>   
 
 </div>
 
 </form>
</div>
  );
	
 }
 
}

export default UserForm;
