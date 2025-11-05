// Domain entity for Defining Match
export class DefiningMatch {
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  date: string;
  damage: number;
  gameMode: string;

  constructor(
    championName: string,
    kills: number,
    deaths: number,
    assists: number,
    date: string,
    damage: number,
    gameMode: string
  ) {
    this.championName = championName;
    this.kills = kills;
    this.deaths = deaths;
    this.assists = assists;
    this.date = date;
    this.damage = damage;
    this.gameMode = gameMode;
  }

  get kda(): string {
    return `${this.kills}/${this.deaths}/${this.assists}`;
  }

  get formattedDamage(): string {
    return this.damage.toLocaleString();
  }

  get title(): string {
    return `${this.kda} KDA as ${this.championName}`;
  }
}
