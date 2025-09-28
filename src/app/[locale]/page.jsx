"use client";
import GoogleButton from "@/components/GoogleButton/GoogleButton";
import LanguageCurrencyDropdown from "@/components/LanguageCurrencyDropdown/LanguageCurrencyDropdown";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import LayoutContainer from "@/components/LayoutContainer/LayoutContainer";
import Navbar from "@/components/Navbar/Navbar";
import CustomTypography from "@/components/Typography/CustomTypography";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import DemoManager from "@/components/Demos/DemoManager"

export default function Home() {
  const trans = useTranslations("translations");
  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    try {
      const signInResult = await signIn("google", { callbackUrl: "/" });

      console.log("Sign-in result:", signInResult);

      if (signInResult?.error) {
        alert(`Sign-in failed: ${signInResult.error}`);
      }
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <LayoutContainer>
      <CustomTypography variant="h1" color="theme.primary.main">
        {trans("homePage.title")}
      </CustomTypography>
      <GoogleButton handleSignIn={handleSignIn} />
      <Navbar group="CUSTOMER" orientation="horizontal" />,
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <DemoManager />
    </LayoutContainer>
  );
}
