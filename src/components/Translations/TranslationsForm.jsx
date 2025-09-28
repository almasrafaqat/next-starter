import { locales } from "@/i18n/routing";
import { sanitizeInput } from "@/utils/formHelper";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Typography,
  Badge,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import PrimaryButton from "../ui/Button/PrimaryButton";

const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid #eee;
  min-height: 32px;
  .MuiTabs-indicator {
    height: 3px;
    background: "primary.main";
    border-radius: 2px 2px 0 0;
  }
`;

const StyledTab = styled(Tab)`
  min-width: 100px;
  min-height: 28px !important;
  height: 28px !important;
  text-transform: none;
  font-weight: 500;
  color: #222;
  font-size: 0.85rem;
  padding: 2px 6px !important;
  &.Mui-selected {
    color: "primary.main";
  }
  .MuiTab-iconWrapper {
    margin-right: 4px;
    font-size: 16px;
  }
`;

const LocaleBox = styled(Box)`
  margin-bottom: 32px;
  padding: 16px;
  /* border: 1px solid #eee; */
  border-radius: 8px;

  @media (max-width: 600px) {
    padding: 8px;
    margin-bottom: 16px;
  }
`;

const FieldBox = styled(Box)`
  margin-bottom: 16px;
`;

const StickyActionBox = styled(Box)`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95); /* subtle overlay */
  padding: 16px 0 16px 0;
  z-index: 20;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #eee;
  box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.06);
`;

const TranslationsForm = ({
  fields,
  onChange,
  submitText = "Submit", // <-- Add this prop
  onSubmit, // <-- Add this prop for submit action
  isSaveButton=false,
  translations,
  setTranslations
}) => {


  const [tab, setTab] = useState(0);

  const handleTranslationChange = (lang, field, value) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: sanitizeInput(value) },
    }));
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // Example: show a badge if all fields are filled for that locale
  const isLocaleComplete = (locale) =>
    Object.values(translations[locale] || {}).every((v) => v && v.length > 0);

  const isLocaleFilled = (code) => {
    const t = translations[code] || {};
    // Return true if any field has a non-empty value
    return Object.values(t).some((v) => (v?.trim?.() || "") !== "");
  };

  // Check if all locales are filled for title, altText, and description
  const allLocalesFilled = locales.some((code) => isLocaleFilled(code));

  // Optionally call onChange when translations change
  React.useEffect(() => {
    if (onChange) onChange(translations);
  }, [translations, onChange]);

  // Example submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(translations);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <StyledTabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
          {locales.map((locale, idx) => (
            <StyledTab
              key={locale}
              icon={
                <Badge
                  color="success"
                  variant={isLocaleComplete(locale) ? "dot" : undefined}
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  {isLocaleFilled(locale) ? (
                    <CheckCircleOutlineIcon
                      sx={{ color: "primary.gradientBg", fontSize: 18 }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon
                      sx={{ color: "action.active", fontSize: 18 }}
                    />
                  )}
                </Badge>
              }
              iconPosition="start"
              label={locale.toUpperCase()}
              {...(tab === idx ? { style: { fontWeight: 600 } } : {})}
            />
          ))}
        </StyledTabs>
        {locales.map((locale, idx) =>
          tab === idx ? (
            <LocaleBox key={locale}>
              {fields &&
                fields.map((field) => (
                  <FieldBox key={field.key}>
                    <TextField
                      fullWidth
                      multiline={field.type === "textarea"}
                      minRows={field.type === "textarea" ? 3 : undefined}
                      label={field.label}
                      placeholder={`${
                        field.placeholder
                      } (${locale.toUpperCase()})`}
                      value={translations[locale]?.[field.key] ?? ""}
                      onChange={(e) =>
                        handleTranslationChange(
                          locale,
                          field.key,
                          e.target.value
                        )
                      }
                      variant="outlined"
                      InputProps={{
                        sx: {
                          "&::placeholder": {
                            fontSize: "0.85rem", // smaller placeholder
                            color: "#b0b0b0",
                            opacity: 1,
                          },
                          fontSize: "0.95rem", // input text size
                          borderRadius: "7px",
                          background: "#fafbfc",
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          fontSize: "0.95rem",
                          color: "#888",
                        },
                      }}
                    />
                  </FieldBox>
                ))}
            </LocaleBox>
          ) : null
        )}
      </Box>
      {isSaveButton && (
        <StickyActionBox>
          <PrimaryButton
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              minWidth: 140,
              fontWeight: 600,
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(233,30,99,0.15)",
              px: 3,
              py: 1.2,
              fontSize: "1rem",
              transition: "all 0.2s",
              "&:hover": {
                boxShadow: "0 4px 16px rgba(233,30,99,0.22)",
                transform: "translateY(-2px) scale(1.03)",
              },
            }}
          >
            {submitText}
          </PrimaryButton>
        </StickyActionBox>
      )}
    </form>
  );
};

export default TranslationsForm;
