import { ShowButton, EditButton, DeleteButton } from "@refinedev/antd";

const ActionsButton = ({ record, showButton = true, editButton = true, deleteButton = true }: any) => (
  <div style={{ display: 'flex', gap: '10px' }}>
    {showButton && <ShowButton size="small" recordItemId={record.id} hideText={true} />}
    {editButton && <EditButton size="small" recordItemId={record.id} hideText={true} />}
    {deleteButton && <DeleteButton size="small" recordItemId={record.id} hideText={true} />}
  </div>
);

export default ActionsButton;
