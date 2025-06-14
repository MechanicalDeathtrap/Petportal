export type Project = {
  id: string;
  name: string;
  description: string;
  requirements: string;
  teamDescription: string;
  plan: string;
  result: string;
  ownerId: string;
  ownerName: string;
  deadline: string;
  applyingDeadline: string;
  stateOfProject: StateOfProject;
  isBusinessProject: boolean;
  avatarImageBase64: string;
  budget: number;
  tags: { id: string; name: string }[];
};

export const StateOfProject = {
  Open: 0,
  InProgress: 1,
  Closed: 2,
} as const;

export type StateOfProject = typeof StateOfProject[keyof typeof StateOfProject];