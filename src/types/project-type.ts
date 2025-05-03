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
  tags: string[];
};

enum StateOfProject {
  Open,
  InProgress,
  Closed,
}
