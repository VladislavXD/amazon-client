"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useContext } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "@/app/assets/styles/globals.scss";
import { NextUIProvider } from "@nextui-org/react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProvider,
} from "next-themes";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { persistor, store } from "@/app/store/store";
import { AppProps } from "next/app";
import AuthProvider from "@/app/providers/authProvider/AuthProvider";
import { TypeComponentAuthFields } from "@/app/providers/authProvider/authPage.types";
import { ThemeContext } from "@/app/providers/theme-provider";
import Layout from "@/app/components/ui/layout/Layout";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({
  Component,
  pageProps,
}: AppProps & TypeComponentAuthFields) {
  const { theme } = useContext(ThemeContext);
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme={theme}>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider store={store}>
            {/* @ts-ignore */}
            <PersistGate loading={null} persistor={persistor}>
              <AuthProvider Component={{ isOnlyUser: Component.isOnlyUser }}>
                {/* Провайдер для отображения Toast */}
                <HeroUIProvider>
                  {/* Сам Toast для отображения уведомлений */}
                  <ToastProvider placement="bottom-right" />

                  <Component {...pageProps} />
                </HeroUIProvider>
              </AuthProvider>
            </PersistGate>
          </ReduxProvider>
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
