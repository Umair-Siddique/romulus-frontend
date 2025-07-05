import type { IResourceItem, Action } from "@refinedev/core";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Authenticated, Refine } from "@refinedev/core";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import {
  ErrorComponent,
  useNotificationProvider,
  ThemedLayoutV2,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";

import theme from "./theme";
import { Header, Sider } from "#components";
import { authProvider, dataProvider } from "#providers";
import {
  CreateProfile,
  Dashboard,
  Organizations,
  OrganizationDetails,
  Educators,
  EducatorDetails,
  Missions,
  MissionDetails,
  FindEducator,
  Branches,
  Chats,
  Training,
  Reports,
  ReportDetails,
  Settings,
  LoginPage,
  ForgotPasswordPage,
  RegisterPage,
  UpdatePasswordPage,
} from "#pages";

const App = () => {
  const customTitleHandler = () => {
    return "Romulus"; // Default title
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <BrowserRouter>
        <RefineSnackbarProvider>
          <Refine
            routerProvider={routerProvider}
            authProvider={authProvider}
            dataProvider={{ default: dataProvider }}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              breadcrumb: false,
              useNewQueryKeys: true,
            }}
            notificationProvider={useNotificationProvider}
          >
            <Routes>
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2 Header={Header} Sider={Sider}>
                      <Box
                        sx={{
                          maxWidth: "100%",
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
                <Route index element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/organizations" element={<Organizations />} />
                <Route
                  path="/organizations/:id"
                  element={<OrganizationDetails />}
                />

                <Route path="/educators" element={<Educators />} />
                <Route path="/educators/:id" element={<EducatorDetails />} />

                <Route path="/missions" element={<Missions />} />
                <Route path="/missions/:id" element={<MissionDetails />} />

                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/:id" element={<ReportDetails />} />

                <Route path="/find-educator" element={<FindEducator />} />
                <Route path="/branches" element={<Branches />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/training" element={<Training />} />
                <Route path="/settings" element={<Settings />} />
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
                    <ThemedLayoutV2 Header={Header} Sider={Sider}>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler handler={customTitleHandler} />
          </Refine>
        </RefineSnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
