import React, { Component, PropTypes } from 'react';
import './TaskBox.component.css';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { Types } from '../../types';

const boxSource = {
  beginDrag(props) {
    return {
	  task: props.task
    };
	
  }
};

class TaskBox extends Component {

	render() {
    
      const { task,  connectDragSource } = this.props;
	
      const style = {
        textDecoration: task.statusId===3 ? 'line-through': 'none'
      };
	
      return connectDragSource(
        <div className="task-box">
		  <div className="title-task-box">
		    {task.description+' '+task.projectName.substring(0,4)+'-'+task.id.substring(0,4)}
		  </div>
		  <div style={style}>
		    {task.name}
		  </div>
		  <br/>
		  {task.employeeName}
		  <br/>
        </div>
      );

	}
 
}

export default DragSource(Types.TASKBOX, boxSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(TaskBox);
