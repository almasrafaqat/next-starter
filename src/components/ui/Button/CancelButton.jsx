"use client"
import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"

const CancelButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  textTransform: "none",
  fontWeight: 600,
  padding: theme.spacing(1, 2),
  borderColor: "#f44336",
  color: "#f44336",
  "&:hover": {
    borderColor: "#d32f2f",
    backgroundColor: "rgba(244, 67, 54, 0.04)",
  },
}))

const CancelButton = ({ children, onClick, testId, ...props }) => {
  return (
    <CancelButtonStyled variant="outlined" onClick={onClick} data-testid={testId} {...props}>
      {children}
    </CancelButtonStyled>
  )
}

export default CancelButton