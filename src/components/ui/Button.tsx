import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const getButtonStyles = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${theme.colors.gradients.gold};
        color: ${theme.colors.secondary.darkBlue};
        border: 2px solid transparent;
        
        &:hover {
          background: ${theme.colors.primary.lightGold};
          box-shadow: ${theme.shadows.glow};
        }
        
        &:active {
          transform: translateY(1px);
        }
      `;
      
    case 'secondary':
      return css`
        background: ${theme.colors.gradients.card};
        color: ${theme.colors.primary.lightGold};
        border: 2px solid ${theme.colors.primary.gold};
        
        &:hover {
          background: ${theme.colors.primary.gold};
          color: ${theme.colors.secondary.darkBlue};
        }
      `;
      
    case 'accent':
      return css`
        background: ${theme.colors.gradients.secondary};
        color: ${theme.colors.neutral.white};
        border: 2px solid transparent;
        
        &:hover {
          box-shadow: ${theme.shadows.glow};
        }
      `;
      
    case 'ghost':
      return css`
        background: transparent;
        color: ${theme.colors.neutral.lightGray};
        border: 2px solid ${theme.colors.neutral.gray};
        
        &:hover {
          color: ${theme.colors.primary.lightGold};
          border-color: ${theme.colors.primary.gold};
        }
      `;
      
    default:
      return css`
        background: ${theme.colors.gradients.gold};
        color: ${theme.colors.secondary.darkBlue};
        border: 2px solid transparent;
      `;
  }
};

const getSizeStyles = (size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: ${theme.typography.fontSize.sm};
        min-height: 36px;
      `;
      
    case 'lg':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.lg};
        font-size: ${theme.typography.fontSize.lg};
        min-height: 56px;
      `;
      
    default:
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: ${theme.typography.fontSize.base};
        min-height: 44px;
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  
  font-family: ${theme.typography.fontFamily.sans};
  font-weight: ${theme.typography.fontWeight.medium};
  text-decoration: none;
  
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${theme.animations.transition.normal};
  
  position: relative;
  overflow: hidden;
  
  ${({ variant }) => getButtonStyles(variant)}
  ${({ size }) => getSizeStyles(size)}
  
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      
      &:hover {
        background: inherit;
        box-shadow: none;
        transform: none;
      }
    `}
    
  ${({ isLoading }) =>
    isLoading &&
    css`
      cursor: not-allowed;
      
      &:hover {
        transform: none;
      }
    `}

  /* Hextech-inspired hover effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(200, 170, 110, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      isLoading={isLoading}
      disabled={disabled || isLoading}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
};