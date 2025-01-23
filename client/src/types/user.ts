export interface DbUser_t {
  id: number;
  phoneNumber: string;
  dob: string;
  location: string;
  rewardCount: number;
}

export interface DbCafe_t {
  id: number;
  name: string;
  email: string;
  rewardFreq: number;
  paidAt: Date;
}

export interface DbReward_t {
  id: number;
  userId: number;
  cafeId: number;
  rewardCount: number;
}

export interface WebUser_t {
  phoneNumber: string;
  dob: Date;
  age: number;
  suburb: string;
  tokenCount: number;
  visitCount: number;
  validRewards: number;
  isSelected: boolean;
}

// Used for filtering data
export const ageMap = new Map([
  ["18-24", [18, 24]],
  ["25-34", [25, 34]],
  ["35-44", [35, 44]],
  ["45-54", [45, 54]],
  ["55-64", [55, 64]],
  ["65+", [65, 150]],
]);

// Used for filtering data
export const visitMap = new Map([
  ["0-9", [0, 9]],
  ["10-19", [10, 19]],
  ["20-29", [20, 29]],
  ["30+", [30, Number.MAX_VALUE]],
]);

// Used for filtering data
export enum months {
  jan,
  feb,
  mar,
  apr,
  may,
  jun,
  jul,
  aug,
  sep,
  oct,
  nov,
  dec,
}
