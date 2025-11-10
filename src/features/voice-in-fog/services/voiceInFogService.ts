import axios from 'axios';
import type { FeatureContext } from '../types/FeatureContext';

const BASE_URL = import.meta.env.VITE_LEGENDSCOPE_API_BASE_URL ?? 'http://localhost:3000/api';

export interface VoiceInFogRequest {
  puuid: string;
  message: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GeneralChatRequest {
  message: string;
  conversation_history?: ConversationMessage[];
}

export interface VoiceInFogResponse {
  response?: string;      // Standard field for general chat
  reply?: string;         // Field used by general-chat API
  insight?: string;       // Field used by starter topic API
  timestamp?: string;     // Optional timestamp
  starterTopic?: string;  // Echoed back from starter topic API
  modelUsed?: string;     // AI model information
}

export interface StarterTopicRequest {
  puuid: string;
  featureContext: FeatureContext;
  starterTopic: string;
}

class VoiceInFogService {
  async sendMessage(request: VoiceInFogRequest): Promise<VoiceInFogResponse> {
    try {
      const response = await axios.post<VoiceInFogResponse>(
        `${BASE_URL}/voice-in-fog`,
        request,
        {
          timeout: 30000, // 30 seconds for AI processing
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to get response from Voice in the Fog');
      }
      throw error;
    }
  }

  async sendGeneralChat(request: GeneralChatRequest): Promise<VoiceInFogResponse> {
    try {
      console.log('💬 Sending general chat:', {
        message: request.message,
        historyLength: request.conversation_history?.length || 0,
      });

      const response = await axios.post<VoiceInFogResponse>(
        `${BASE_URL}/voice-in-fog/general-chat`,
        request,
        {
          timeout: 30000, // 30 seconds for AI processing
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ General chat response:', response.data);

      // Normalize response - backend uses 'reply' field for general chat
      const normalizedResponse: VoiceInFogResponse = {
        response: response.data.reply || response.data.response || response.data.insight || '',
        timestamp: response.data.timestamp || new Date().toISOString(),
        modelUsed: response.data.modelUsed,
      };

      console.log('✨ Normalized response:', normalizedResponse);

      return normalizedResponse;
    } catch (error) {
      console.error('❌ General chat error:', error);
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || error.message || 'Failed to get response from Voice in the Fog';
        console.error('🔴 Error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
        throw new Error(errorMsg);
      }
      throw error;
    }
  }

  async sendStarterTopic(request: StarterTopicRequest): Promise<VoiceInFogResponse> {
    try {
      // Map feature context to API endpoint
      const featureEndpointMap: Record<FeatureContext, string> = {
        'echoes': 'echoes-of-battle',
        'patterns': 'patterns-beneath-chaos',
        'faultlines': 'faultlines-analysis',
        'arc': 'the-arc',
        'voice': 'voice-in-fog',
      };

      const endpoint = featureEndpointMap[request.featureContext] || 'voice-in-fog';
      const url = `${BASE_URL}/voice-in-fog/${endpoint}/${request.puuid}`;
      
      console.log('🌐 API Request:', {
        url,
        params: { starter_topic: request.starterTopic },
        fullUrl: `${url}?starter_topic=${encodeURIComponent(request.starterTopic)}`
      });
      
      const response = await axios.get<VoiceInFogResponse>(
        url,
        {
          params: {
            starter_topic: request.starterTopic,
          },
          timeout: 30000, // 30 seconds for AI processing
        }
      );
      
      console.log('📦 API Response:', response.data);
      
      // Normalize response - backend uses 'insight' field for starter topics
      const normalizedResponse: VoiceInFogResponse = {
        response: response.data.insight || response.data.response || '',
        timestamp: response.data.timestamp || new Date().toISOString(),
        starterTopic: response.data.starterTopic,
      };
      
      console.log('✨ Normalized Response:', normalizedResponse);
      
      return normalizedResponse;
    } catch (error) {
      console.error('🔴 API Error:', error);
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || error.message || 'Failed to get response from Voice in the Fog';
        console.error('🔴 Axios Error Details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: errorMsg
        });
        throw new Error(errorMsg);
      }
      throw error;
    }
  }
}

export const voiceInFogService = new VoiceInFogService();
