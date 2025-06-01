export type CabinetSettings = Omit<UserData, "email">;

export type UserData = {
  id: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  country: string;
  town: string;
  phoneNumber: string;
  email: string;
  telegram: string;
  education: {
    id: string;
    university: string;
    specialization: string;
    releaseYear: number;
    isActive: boolean;
  }[];
  experience: {
    id: string;
    workPlace: string;
    workPosition: string;
    workYears: number;
    isActive: boolean;
  }[];
  stack: {
    id: string;
    programmingLanguage: string;
    programmingLevel: "1" | "2" | "3" | "4" | "5";
    programmingYears: number;
    isActive: boolean;
  }[];
};
