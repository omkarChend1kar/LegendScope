import type { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const LayoutContainer = styled.div`
  display: flex;
  height: 100%;
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
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  
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
}

export const MainLayout = ({ 
  sidebar, 
  children, 
  sidebarCollapsed = false,
}: MainLayoutProps) => {
  return (
    <LayoutContainer>
      {sidebar}
      <ContentArea $sidebarCollapsed={sidebarCollapsed}>
        <PageContainer>
          {children}
        </PageContainer>
      </ContentArea>
    </LayoutContainer>
  );
};
