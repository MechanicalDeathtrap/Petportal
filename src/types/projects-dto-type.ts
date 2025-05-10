import type { Project } from './project-type';  

export type ProjectsDto = { 
    projects: Project[];
    projectsCount: number;
};