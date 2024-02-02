import { IResourceComponentsProps } from "@refinedev/core";
import {
    List,
    useTable,
} from "@refinedev/antd";
import { Card, Table } from "antd";
import { HttpError } from "@refinedev/core";
import { ITag } from "../../interfaces";
import ActionsButton from "../../components/ActionButton";

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
                        render={(_, record) => <ActionsButton record={record} showButton={false} />}
                    />
                </Table>
            </List>
        </Card>
    );
};
