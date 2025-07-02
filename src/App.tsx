import { Authenticated, Refine } from "@refinedev/core";
import { ThemeProvider } from "@mui/material/styles";
import {
  ErrorComponent,
  useNotificationProvider,
  ThemedLayoutV2,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Box from "@mui/material/Box";
import { authProvider, dataProvider } from "./providers";
import { Missions, CreateProfile, Admin } from "./pages/dashboard";
import { Header } from "./components";
import {
  LoginPage,
  ForgotPasswordPage,
  RegisterPage,
  UpdatePasswordPage,
} from "./pages/auth";
import theme from "./theme";
import { Sider } from "./components";
import { useUserContext } from "./context";

const App: React.FC = () => {
  const { user } = useUserContext();

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
                <Route
                  index
                  element={user?.role === "admin" ? <Admin /> : <Missions />}
                />
                <Route path="/admin" element={<Admin />} />
                <Route path="/organizations" element={<h1>Organizations</h1>} />
                <Route
                  path="/organizations/:id"
                  element={<h1>Organization Details</h1>}
                />

                <Route path="/educators" element={<h1>Educators</h1>} />
                <Route
                  path="/educators/:id"
                  element={<h1>Educator Details</h1>}
                />

                <Route path="/missions" element={<Missions />} />
                <Route
                  path="/missions/:id"
                  element={<h1>Mission Details</h1>}
                />

                <Route path="/find-educator" element={<h1>Find Educator</h1>} />
                <Route path="/branches" element={<h1>Branches</h1>} />
                <Route path="/chats" element={<h1>Chats</h1>} />
                <Route path="/training" element={<h1>Training</h1>} />
                <Route path="/reports" element={<h1>Reports</h1>} />
                <Route path="/settings" element={<h1>Settings</h1>} />
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
            <DocumentTitleHandler />
          </Refine>
        </RefineSnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
