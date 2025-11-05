import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface CardProps {
  variant?: 'default' | 'highlight' | 'purple' | 'transparent';
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  glow?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const getCardVariant = (variant: CardProps['variant']) => {
  switch (variant) {
    case 'highlight':
      return css`
        background: ${theme.colors.gradients.gold};
        border: 2px solid ${theme.colors.primary.lightGold};
        color: ${theme.colors.secondary.darkBlue};
        
        h1, h2, h3, h4, h5, h6 {
          color: ${theme.colors.secondary.darkBlue};
        }
      `;
      
    case 'purple':
      return css`
        background: ${theme.colors.gradients.secondary};
        border: 2px solid ${theme.colors.accent.ethereal};
        color: ${theme.colors.neutral.white};
      `;
      
    case 'transparent':
      return css`
        background: rgba(30, 35, 42, 0.3);
        border: 2px solid rgba(200, 170, 110, 0.2);
        backdrop-filter: blur(10px);
      `;
      
    default:
      return css`
        background: ${theme.colors.gradients.card};
        border: 2px solid ${theme.colors.neutral.darkGray};
      `;
  }
};

const getPadding = (padding: CardProps['padding']) => {
  switch (padding) {
    case 'sm':
      return css`
        padding: ${theme.spacing.sm};
      `;
      
    case 'lg':
      return css`
        padding: ${theme.spacing.xl};
      `;
      
    default:
      return css`
        padding: ${theme.spacing.md};
      `;
  }
};

const StyledCard = styled.div<CardProps>`
  border-radius: ${theme.borderRadius.xl};
  transition: all ${theme.animations.transition.normal};
  position: relative;
  overflow: hidden;
  
  ${({ variant }) => getCardVariant(variant)}
  ${({ padding }) => getPadding(padding)}
  
  ${({ hover }) =>
    hover &&
    css`
      cursor: pointer;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: ${theme.shadows.lg};
      }
    `}
    
  ${({ glow, variant }) =>
    glow &&
    css`
      box-shadow: ${variant === 'purple' ? theme.shadows.blueGlow : theme.shadows.glow};
      
      &:hover {
        box-shadow: ${variant === 'purple' ? 
          '0 0 30px rgba(157, 78, 221, 0.6)' : 
          '0 0 30px rgba(200, 170, 110, 0.6)'};
      }
    `}

  /* Hextech-inspired border effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(
      45deg,
      ${theme.colors.primary.gold},
      ${theme.colors.accent.ethereal},
      ${theme.colors.primary.gold}
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: subtract;
    opacity: 0;
    transition: opacity ${theme.animations.transition.normal};
    pointer-events: none;
  }

  &:hover::before {
    opacity: ${({ hover }) => (hover ? 1 : 0)};
  }
`;

const CardHeader = styled.div`
  margin-bottom: ${theme.spacing.md};
  
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${theme.spacing.xs};
  }
`;

const CardContent = styled.div`
  /* Content styles */
`;

const CardFooter = styled.div`
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid rgba(200, 170, 110, 0.2);
`;

export const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
} = ({
  variant = 'default',
  padding = 'md',
  hover = false,
  glow = false,
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      hover={hover}
      glow={glow}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;