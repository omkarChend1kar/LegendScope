import type { ConversationStarter, FeatureContext } from '../types/FeatureContext';

export const getConversationStarters = (feature: FeatureContext): ConversationStarter[] => {
  switch (feature) {
    case 'echoes':
      return [
        {
          id: 'echoes-battles',
          title: 'Battles Fought',
          description: 'Review your total game count and activity patterns',
          prompt: 'Battles Fought', // API starter topic
        },
        {
          id: 'echoes-ratio',
          title: 'Claim / Fall Ratio',
          description: 'Understand your win rate and performance trends',
          prompt: 'Claim / Fall Ratio', // API starter topic
        },
        {
          id: 'echoes-streaks',
          title: 'Longest Claim & Fall Streaks',
          description: 'Review your win/loss streaks and momentum',
          prompt: 'Longest Claim & Fall Streaks', // API starter topic
        },
        {
          id: 'echoes-clutch',
          title: 'Clutch Battles',
          description: 'Examine your performance in close games',
          prompt: 'Clutch Battles', // API starter topic
        },
        {
          id: 'echoes-roles',
          title: 'Role Influence',
          description: 'Compare your performance across different roles',
          prompt: 'Role Influence', // API starter topic
        },
      ];

    case 'patterns':
      return [
        {
          id: 'patterns-aggression',
          title: 'Aggression',
          description: 'Analyze your combat initiative and forward positioning',
          prompt: 'Aggression', // API starter topic
        },
        {
          id: 'patterns-survivability',
          title: 'Survivability',
          description: 'Review your ability to avoid deaths and stay alive',
          prompt: 'Survivability', // API starter topic
        },
        {
          id: 'patterns-skirmish',
          title: 'Skirmish Bias',
          description: 'Understand your tendency for small fights vs teamfights',
          prompt: 'Skirmish Bias', // API starter topic
        },
        {
          id: 'patterns-objectives',
          title: 'Objective Impact',
          description: 'Assess your contribution to major objectives',
          prompt: 'Objective Impact', // API starter topic
        },
        {
          id: 'patterns-vision',
          title: 'Vision Discipline',
          description: 'Evaluate your warding and map control',
          prompt: 'Vision Discipline', // API starter topic
        },
        {
          id: 'patterns-utility',
          title: 'Utility',
          description: 'Measure your team support and enabling plays',
          prompt: 'Utility', // API starter topic
        },
        {
          id: 'patterns-tempo',
          title: 'Tempo Profile',
          description: 'Phase-by-phase momentum and economy analysis',
          prompt: 'Tempo Profile', // API starter topic
        },
      ];

    case 'faultlines':
      return [
        {
          id: 'faultlines-cei',
          title: 'Combat Efficiency Index',
          description: 'Analyze your skirmish efficiency and KDA conversion',
          prompt: 'Combat Efficiency Index', // API starter topic
        },
        {
          id: 'faultlines-ori',
          title: 'Objective Reliability Index',
          description: 'Review your major objective impact (Baron, Dragon, Towers)',
          prompt: 'Objective Reliability Index', // API starter topic
        },
        {
          id: 'faultlines-sdi',
          title: 'Survival Discipline Index',
          description: 'Examine death avoidance and positioning discipline',
          prompt: 'Survival Discipline Index', // API starter topic
        },
        {
          id: 'faultlines-vai',
          title: 'Vision & Awareness Index',
          description: 'Assess your ward placement and map awareness',
          prompt: 'Vision & Awareness Index', // API starter topic
        },
        {
          id: 'faultlines-eui',
          title: 'Economy Utilization Index',
          description: 'Review gold conversion into damage and pressure',
          prompt: 'Economy Utilization Index', // API starter topic
        },
        {
          id: 'faultlines-mi',
          title: 'Momentum Index',
          description: 'Understand your streak dynamics and tilt resistance',
          prompt: 'Momentum Index', // API starter topic
        },
        {
          id: 'faultlines-ci',
          title: 'Composure Index',
          description: 'Analyze performance consistency across games',
          prompt: 'Composure Index', // API starter topic
        },
      ];

    case 'arc':
      return [
        {
          id: 'arc-growth',
          title: 'Growth Trajectory',
          description: 'Review your improvement over time',
          prompt: 'Show me my growth trajectory and key improvement milestones.',
        },
        {
          id: 'arc-trends',
          title: 'Performance Trends',
          description: 'Identify long-term patterns',
          prompt: 'What long-term trends do you see in my performance?',
        },
      ];

    case 'voice':
      return [
        {
          id: 'voice-general',
          title: 'General Performance',
          description: 'Broad overview of your gameplay',
          prompt: 'Give me a comprehensive overview of my overall performance.',
        },
        {
          id: 'voice-strategy',
          title: 'Strategic Advice',
          description: 'Get tactical recommendations',
          prompt: 'What strategic improvements should I focus on?',
        },
        {
          id: 'voice-mental',
          title: 'Mental Game',
          description: 'Discuss mindset and tilt management',
          prompt: 'Help me improve my mental game and handle losses better.',
        },
      ];

    default:
      return [
        {
          id: 'default-help',
          title: 'How Can I Help?',
          description: 'Ask me anything about your performance',
          prompt: 'What would you like to know about your League of Legends performance?',
        },
      ];
  }
};
