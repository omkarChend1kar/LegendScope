import type { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { TopBar } from './TopBar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #020617;
  position: relative;
  overflow: hidden;
`;

const ContentArea = styled.main<{ $sidebarCollapsed: boolean }>`
  flex: 1;
  margin-left: ${props => props.$sidebarCollapsed ? '80px' : '288px'};
  position: relative;
  z-index: 2;
  transition: margin-left ${theme.animations.transition.normal};
  min-height: 100vh;
  overflow-x: hidden;
`;

const PageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 73px);
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #0f172a;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #475569;
  }
`;

interface MainLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  sidebarCollapsed?: boolean;
  onChangePlayer?: () => void;
}

export const MainLayout = ({ sidebar, children, sidebarCollapsed = false, onChangePlayer }: MainLayoutProps) => {
  return (
    <LayoutContainer>
      {sidebar}
      <ContentArea $sidebarCollapsed={sidebarCollapsed}>
        <TopBar onChangePlayer={onChangePlayer} />
        <PageContainer>
          {children}
        </PageContainer>
      </ContentArea>
    </LayoutContainer>
  );
};
