import { Authenticated, Refine } from "@refinedev/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  ErrorComponent,
  useNotificationProvider,
  ThemedLayoutV2,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Dashboard from "@mui/icons-material/Dashboard";
import Box from "@mui/material/Box";
import { authProvider } from "./providers";
import { Home, CreateProfile } from "./pages/dashboard";
import { Header, Title } from "./components";
import {
  LoginPage,
  ForgotPasswordPage,
  RegisterPage,
  UpdatePasswordPage,
} from "./pages/auth";
import theme from "./theme";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <BrowserRouter>
        <RefineSnackbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            authProvider={authProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              breadcrumb: false,
              useNewQueryKeys: true,
            }}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "dashboard",
                list: "/",
                meta: {
                  label: "Dashboard",
                  icon: <Dashboard />,
                },
              },
            ]}
          >
            <Routes>
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2 Header={Header} Title={Title}>
                      <Box
                        sx={{
                          maxWidth: "1200px",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      >
                        <Outlet />
                      </Box>
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<Home />} />
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="dashboard" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route
                  path="/update-password"
                  element={<UpdatePasswordPage />}
                />
              </Route>

              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayoutV2 Header={Header} Title={Title}>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </RefineSnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
