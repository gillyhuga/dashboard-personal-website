import { IResourceComponentsProps } from "@refinedev/core";
import {
    List,
    useTable,
    ImageField,
    DateField,
    UrlField,
} from "@refinedev/antd";
import { Card, Table, Tag } from "antd";
import { HttpError } from "@refinedev/core";
import { IProject } from "../../interfaces";
import ActionsButton from "../../components/ActionButton";

export const ProjectList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IProject, HttpError>();

    return (

        <Card>
            <List
                createButtonProps={{ size: "middle" }}
            >
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="title" title="Title" width={250} />
                    <Table.Column
                        dataIndex="url"
                        title="Url"
                        width={250}
                        render={(value: string) => <UrlField value={value} />}
                    />
                    <Table.Column<IProject>
                        title="Image"
                        dataIndex="image"
                        width={200}
                        render={(_, record) => (
                            <ImageField value={record.image} title={record.title} height={100} width={200} />
                        )}
                    />
                    <Table.Column
                        dataIndex="isSelected"
                        title="Selected Project"
                        render={(value) => (
                            <Tag color={value ? "blue" : "default"}>
                                {value ? "Selected" : "Unselected"}
                            </Tag>
                        )}
                        defaultSortOrder='descend'
                        sorter={(a: any, b: any) => a.isSelected - b.isSelected}
                        width={175}
                        align="center"
                    />
                    <Table.Column
                        dataIndex="isPublished"
                        title="Status"
                        render={(value) => (
                            <Tag color={value ? "success" : "default"}>
                                {value ? "Published" : "Draft"}
                            </Tag>
                        )}
                        width={100}
                        align="center"
                    />
                    <Table.Column
                        dataIndex="createdAt"
                        title="Created At"
                        width={100}
                        render={(value) => (
                            <DateField value={value} />
                        )}
                    />
                    <Table.Column
                        dataIndex="updatedAt"
                        title="Updated At"
                        width={100}
                        render={(value) => (
                            <DateField value={value} />
                        )}
                    />
                    <Table.Column<IProject>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        fixed='right'
                        width={100}
                        render={(_, record) => <ActionsButton record={record} />}
                    />
                </Table>
            </List>
        </Card>

    );
};
