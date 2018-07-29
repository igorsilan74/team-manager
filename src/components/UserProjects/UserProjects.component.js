import React, { Component } from 'react';
import './UserProjects.component.css';
import UserProjectsItem from '../UserProjectsItem/UserProjectsItem.component';

class UserProjects extends Component {

  render() {

    const { currentUserProjectsTasks } = this.props;

    return (
      <div>

        <div>
          <ul className="projects-list">
            <div className="project--title">
              Projects
            </div>
            {currentUserProjectsTasks.map((task,index) => {
              return (
                <UserProjectsItem
                  {...task}
                  key={index}
                />
              )
            } 
            )}
          </ul>
        </div>

      </div>
    );

  }

}

export default UserProjects;
