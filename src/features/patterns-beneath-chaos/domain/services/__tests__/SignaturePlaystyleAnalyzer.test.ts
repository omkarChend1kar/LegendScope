import { describe, expect, it } from 'vitest';
import { PlaystyleMockDataSource } from '../../../data/datasources/local/PlaystyleMockDataSource';
import { SignaturePlaystyleAnalyzer } from '../SignaturePlaystyleAnalyzer';

const isFiniteNumber = (value: number): boolean => Number.isFinite(value);

describe('SignaturePlaystyleAnalyzer', () => {
  it('generates a complete playstyle summary using mock participants', async () => {
    const mockSource = new PlaystyleMockDataSource();
    const analyzer = new SignaturePlaystyleAnalyzer();
    const participants = await mockSource.fetchParticipants('tester');

    const summary = analyzer.analyze(participants);

    expect(summary.summary.record.games).toBeGreaterThan(0);
    expect(summary.summary.record.games).toBe(summary.summary.record.wins + summary.summary.record.losses);
    expect(summary.summary.primaryRole.length).toBeGreaterThan(0);
    expect(summary.summary.playstyleLabel.length).toBeGreaterThan(0);

    Object.values(summary.axes).forEach((axis) => {
      expect(axis.score).toBeGreaterThanOrEqual(0);
      expect(axis.score).toBeLessThanOrEqual(100);
      expect(Object.keys(axis.evidence).length).toBeGreaterThan(0);
      Object.values(axis.evidence).forEach((value) => {
        expect(isFiniteNumber(value)).toBe(true);
      });
    });

    expect(summary.efficiency.kda).toBeGreaterThanOrEqual(0);
    expect(summary.efficiency.kp).toBeGreaterThanOrEqual(0);
    expect(summary.efficiency.kp).toBeLessThanOrEqual(1);
    expect(summary.efficiency.damageShare).toBeGreaterThanOrEqual(0);
    expect(summary.efficiency.damageShare).toBeLessThanOrEqual(1);

    expect(['Early', 'Mid', 'Late']).toContain(summary.tempo.bestPhase);

    Object.values(summary.tempo.byPhase).forEach((phase) => {
      expect(isFiniteNumber(phase.killsPer10m)).toBe(true);
      expect(isFiniteNumber(phase.deathsPer10m)).toBe(true);
      expect(isFiniteNumber(phase.dpm)).toBe(true);
      expect(isFiniteNumber(phase.csPerMin)).toBe(true);
      expect(isFiniteNumber(phase.kp)).toBe(true);
    });

    expect(summary.consistency.label.length).toBeGreaterThan(0);
    expect(summary.insights.length).toBeGreaterThan(0);
  });
});
