"use client";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import PageHead from "@/components/ui/PageHead/PageHead";
import CompanyList from "./Company/CompanyList/CompanyList";

const SettingsSection = () => {
  return (
    <PageHead title="Manage Settings" index={false}>
      <HeadingTitle sx={{ mb: 2 }} title="Manage Settings" />

      <CompanyList />
    </PageHead>
  );
};

export default SettingsSection;
