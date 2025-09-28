import Paper from "@mui/material/Paper";
import { Box, styled } from "@mui/material";

export const StyledFloatingButton = styled(Box)`
  position: fixed;
  top: 60%;
  right: 32px;
  transform: translateY(-50%);
  z-index: 1000;
`;

export const StyledOverlay = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: auto;
  display: flex;
  align-items: center;
  /* background: rgba(0, 0, 0, 0.08); */
  z-index: 999;
`;

export const StyledRailMenuContainer = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  height: auto;
`;
export const StyledRail = styled(Box, {
  shouldForwardProp: (prop) => prop !== "expanded",
})`
  width: ${({ expanded }) => (expanded ? "220px" : "64px")};
  background: linear-gradient(135deg, #fff 80%, #f7f7fa 100%);
  box-shadow: -2px 0 16px rgba(0, 0, 0, 0.08);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 2;
  border-radius: 16px 0 0 16px;
  border: 1.5px solid #e0e0e0;
  height: auto;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 12px 0 12px 0;
  margin: 12px 0;
`;

export const StyledRailArrow = styled(Box)`
  position: absolute;
  top: -15px;
  left: -16px;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Arrow button styles */
  .MuiIconButton-root {
    background: ${({ theme }) => theme.palette.primary.main};
    color: #fff;
    box-shadow: 0 2px 8px rgba(240, 101, 149, 0.18);
    border: 2px solid #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
    &:hover {
      background: ${({ theme }) => theme.palette.primary.dark};
      box-shadow: 0 4px 16px rgba(240, 101, 149, 0.28);
      transform: scale(1.09);
    }
    svg {
      font-size: 1.6rem;
    }
  }
`;

export const StyledContentPanel = styled(Paper)`
  position: absolute;
  top: 0;
  right: 100%;
  height: 500px;
  min-height: 200px;
  width: 50vw;
  /* width: 300px; */
  overflow-y: auto;
  z-index: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  margin-right: 16px;
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const StyledMobileNav = styled(Box)`
  position: fixed;
  padding: 8px 0;
  bottom: 5px;
  left: 0;
  width: 100vw;
  background: ${({ theme }) => theme.palette.primary.gradientBg};
  border-radius: 50px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-around;
  align-items: center;
  line-height: 1.5;
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};

  :hover {
    background: ${({ theme }) =>theme.palette.primary.gradientBgHover};
    /* padding: 8px 0; */
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
    transition: background 0.3s, box-shadow 0.3s, padding 0.3s;
  }
`;

export const StyledMobileContentPanel = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "mobileheight",
})`
  position: fixed;
  bottom: 50px;
  left: 0;
  width: 100vw;
  height: ${({ mobileheight }) => mobileheight || "70vh"};
  min-height: 200px;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndex.drawer - 1};
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px 8px 15px 15px;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 3px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.primary.main};
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.palette.primary.main} transparent;
`;
