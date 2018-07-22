import React, { Component } from 'react'; 

export let currentId;

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

  
   export const modalForm = (formName,isHide=false) => {
	 
	 if (isHide) {
		 document.getElementById(formName).classList.add("show"); 
	  } else {
		 document.getElementById(formName).classList.remove("show");
	  }
 
 }	

  const confirmClose = () => {
	modalForm('confirmModal',false);
  }
 
 export const modalConfirm = (confirmCloseAndDelete) => {
   return (
   
  <div className="modal fade" id="confirmModal"  role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="confirmModalLabel">Confirm</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" onClick={confirmClose}>&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <label>Are you realy want to delete record?</label>
      </div>
      <div className="modal-footer">
        <button id="confirm-modal-ok" type="button" className="btn btn-primary" onClick={confirmCloseAndDelete} >OK</button>
		<button id="confirm-modal-close" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={confirmClose}>CANCEL</button>
      </div>
    </div>
    </div>
  </div>
  );
 }