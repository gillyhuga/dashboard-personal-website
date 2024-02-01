import { useShow, IResourceComponentsProps, useOne } from "@refinedev/core";

import { Show, Breadcrumb } from "@refinedev/antd";

import { Typography, Image, Row, Col } from "antd";

import { IProject } from "../../interfaces";
import Link from "antd/lib/typography/Link";

const { Title, Text } = Typography;

export const ProjectShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IProject>();
    const { data, isLoading } = queryResult;
    const tagString = data?.data.tags.map((tag: { name: any; }) => tag.name).join(', ');

    return (
        <Show
            isLoading={isLoading}
            breadcrumb={<Breadcrumb />}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{ marginBottom: 20 }}
                    width={600}
                    src={data?.data.image}
                />
            </div>

            <Row>
                <Col flex="100px">
                    <Text strong={true} >Id</Text>
                </Col>
                <Col flex="auto">
                    <Text>{data?.data.id}</Text>
                </Col>
            </Row>
            <Row>
                <Col flex="100px">
                    <Text strong={true} >Title</Text>

                </Col>
                <Col flex="auto">
                    <Text>{data?.data.title}</Text>
                </Col>
            </Row>
            <Row>
                <Col flex="100px">
                    <Text strong={true} >Description</Text>

                </Col>
                <Col flex="auto">
                    <Text>{data?.data.description}</Text>
                </Col>
            </Row>
            <Row>
                <Col flex="100px">
                    <Text strong={true} >Tag</Text>

                </Col>
                <Col flex="auto">
                    <Text>{tagString}</Text>
                </Col>
            </Row>
            <Row>
                <Col flex="100px">
                    <Text strong={true} >URL</Text>
                </Col>
                <Col flex="auto">
                    <a href={data?.data.url}>
                        <Link>{data?.data.url}</Link>
                    </a>
                </Col>
            </Row>
        </Show>
    );
};
