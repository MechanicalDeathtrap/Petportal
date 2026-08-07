// Тематические группы ролей (специальностей) для фильтров и выбора роли.
// Названия ролей должны совпадать с тем, что приходит из /Roles/AllRoles.

export const OTHER_ROLE_NAME = "Другое";

/** Заголовок группы, куда попадают роли, не описанные в категориях. */
export const UNCATEGORIZED_LABEL = "Прочее";

export type RoleCategory = {
  label: string;
  roles: string[];
};

export type RoleGroup = {
  label: string;
  items: string[];
};

export const ROLE_CATEGORIES: RoleCategory[] = [
  {
    label: "Management",
    roles: [
      "Product Manager",
      "Product Owner",
      "Project Manager",
      "Delivery Manager",
      "Engineering Manager",
      "Team Lead",
      "Tech Lead",
      "Scrum Master",
      "Business Analyst",
      "System Architect",
    ],
  },
  {
    label: "Frontend",
    roles: [
      "Frontend Developer",
      "React Developer",
      "Vue Developer",
      "Angular Developer",
      "Frontend Architect",
    ],
  },
  {
    label: "Backend",
    roles: [
      "Backend Developer",
      "Node.js Developer",
      "Python Developer",
      "Java Developer",
      "C#/.NET Developer",
      "Go Developer",
      "PHP Developer",
      "Ruby Developer",
      "Rust Developer",
      "Database Administrator",
    ],
  },
  {
    label: "Fullstack",
    roles: ["Fullstack Developer", "Web Developer"],
  },
  {
    label: "Mobile",
    roles: [
      "Mobile Developer (iOS)",
      "Mobile Developer (Android)",
      "Flutter Developer",
      "React Native Developer",
    ],
  },
  {
    label: "AI / ML / Data",
    roles: [
      "AI Researcher",
      "ML Engineer",
      "MLOps Engineer",
      "LLM Engineer",
      "Prompt Engineer",
      "NLP Engineer",
      "Computer Vision Engineer",
      "Data Scientist",
      "Data Engineer",
      "Data Analyst",
      "BI Analyst",
    ],
  },
  {
    label: "DevOps & Infrastructure",
    roles: [
      "DevOps Engineer",
      "SRE (Site Reliability Engineer)",
      "Platform Engineer",
      "Kubernetes Engineer",
      "Release Engineer",
      "Cloud Architect",
      "Network Engineer",
    ],
  },
  {
    label: "Hardware & IoT",
    roles: [
      "Embedded Systems Engineer",
      "IoT Engineer",
      "Robotics Engineer",
      "Hardware Engineer",
    ],
  },
  {
    label: "Design",
    roles: [
      "UI/UX Designer",
      "Product Designer",
      "UX Researcher",
      "Graphic Designer",
      "Motion Designer",
      "Illustrator",
      "3D Artist",
    ],
  },
  {
    label: "QA & Testing",
    roles: [
      "QA Engineer",
      "QA Automation Engineer",
      "Manual QA Engineer",
      "Performance Engineer",
    ],
  },
  {
    label: "Security",
    roles: [
      "Security Specialist",
      "Security Analyst",
      "DevSecOps Engineer",
      "Penetration Tester",
    ],
  },
  {
    label: "Blockchain & Web3",
    roles: [
      "Blockchain Developer",
      "Smart Contract Developer",
      "Web3 Developer",
    ],
  },
  {
    label: "GameDev & XR",
    roles: [
      "Game Developer",
      "Game Designer",
      "Level Designer",
      "Unity Developer",
      "Unreal Engine Developer",
      "AR/VR Developer",
    ],
  },
  {
    label: "Content & Marketing",
    roles: [
      "Technical Writer",
      "Copywriter",
      "Content Manager",
      "Marketing Specialist",
      "SMM Manager",
      "Community Manager",
      "Localization Specialist",
    ],
  },
];

/**
 * Раскладывает список названий ролей по тематическим группам.
 * Роли, которых нет в справочнике категорий, попадают в группу "Прочее".
 * Роль "Другое" всегда идёт последней в группе "Прочее".
 */
export const groupRoleNames = (roleNames: string[]): RoleGroup[] => {
  const available = new Set(roleNames);
  const used = new Set<string>();
  const groups: RoleGroup[] = [];

  ROLE_CATEGORIES.forEach((category) => {
    const items = category.roles.filter((role) => available.has(role));
    items.forEach((role) => used.add(role));

    if (items.length > 0) {
      groups.push({ label: category.label, items });
    }
  });

  const rest = roleNames
    .filter((role) => !used.has(role) && role !== OTHER_ROLE_NAME)
    .sort((a, b) => a.localeCompare(b, "ru"));

  if (available.has(OTHER_ROLE_NAME)) {
    rest.push(OTHER_ROLE_NAME);
  }

  if (rest.length > 0) {
    groups.push({ label: UNCATEGORIZED_LABEL, items: rest });
  }

  return groups;
};
