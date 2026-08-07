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
  /** Дата публикации объявления. */
  createdDate: string | null;
  deadline: string;
  applyingDeadline: string;
  stateOfProject: StateOfProject;
  isBusinessProject: boolean;
  avatarImageBase64: string;
  avatarUrl: string;
  budget: number;
  executors: string[];
  tags: { id: string; name: string }[];
  requiredRoles: RequiredRole[];
};

export type RequiredRole = {
  roleId: string;
  systemRoleName: string | null;
  customRoleName: string | null;
};

/**
 * Состояний у проекта два: идёт набор и архив.
 * NotSelected и InProgress — legacy-значения из старых записей БД,
 * они трактуются как «идёт набор».
 */
export const StateOfProject = {
  NotSelected: 0,
  Open: 1,
  InProgress: 2,
  Archived: 3,
} as const;

export type StateOfProject = typeof StateOfProject[keyof typeof StateOfProject];

export const isArchived = (state?: StateOfProject): boolean =>
  state === StateOfProject.Archived;

export const getStateLabel = (state?: StateOfProject): string =>
  isArchived(state) ? "В архиве" : "Идёт набор";