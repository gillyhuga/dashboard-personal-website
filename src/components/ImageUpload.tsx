import React from 'react';
import { Upload, Button, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { useApiUrl } from '@refinedev/core';
import { getValueFromEvent } from '@refinedev/antd';



const ImageUpload = () => {
    const apiUrl = useApiUrl();
    const authToken = Cookies.get('auth_token');

    const extractResponseData = (fileList: any) => {
        if (Array.isArray(fileList) && fileList.length > 0) {
            return fileList[0].response;
        }
        return null;
    };

    return (
        <Form.Item
            name="image"
            getValueFromEvent={(e) => extractResponseData(getValueFromEvent(e))}
            noStyle
        >
            <Upload
                name="file"
                accept=".jpg,.jpeg,.png"
                className="upload-list-inline"
                listType="picture"
                action={`${apiUrl}/upload`}
                headers={{
                    Authorization: `Bearer ${authToken}`,
                }}
                maxCount={1}
            >
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
        </Form.Item>
    );
};

export default ImageUpload;
