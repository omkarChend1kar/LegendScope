// Data Transfer Object for Role Distribution
export interface RoleData {
  role: string;
  winRate: number;
  games: number;
}

export interface RoleDistributionModel {
  roles: RoleData[];
}
