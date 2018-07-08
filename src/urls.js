export const apiUrl = 'http://localhost:8000';

export const authUrl = () => `${apiUrl}/auth`;

export const employeesUrl = () => `${apiUrl}/employees`;
export const employeeUrl = index => `${employeesUrl()}/${index}`;
export const employeeProjectsUrl = index => `${employeesUrl()}/${index}/projects`;
export const employeeTasksUrl = index => `${employeesUrl()}/${index}/tasks`;
export const skillLevelsUrl = () => `${apiUrl}/skillLevels`;
export const skillsUrl = () => `${apiUrl}/skills`;






