import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Switch } from "antd";
import { IProject, ITag } from "../../interfaces";
import TextArea from "antd/es/input/TextArea";

export const TagCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<ITag>();


  return (
    <Create saveButtonProps={saveButtonProps}>
       <Form {...formProps} style={{ maxWidth: 400 }} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
    </Create>
  );
};