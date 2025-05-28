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
    university: string;
    specialization: string;
    releaseYear: number;
  }[];
  experience: {
    workPlace: string;
    workPosition: string;
    workYears: number;
  }[];
  stack: {
    programmingLanguage: string;
    programmingLevel: "1" | "2" | "3" | "4" | "5";
    programmingYears: number;
  }[];
};
