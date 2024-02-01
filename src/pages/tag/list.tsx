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
import { Card, Table, Tag } from "antd";
import { HttpError } from "@refinedev/core";
import { ITag } from "../../interfaces";

export const TagList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<ITag, HttpError>();

    return (

        <Card>
            <List
                createButtonProps={{ size: "middle" }}
            >
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" width={400} />
                    <Table.Column dataIndex="name" title="Name" />
                    <Table.Column<ITag>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        fixed='right'
                        width={100}
                        render={(_, record) => (
                            <div style={{ display: 'flex', gap: '10px' }}>
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
