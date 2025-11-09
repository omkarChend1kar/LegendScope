import type { RiotParticipantModel } from '../../models/PatternsSummaryModel';

const CHAMPIONS = [
  'Lee Sin',
  'Viego',
  'Ahri',
  'Lux',
  'KaiSa',
  'Ezreal',
  'Thresh',
  'Sejuani',
  'Aatrox',
  'Jhin',
];

const ROLES = ['JUNGLE', 'MID', 'BOTTOM', 'SUPPORT', 'TOP'];

const pseudoRandom = (seed: number) => {
  let value = Math.sin(seed) * 10000;
  return () => {
    value = Math.sin(value) * 10000;
    return value - Math.floor(value);
  };
};

const buildParticipant = (playerId: string, index: number): RiotParticipantModel => {
  const random = pseudoRandom(index + playerId.length);
  const duration = 1500 + Math.round(random() * 900);
  const role = ROLES[Math.floor(random() * ROLES.length)];
  const champion = CHAMPIONS[Math.floor(random() * CHAMPIONS.length)];
  const kills = Math.round(random() * 12);
  const deaths = Math.round(random() * 8);
  const assists = Math.round(random() * 15);
  const takedowns = kills + assists + Math.round(random() * 4);
  const cs = Math.round(120 + random() * 180);
  const gold = Math.round(11000 + random() * 4000);
  const damage = Math.round(18000 + random() * 22000);
  const damageTaken = Math.round(16000 + random() * 18000);
  const vision = Number((random() * 1.4 + 0.2).toFixed(2));
  const wardsCleared = Math.round(random() * 8);
  const detector = Math.round(random() * 5);
  const mitigation = Math.round(random() * 4000);
  const ccTime = Math.round(random() * 80);
  const soloKills = Math.round(random() * 3);
  const multiKill = Math.max(1, Math.round(random() * 4));
  const turretTakes = Number((random() * 2.4).toFixed(1));
  const epicObjectives = Number((random() * 1.4).toFixed(1));
  const objDamage = Math.round(random() * 25000);
  const xp = Math.round(random() * 22000 + 14000);
  const teamDamageShare = Number((0.16 + random() * 0.12).toFixed(2));
  const kp = Number((0.45 + random() * 0.35).toFixed(2));

  return {
    puuid: `${playerId}-mock-${index}`,
    gameId: `MOCK_${index}`,
    matchId: `MOCK_${index}`,
    championName: champion,
    teamPosition: role,
    individualPosition: role,
    lane: role,
    win: random() > 0.45,
    kills,
    deaths,
    assists,
    soloKills,
    largestMultiKill: multiKill,
    killingSprees: Math.max(1, Math.round(random() * 3)),
    timeCCingOthers: ccTime,
    totalDamageDealtToChampions: damage,
    totalDamageTaken: damageTaken,
    totalDamageShieldedOnTeammates: Math.round(mitigation * 0.25),
    totalHealsOnTeammates: Math.round(mitigation * 0.35),
    goldEarned: gold,
    goldSpent: Math.round(gold * 0.92),
    totalMinionsKilled: cs,
    neutralMinionsKilled: Math.round(random() * 40),
    visionScore: Math.round(vision * (duration / 60)),
    wardsPlaced: Math.round(random() * 10 + 2),
    wardsKilled: wardsCleared,
    detectorWardsPlaced: detector,
    visionWardsBoughtInGame: detector,
    turretTakedowns: turretTakes,
    turretKills: Math.round(turretTakes * 0.6),
    inhibitorTakedowns: Number((turretTakes * 0.35).toFixed(1)),
    damageDealtToTurrets: Math.round(objDamage * 0.4),
    damageDealtToObjectives: objDamage,
    baronKills: Number((epicObjectives * 0.3).toFixed(1)),
    dragonKills: Number((epicObjectives * 0.7).toFixed(1)),
    objectivesStolen: Number((random() * 0.5).toFixed(2)),
    objectivesStolenAssists: Number((random() * 0.7).toFixed(2)),
    totalTimeSpentDead: Math.round(deaths * 22 + random() * 40),
    killsNearEnemyTurret: Math.round(random() * 3),
    outnumberedKills: Math.round(random() * 4),
    killsUnderOwnTurret: Math.round(random() * 2),
    skillshotsDodged: Math.round(random() * 120),
    skillshotsHit: Math.round(random() * 90),
    champExperience: xp,
    gameDuration: duration,
    gameCreation: Date.now() - index * 3600 * 1000,
    firstBloodKill: random() > 0.7,
    firstBloodAssist: random() > 0.65,
    firstTowerKill: random() > 0.55,
    firstTowerAssist: random() > 0.5,
    assistsInEarlyGame: Math.round(random() * 4),
    kda: deaths === 0 ? kills + assists : (kills + assists) / Math.max(deaths, 1),
    challenges: {
      killParticipation: kp,
      teamDamagePercentage: teamDamageShare,
      goldPerMinute: gold / (duration / 60),
      visionScorePerMinute: vision,
      csPerMinute: cs / (duration / 60),
      takedowns,
      takedownsFirstXMinutes: Math.round(takedowns * 0.35),
      takedownsBefore20Minutes: Math.round(takedowns * 0.6),
      deathsBefore10Minutes: Math.round(deaths * 0.35),
      damagePerMinute: damage / (duration / 60),
      effectiveHealAndShielding: mitigation,
      immobilizeAndKillWithAlly: Math.round(random() * 6),
    },
  };
};

export class PlaystyleMockDataSource {
  async fetchParticipants(playerId: string): Promise<RiotParticipantModel[]> {
    const matches = Array.from({ length: 20 }, (_, index) => buildParticipant(playerId, index));
    return matches;
  }
}
