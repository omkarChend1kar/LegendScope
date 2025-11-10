export type FeatureContext = 
  | 'echoes'
  | 'patterns'
  | 'faultlines'
  | 'arc'
  | 'voice';

export interface ConversationStarter {
  id: string;
  title: string;
  description: string;
  prompt: string;
}

export interface FeatureContextData {
  feature: FeatureContext;
  starters: ConversationStarter[];
}
