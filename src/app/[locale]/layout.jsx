import { getMessages, getTranslations } from "next-intl/server";
import "../globals.css";
import { getLanguageDirection, routing } from "@/i18n/routing";
import { Almarai, Lato, Roboto } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import MaterialThemeProvider from "../MaterialThemeProvider";
import Layout from "@/components/Layout/Layout";
import StoreProvider from "../StoreProvider";
import AuthProvider from "../AuthProvider";
import DateProvider from "../DateProvider";
import ReactQueryProvider from "../ReactQueryProvider";
import { DrawerProvider } from "@/contexts/DrawerContext";
import { DialogProvider } from "@/contexts/DialogContext";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { NavigationPillProvider } from "@/contexts/NavigationPillContext";
import { TabsProvider } from "@/contexts/TabsContext";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const almarai = Almarai({
  weight: ["300", "400", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-almarai",
});

export async function generateMetadata({ params }) {
  const locale = params.locale;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale)) {
    return null;
  }

  const t = await getTranslations({
    locale,
    namespace: "translations.metadata",
  });

  return {
    title: t("siteTitle"),
    description: t("siteDescription"),
  };
}

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages({ locale });
  const direction = getLanguageDirection(locale);
  return (
    <html
      lang={locale}
      dir={direction}
      className={`
        ${roboto.variable} 
        ${lato.variable} 
        ${almarai.variable}
      `}
    >
      <body className={``}>
        <AuthProvider>
          <StoreProvider>
            <MaterialThemeProvider locale={locale}>
              <NextIntlClientProvider messages={messages} locale={locale}>
                <DialogProvider>
                  <TabsProvider>
                    <NavigationProvider>
                      <NavigationPillProvider>
                        <DrawerProvider>
                          <ReactQueryProvider>
                            <DateProvider>
                              <Layout>{children}</Layout>
                            </DateProvider>
                          </ReactQueryProvider>
                        </DrawerProvider>
                      </NavigationPillProvider>
                    </NavigationProvider>
                  </TabsProvider>
                </DialogProvider>
              </NextIntlClientProvider>
            </MaterialThemeProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
