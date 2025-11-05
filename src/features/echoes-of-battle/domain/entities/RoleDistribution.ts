// Domain entity for Role Distribution
export interface RoleData {
  role: string;
  winRate: number;
  games: number;
}

export class RoleDistribution {
  roles: RoleData[];
  
  constructor(roles: RoleData[]) {
    this.roles = roles;
  }

  get primaryRole(): RoleData | undefined {
    return this.roles.reduce((prev, current) => 
      prev.games > current.games ? prev : current
    );
  }

  get highestWinRate(): RoleData | undefined {
    return this.roles.reduce((prev, current) => 
      prev.winRate > current.winRate ? prev : current
    );
  }

  getRoleBarWidth(games: number): number {
    const maxGames = Math.max(...this.roles.map(r => r.games));
    return (games / maxGames) * 100;
  }
}
