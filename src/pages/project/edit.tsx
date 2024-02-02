import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";

import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Flex, Form, Image, Input, Select, Switch } from "antd";

import MDEditor from "@uiw/react-md-editor";

import { IProject, ITag } from "../../interfaces";
import ImageUpload from "../../components/ImageUpload";

const { TextArea } = Input;

export const ProjectEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult, formLoading } = useForm<IProject>();

    const projectData = queryResult?.data?.data;
    const { selectProps: tagSelectProps } = useSelect<ITag>({
        optionLabel: "name",
        resource: "tag",
    });

    return (
        <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
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
                    <Flex gap="middle" vertical>
                        <Image
                            src={projectData?.image}
                            width={150}
                        />
                        <ImageUpload />
                    </Flex>
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
                        defaultValue={projectData?.tags.map((tag: { id: string; }) => tag.id)}
                        options={tagSelectProps.options}
                    />
                </Form.Item>
            </Form>
        </Edit>
    );
};
