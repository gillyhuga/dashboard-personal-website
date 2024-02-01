import {
    Refine,
    Authenticated,
} from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    AuthPage,
    RefineThemes,
} from "@refinedev/antd";
import {
    DashboardOutlined,
} from "@ant-design/icons";
import { dataProvider } from "./provider/dataProvider"
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";
import { DashboardPage } from "../src/pages/dashboard";
import AuthProviderConfig from "../src/provider/AuthProvider"
import { ProjectEdit, ProjectList, ProjectShow } from "./pages/project";
import { ProjectCreate } from "./pages/project/create";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3005/";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <AntdApp>
                    <Refine
                        authProvider={AuthProviderConfig}
                        dataProvider={dataProvider(API_URL)}
                        routerProvider={routerProvider}
                        resources={[
                            {
                                name: "dashboard",
                                list: "/",
                                meta: {
                                    label: "Dashboard",
                                    icon: <DashboardOutlined />,
                                },
                            },
                            {
                                name: "project",
                                list: "/project",
                                show: "/project/show/:id",
                                edit: "/project/edit/:id",
                                create: "/project/create",
                            },
                        ]}
                        notificationProvider={notificationProvider}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        key="authenticated-routes"
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route index element={<DashboardPage />} />
                                <Route path="/project">
                                    <Route index element={<ProjectList />} />
                                    <Route
                                        path="edit/:id"
                                        element={<ProjectEdit />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<ProjectShow />}
                                    />
                                    <Route
                                        path="create"
                                        element={<ProjectCreate />}
                                    />
                                </Route>
                            </Route>
                            <Route
                                element={
                                    <Authenticated
                                        key="auth-pages"
                                        fallback={<Outlet />}
                                    >
                                        <NavigateToResource resource="posts" />
                                    </Authenticated>
                                }
                            >
                                <Route
                                    path="/login"
                                    element={
                                        <AuthPage
                                            type="login"
                                            registerLink={false}
                                            forgotPasswordLink={false}
                                            rememberMe={false}
                                        />
                                    }
                                />
                            </Route>
                            <Route
                                element={
                                    <Authenticated key="catch-all">
                                        <ThemedLayoutV2>
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
                </AntdApp>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
