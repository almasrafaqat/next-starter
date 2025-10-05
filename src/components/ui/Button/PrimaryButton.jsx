"use client"
import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"

export const PrimaryButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  textTransform: "none",
  fontWeight: 600,
  padding: theme.spacing(1, 2),
  background: theme.palette.primary.gradientBg,
  color: theme.palette.primary.white,
  "&:hover": {
    background: theme.palette.secondary.main,
  },
}))

const PrimaryButton = ({ children, onClick, testId, fullWidth = true, disabled = false, ...otherProps }) => {
  return (
    <PrimaryButtonStyled
      variant="contained"
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      data-testid={testId}
      {...otherProps}
    >
      {children}
    </PrimaryButtonStyled>
  )
}

export default PrimaryButton
