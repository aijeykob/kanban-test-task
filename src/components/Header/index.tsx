import React, {useState} from "react";
import {Form, Input, Row, Col, Button} from "antd";

import {urlPattern} from "../../helpers";

interface RepoFormProps {
    loadIssues: () => void;
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RepoForm: React.FC<RepoFormProps> = ({loadIssues, handleUrlChange}) => {
    const [urlError, setUrlError] = useState("");

    const validateUrl = (_, value) => {
        if (urlPattern.test(value)) {
            setUrlError("");
        } else {
            setUrlError("Enter a valid GitHub repository URL.");
        }
    };

    return (
        <Form style={{flex: 1}}>
            <Form.Item name="search">
                <Row gutter={12}>
                    <Col span={18}>
                        <Form.Item name="search" noStyle rules={[{validator: validateUrl}]}>
                            <Form.Item validateStatus={urlError ? "error" : ""} help={urlError}>
                                <Input onChange={handleUrlChange} />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Button onClick={loadIssues} style={{width: "100%"}}>
                            Load issues
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
};

export default RepoForm;
