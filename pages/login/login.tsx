import React from "react";
import { Form, Input, Button, Col, Row, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { GoogleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase";

const { Title } = Typography;

const Login = () => {
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row
      style={{ height: "100vh" }}
      type="flex"
      justify="center"
      align="middle"
    >
      <Col span={6}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          FabChat
        </Title>
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#1890ff" }} />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined style={{ color: "#1890ff" }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ width: "100%", marginBottom: 16 }}
              type="primary"
              htmlType="submit"
            >
              Log in
            </Button>
            <Button
              style={{ width: "100%" }}
              type="default"
              onClick={signInWithGoogle}
            >
              <GoogleOutlined style={{ color: "#1890ff" }} />
              Log in with Google
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
