import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Switch } from "antd";
import { IProject, ITag } from "../../interfaces";
import TextArea from "antd/es/input/TextArea";
import ImageUpload from "../../components/ImageUpload";

export const ProjectCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IProject>();

  const { selectProps: tagSelectProps } = useSelect<ITag>({
    optionLabel: "name",
    resource: "tag",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} style={{ maxWidth: 400 }} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Url"
          name="url"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Image">
          <ImageUpload/>
        </Form.Item>
        <Form.Item
          label="Publish"
          name="isPublished"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Selected Project"
          name="isSelected"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Tag"
          name="tag"
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            options={tagSelectProps.options}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};