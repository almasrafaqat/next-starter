import CustomerProfile from "@/components/CustomerDashboard/CustomerProfile/CustomerProfile";
import DashboardTemplate from "@/components/DashboardTemplate/DashboardTemplate";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Customer Profile",
  description: "Manage your profile and account settings",
  noIndex: true, // If this is private user area
});
const CustomerProfilePage = () => {
  return (
    <DashboardTemplate group="CUSTOMER">
      <CustomerProfile />
    </DashboardTemplate>
  );
};

export default CustomerProfilePage;
