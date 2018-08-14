import React, { Component } from 'react';
import './UserProjects.component.css';
import UserProjectsItem from '../UserProjectsItem/UserProjectsItem.component';
import { List } from "react-virtualized";

class UserProjects extends Component {

  renderRow = ({ index, key, style }) => {
    const { currentUserProjectsTasks } = this.props;
    return (
      <div key={key} style={style}>	
        <UserProjectsItem
          {...currentUserProjectsTasks[index]}
        />
	  </div>	
    )
            
  } 

  render() {

    const { currentUserProjectsTasks } = this.props;

    const listHeight = 320;
    const rowHeight = 160;
    const rowWidth = 1150;	
	
    return (
      <div>

        <div>
          <ul className="projects-list">
            <div className="project--title">
              Projects
            </div>
            {
			  currentUserProjectsTasks.length ?		
                <List
                  {...this.props}
                  width={rowWidth}
                  height={listHeight}
                  rowHeight={rowHeight}
                  rowRenderer={this.renderRow}
                  rowCount={currentUserProjectsTasks.length} 
                />
			    : <div>No projects for this user</div>
            }	
          </ul>
        </div>

      </div>
    );

  }

}

export default UserProjects;
