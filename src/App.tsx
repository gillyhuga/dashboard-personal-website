import {
    Refine,
    Authenticated,
} from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
    ThemedTitleV2,
} from "@refinedev/antd";
import { AuthPage } from "./pages/auth";
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
import { TagList } from "./pages/tag/list";
import { TagEdit } from "./pages/tag/edit";
import { TagCreate } from "./pages/tag/create";
import { resources } from "./config/resources";
import customTitleHandler from "./utility /customTitleHandler";
import { AppIcon } from "./components/app-icon ";


const API_URL = import.meta.env.VITE_ADMIN_API_URL || "http://localhost:3005/";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#1C538E",
                    },
                }}>
                <AntdApp>
                    <Refine
                        authProvider={AuthProviderConfig}
                        dataProvider={dataProvider(API_URL)}
                        routerProvider={routerProvider}
                        resources={resources}
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
                                        <ThemedLayoutV2
                                            Title={({ collapsed }) => (
                                                <ThemedTitleV2
                                                    collapsed={collapsed}
                                                    icon={<AppIcon />}
                                                    text="Personal Website"
                                                />
                                            )}
                                        >
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
                                <Route
                                    path="/enumeration"
                                    element={<Outlet />}
                                >
                                    <Route path="tag">
                                        <Route index element={<TagList />} />
                                        <Route
                                            path="edit/:id"
                                            element={<TagEdit />}
                                        />
                                        <Route
                                            path="create"
                                            element={<TagCreate />}
                                        />
                                    </Route>
                                </Route>
                            </Route>
                            <Route
                                element={
                                    <Authenticated
                                        key="auth-pages"
                                        fallback={<Outlet />}
                                    >
                                        <NavigateToResource resource="/" />
                                    </Authenticated>
                                }
                            >
                                <Route
                                    path="/login"
                                    element={
                                        <AuthPage
                                            type="login"

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
                        <DocumentTitleHandler handler={customTitleHandler} />
                    </Refine>
                </AntdApp>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
