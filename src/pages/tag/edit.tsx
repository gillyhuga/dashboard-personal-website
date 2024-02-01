import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";

import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select, Switch } from "antd";

import MDEditor from "@uiw/react-md-editor";

import { IProject, ITag } from "../../interfaces";

const { TextArea } = Input;

export const TagEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps,formLoading } = useForm<ITag>();

    return (
        <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
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
        </Edit>
    );
};
