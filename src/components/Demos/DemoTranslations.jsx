import { Box } from "@mui/material";
import TranslationsForm from "@/components/Translations/TranslationsForm";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import DisplayMessage from "@/components/DisplayMessage/DisplayMessage";
import { dishFields } from "@/config/modelFields";
import { locales } from "@/i18n/routing";
import { useState } from "react";
import { getInitialTranslations } from "@/utils/translationUtils";

const initialTranslations = getInitialTranslations(locales, dishFields);

const DemoTranslations = () => {
  const [translations, setTranslations] = useState(initialTranslations);

  return (
    <Box>
      <HeadingTitle title="TranslationsForm Component" />
      <DisplayMessage
        type="info"
        title="TranslationsForm"
        description="Multi-locale translation form with tabs for each language. Use for product, category, or content translations."
      />
      <TranslationsForm
        fields={dishFields}
        translations={translations}
        setTranslations={setTranslations}
        submitText="Save"
        isSaveButton
        onChange={(data) => console.log(data)}
        onSubmit={() => alert("Submitted!")}
      />
    </Box>
  );
};

export default DemoTranslations;