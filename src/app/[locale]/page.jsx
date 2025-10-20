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
import DemoManager from "@/components/Demos/DemoManager";
import DocToPdfApp from "../../components/features/DocToPdf/DocToPdf";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import { useDocToPdf } from "@/hooks/featureTools/useDocToPdf";
import { useRouter } from "@/i18n/routing";
import InvoiceSuite from "@/components/Marketing/InvoiceSuite/InvoiceSuite";

export default function Home() {
  const trans = useTranslations("translations");
  const { data: session, status } = useSession();
  const router = useRouter();


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

  const handleReUpload = () => {
    router.push("/tools/doctopdf");
  };

  return (
    <LayoutContainer useContainer={false}>
      <SiteHeader onUpload={handleReUpload} />
       <InvoiceSuite />
     
      {/* <CustomTypography variant="h1" color="theme.primary.main">
        {trans("homePage.title")}
      </CustomTypography> */}
      <DocToPdfApp />
      
      {/* <GoogleButton handleSignIn={handleSignIn} /> */}
      {/* <Navbar group="CUSTOMER" orientation="horizontal" />, */}
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}

      {/* <DemoManager /> */}
      <SiteFooter />
    </LayoutContainer>
  );
}
