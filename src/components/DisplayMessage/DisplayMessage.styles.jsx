import styled from 'styled-components'
import { Theme } from '@mui/material/styles'

const getTypeColors = (type, theme) => {
  const colors = {
    success: {
      bg: theme.palette.success.light,
      border: theme.palette.success.main,
      text: theme.palette.primary.white, // Using custom white color
      icon: theme.palette.success.main
    },
    info: {
      bg: theme.palette.info.light,
      border: theme.palette.info.main,
      text: theme.palette.primary.white, // Using custom white color
      icon: theme.palette.info.main
    },
    warning: {
      bg: theme.palette.warning.light,
      border: theme.palette.warning.main,
      text: theme.palette.primary.white, // Using custom white color
      icon: theme.palette.warning.main
    },
    error: {
      bg: theme.palette.error.light,
      border: theme.palette.error.main,
      text: theme.palette.primary.white, // Using custom white color
      icon: theme.palette.error.main
    }
  }
  return colors[type] || colors.info // Fallback to info if type is not found
}



export const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${({ $isMobile }) => $isMobile ? '12px' : '16px'};
  border-radius: ${({ theme }) => theme.shape?.borderRadius || 4}px;
  background-color: ${({ type, theme }) => getTypeColors(type, theme).bg};
  border: 1px solid ${({ type, theme }) => getTypeColors(type, theme).border};
  color: ${({ type, theme }) => getTypeColors(type, theme).text};
  margin: 8px 0;
  position: relative;
  direction: ${({ $isRtl }) => $isRtl ? 'rtl' : 'ltr'};
  
  ${({ $isMobile }) => $isMobile && `
    flex-direction: column;
    align-items: stretch;
  `}
`

export const IconWrapper = styled.div`
  flex-shrink: 0;
  ${({ $isRtl }) => `margin-${$isRtl ? "left" : "right"}: 12px;`}
  
  svg {
    width: 20px;
    height: 20px;
    color: inherit;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints?.values?.md || 900}px) {
    margin-bottom: 8px;
    ${({ $isRtl }) => `margin-${$isRtl ? "left" : "right"}: 0;`}
  }
`

export const ContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
`

export const Title = styled.h4`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
`

export const Description = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  
  @media (max-width: ${({ theme }) => theme.breakpoints?.values?.md || 900}px) {
    font-size: 13px;
  }
`

export const CloseButton = styled.div`
  position: absolute;
  top: 8px;
  ${({ $isRtl }) => $isRtl ? 'left' : 'right'}: 8px;
  
  .MuiIconButton-root {
    padding: 4px;
    color: inherit;
    opacity: 0.7;
    
    &:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
`

export const ActionButton = styled.div`
  margin-top: 8px;
  
  .MuiButton-root {
    padding: 4px 8px;
    font-size: 0.875rem;
    min-width: 64px;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
`