import { 
  apiUrl,
  employeesUrl,
  employeeUrl,
  employeeProjectsUrl,
  employeeTasksUrl,
  skillLevelsUrl,
  skillsUrl,
  positionsUrl,
  locationsUrl,
  projectsUrl,
  projectUrl,
  tasksUrl,
  taskUrl,
  projectEmployeesUrl,
  projectTasksUrl,
  projectEmployeeUrl

} from '../../urls';

describe('employeesUrl', () => {
  it('should return url with apiUrl', () => {
    expect(`${apiUrl}`+employeesUrl()).toEqual(`${apiUrl}/employees`);
  });
});


describe('employeeUrl', () => {
  it('should return url with apiUrl and index', () => {
    expect(`${apiUrl}`+employeeUrl(3)).toEqual(`${apiUrl}/employees/3`);
  });
});


describe('employeeProjectsUrl', () => {
  it('should return url with apiUrl', () => {
    expect(`${apiUrl}`+employeeProjectsUrl(3)).toEqual(`${apiUrl}/employees/3/projects`);
  });
});


describe('employeeTasksUrl', () => {
  it('should return url with apiUrl', () => {
    expect(`${apiUrl}`+employeeTasksUrl(3)).toEqual(`${apiUrl}/employees/3/tasks`);
  });
});


describe('skillLevelsUrl', () => {
  it('should return url with apiUrl', () => {
    expect(`${apiUrl}`+skillLevelsUrl()).toEqual(`${apiUrl}/skillLevels`);
  });
});


describe('skillsUrl', () => {
  it('should return url with apiUrl', () => {
    expect(`${apiUrl}`+skillsUrl()).toEqual(`${apiUrl}/skills`);
  });
});

describe('positionsUrl', () => {
  it('should return url with apiUrl', () => {
    expect(`${apiUrl}`+positionsUrl()).toEqual(`${apiUrl}/positions`);
  });
});


describe('locationsUrl', () => {
  it('should return url with apiUrl', () => {
    expect(`${apiUrl}`+locationsUrl()).toEqual(`${apiUrl}/locations`);
  });
});


describe('projectsUrl', () => {
  it('should return url with apiUrl', () => {
    expect(`${apiUrl}`+projectsUrl()).toEqual(`${apiUrl}/projects`);
  });
});


describe('projectUrl', () => {
  it('should return url with apiUrl', () => {
    expect(`${apiUrl}`+projectUrl(3)).toEqual(`${apiUrl}/projects/3`);
  });
});


describe('tasksUrl', () => {
  it('should return url with apiUrl', () => {
    expect(`${apiUrl}`+tasksUrl()).toEqual(`${apiUrl}/tasks`);
  });
});


describe('projectEmployeesUrl', () => {
  it('should return url with apiUrl', () => {
    expect(`${apiUrl}`+projectEmployeesUrl(3)).toEqual(`${apiUrl}/projects/3/employees`);
  });
});


describe('projectTasksUrl', () => {
  it('should return url with apiUrl', () => {
    expect(`${apiUrl}`+projectTasksUrl(3)).toEqual(`${apiUrl}/projects/3/tasks`);
  });
});


describe('projectEmployeeUrl', () => {
  it('should return url with apiUrl', () => {
    expect(`${apiUrl}`+projectEmployeeUrl(3,1)).toEqual(`${apiUrl}/projects/3/employees/1`);
  });
});
