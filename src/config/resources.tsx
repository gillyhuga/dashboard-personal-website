import type { IResourceItem } from "@refinedev/core";

import {
    DashboardOutlined,
    ProjectOutlined,
    DatabaseOutlined,
    TagsOutlined
} from "@ant-design/icons";

export const resources: IResourceItem[] = [
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
        create: "/project/create",
        edit: "/project/edit/:id",
        meta: {
            label: "Projects",
            icon: <ProjectOutlined />,
        },
    },
    {
        name: "enumeration",
        meta: {
            label: "Enumeration",
            icon: <DatabaseOutlined />,
        },
    },
    {
        name: "tag",
        list: "/enumeration/tag",
        create: "/enumeration/tag/create",
        edit: "/enumeration/tag/edit/:id",
        meta: {
            label: "Tags",
            parent: "enumeration",
        },
    },
];