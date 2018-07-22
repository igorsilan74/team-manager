export const apiUrl = 'http://localhost:8000';

export const authUrl = () => `${apiUrl}/auth`;

export const employeesUrl = () => `/employees`;
export const employeeUrl = index => `${employeesUrl()}/${index}`;
export const employeeProjectsUrl = index => `${employeesUrl()}/${index}/projects`;
export const employeeTasksUrl = index => `${employeesUrl()}/${index}/tasks`;


export const skillLevelsUrl = () => `/skillLevels`;
export const skillsUrl = () => `/skills`;

export const positionsUrl = () => `/positions`;
export const locationsUrl = () => `/locations`;

export const projectsUrl = () => `/projects`;
export const projectUrl = index => `${projectsUrl()}/${index}`;
export const tasksUrl = () => `/tasks`;
export const taskUrl = index => `${tasksUrl()}/${index}`;

export const projectEmployeesUrl = index => `${projectsUrl()}/${index}${employeesUrl()}`;
export const projectTasksUrl = index => `${projectsUrl()}/${index}${tasksUrl()}`;

export const projectEmployeeUrl = (index,employeeInd) => `${projectEmployeesUrl(index)}/${employeeInd}`;
