import { IResourceComponentsProps } from "@refinedev/core";
import {
    List,
    useTable,
    ImageField,
    DateField,
    UrlField,
    ShowButton,
    EditButton,
    DeleteButton,
} from "@refinedev/antd";
import {Card, Table, Tag } from "antd";
import { HttpError } from "@refinedev/core";
import { IProject } from "../../interfaces";

export const ProjectList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IProject, HttpError>();

    return (

        <Card>
            <List
                createButtonProps={{ size: "middle" }}
            >
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="title" title="Title" />
                    <Table.Column
                        dataIndex="url"
                        title="Url"
                        fixed="right"
                        render={(value: string) => <UrlField value={value} />}
                    />
                    <Table.Column<IProject>
                        title="Image"
                        dataIndex="image"
                        render={(_, record) => (
                            <ImageField value={record.image} title={record.title} width={200} />
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
                        defaultSortOrder= 'descend'
                        sorter= {(a:any, b:any) => a.isSelected - b.isSelected}
                        width={100}
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
                    />
                    <Table.Column
                        dataIndex="createdAt"
                        title="Created At"
                        render={(value) => (
                            <DateField value={value} />
                        )}
                    />
                    <Table.Column
                        dataIndex="updatedAt"
                        title="Updated At"
                        render={(value) => (
                            <DateField value={value} />
                        )}
                    />
                    <Table.Column<IProject>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        fixed='right'
                        render={(_, record) => (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <ShowButton size="small" recordItemId={record.id} hideText={true} />
                                <EditButton size="small" recordItemId={record.id} hideText={true} />
                                <DeleteButton size="small" recordItemId={record.id} hideText={true} />
                            </div>
                        )}
                    />
                </Table>
            </List>
        </Card>

    );
};
