export interface Project {
    id: string;
    name: string;
    description: string; // Описание проекта
    ownerId: string;
    deadline: string;
    applyingDeadline: string;
    isOpen: boolean;
  }