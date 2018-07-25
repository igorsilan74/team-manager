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

const confirmClose = () => {
  modalForm('confirmModal',false);
}
 
export const sortImage = (sortDirection,sortBy,columnName) => {
  return (	
    ((sortDirection>0)&&(sortBy===columnName))
	? <img
	alt="sort-image"
	className="sort-image"
	src={"/img/sort_"+sortDirection+".png"}
	width="16px"
	height="16px"
	/> 
	: null
  );
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