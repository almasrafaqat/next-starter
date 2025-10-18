"use client";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import NavigationPills from "@/components/NavigationPills/NavigationPills";
import BasicTabs from "@/components/TabsManager/BasicTabs";
import PageHead from "@/components/ui/PageHead/PageHead";
import React, { useMemo } from "react";
import { CgProfile } from "react-icons/cg";
import Profile from "../ProfileSection/Profile/Profile";
import NavigationRail from "@/components/NavigationRail/NavigationRail";
import { icons } from "@/config/routeIcons";
import CompanyForm from "./Company/CompanyForm/CompanyForm";
import CompanyList from "./Company/CompanyList/CompanyList";

const SettingsSection = () => {
  const RailMenuItems = [
    {
      key: "company",
      label: "Company",
      select: true,
      icon: <CgProfile />,
      component: '',
    },
    {
      key: "create",
      label: "Company",
      select: false,
      icon: <CgProfile />,
      component: CompanyForm,
    },
  ];

  const pillItems = useMemo(
    () => [
      {
        key: "company",
        label: "Company",
        selected: true,
        icon: <icons.INVOICE />,
        component: () => <CompanyForm />,
      },
      {
        key: "smtp",
        label: "SMTP",
        selected: false,
        icon: <icons.INVOICE />,
        component: () => <h1>SMTP</h1>,
      },
      // Add more tabs for items, reminders, etc.
    ],
    []
  );

  return (
    <PageHead title="Manage Settings" index={false}>
      <HeadingTitle sx={{ mb: 2 }} title="Manage Settings" />

     <CompanyList />

      {/* <NavigationPills
        items={pillItems}
        boxShadow={false}
        isScrollable={false}
      /> */}

      <NavigationRail items={RailMenuItems} />
    </PageHead>
  );
};

export default SettingsSection;
