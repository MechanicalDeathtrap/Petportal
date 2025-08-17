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
  executors: string[];
  tags: { id: string; name: string }[];
};

export const StateOfProject = {
  NotSelected: 0,
  Open: 1,
  InProgress: 2,
  Closed: 3,
} as const;

export type StateOfProject = typeof StateOfProject[keyof typeof StateOfProject];

export const getStateLabel = (state: StateOfProject): string => {
  switch(state) {
    case StateOfProject.Open: return "Открытый";
    case StateOfProject.InProgress: return "В процессе";
    case StateOfProject.Closed: return "Закрытый";
    default: return "";
  }
};

export const getStateValue = (label: string): StateOfProject | undefined => {
  switch(label) {
    case "Открытый": return StateOfProject.Open;
    case "В процессе": return StateOfProject.InProgress;
    case "Закрытый": return StateOfProject.Closed;
    default: return undefined;
  }
};