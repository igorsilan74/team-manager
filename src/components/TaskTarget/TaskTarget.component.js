import React, { Component, PropTypes } from 'react';
import './TaskTarget.component.css';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { Types } from '../../types';
import TaskBox from '../TaskBox/TaskBox.component';

const boxTarget = {
  drop(targetProps, monitor,component) {
    let newTask=monitor.getItem().task;
    newTask.statusId=component.props.typeTask;

    switch (component.props.typeTask) {
    case 0:
      newTask.statusName='Todo';
      break;
    case 1:
      newTask.statusName='In progress';
      break;
    case 2:
      newTask.statusName='In test';
      break;
    case 3:
      newTask.statusName='Done';
      break;

    default:
      newTask.statusName='';
    }

    component.props.onDrop(newTask);

    return {
      taskbox: {id:newTask.id}
    };
  }

};

class TaskTarget extends Component {

  render() {

    const { tasks, connectDropTarget, heightTarget, typeTask } = this.props;
    const borderWidth = (typeTask===0) ? 0 : 1;
    const style = {
      height: heightTarget+'px',
	  borderLeft: borderWidth+'px solid gray'
    };

    return connectDropTarget(

      <div className="box-target" style={style} >
        {
          tasks.map((task,index) => {
            return (
              <TaskBox
                {...task}
                task={task}
                key={index}
                heightTarget={heightTarget}
              />
            )
          } 
          )
        }
      </div>

    );

  }

}


export default DropTarget(Types.TASKBOX, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
}))(TaskTarget);
