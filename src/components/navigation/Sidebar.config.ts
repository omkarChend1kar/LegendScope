import { 
  Swords,
  Brain,
  TrendingUp,
  AlertTriangle,
  MessageCircle,
} from 'lucide-react';

export const NAVIGATION_SECTIONS = [
  {
    id: 'echoes',
    title: 'Echoes of Battle',
    subtitle: 'Your legacy in numbers',
    icon: Swords,
    emotion: 'Pride, reflection',
  },
  {
    id: 'patterns',
    title: 'Patterns Beneath the Chaos',
    subtitle: 'Your signature playstyle',
    icon: Brain,
    emotion: 'Curiosity',
  },
  {
    id: 'arc',
    title: 'The Arc',
    subtitle: 'Journey through time',
    icon: TrendingUp,
    emotion: 'Growth',
  },
  {
    id: 'faultlines',
    title: 'Faultlines',
    subtitle: 'Strengths and shadows',
    icon: AlertTriangle,
    emotion: 'Motivation, humility',
  },
  {
    id: 'voice',
    title: 'Voice in the Fog',
    subtitle: 'Your AI companion',
    icon: MessageCircle,
    emotion: 'Inspiration',
  },
] as const;

export type SectionId = typeof NAVIGATION_SECTIONS[number]['id'];
