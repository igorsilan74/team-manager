import React, { Component } from 'react';
import './UserProjectsTasks.component.css';
import UserProjectsTasksItem from '../UserProjectsTasksItem/UserProjectsTasksItem.component';
import { List } from "react-virtualized";

class UserProjectsTasks extends Component {

renderRow = ({ index, key, style }) => {

  return (
    <div key={key} style={style}>	

      <UserProjectsTasksItem
        {...this.props.tasks[index]}
        projectName={this.props.projectName}
        task={this.props.tasks[index]}
      />
    </div>
  );

}   

render() {

  const { tasks } = this.props;

  const listHeight = 495;
  const rowHeight = 33;
  const rowWidth = 1100;

  return (

    <ul className="tasks-list">

      <List
        {...this.props}
        width={rowWidth}
        height={listHeight}
        rowHeight={rowHeight}
        rowRenderer={this.renderRow}
        rowCount={tasks.length} />

    </ul>

  );

}

}

export default UserProjectsTasks;
