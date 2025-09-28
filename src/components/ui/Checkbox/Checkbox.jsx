"use client"

import * as React from "react"
import { Checkbox as MuiCheckbox, FormControlLabel, styled } from "@mui/material"

const StyledCheckbox = styled(MuiCheckbox)(({ theme }) => ({
  padding: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  "&.Mui-checked": {
    color: theme.palette.primary.main,
  },
  "&:hover": {
    backgroundColor: `${theme.palette.primary.main}10`,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
}))

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: -8,
  "& .MuiFormControlLabel-label": {
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.primary,
  },
}))

export const Checkbox = React.forwardRef(
  ({ className, label, checked, indeterminate, onChange, disabled, ...props }, ref) => {
    const checkboxRef = React.useRef(null)

    React.useImperativeHandle(ref, () => ({
      get indeterminate() {
        return checkboxRef.current?.indeterminate
      },
      set indeterminate(value) {
        if (checkboxRef.current) {
          checkboxRef.current.indeterminate = value
        }
      },
    }))

    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate || false
      }
    }, [indeterminate])

    // If there's a label, wrap in FormControlLabel
    if (label) {
      return (
        <StyledFormControlLabel
          label={label}
          control={
            <StyledCheckbox
              ref={checkboxRef}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              indeterminate={indeterminate}
              {...props}
            />
          }
        />
      )
    }

    // Otherwise just return the checkbox
    return (
      <StyledCheckbox
        ref={checkboxRef}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        indeterminate={indeterminate}
        className={className}
        {...props}
      />
    )
  },
)

Checkbox.displayName = "Checkbox"
