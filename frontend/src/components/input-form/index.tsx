import { Button, Flex, Form, Input } from "antd";
import styles from "./index.module.css";
import { FC } from "react";

const { useForm } = Form;

export type InputFormProps = {
  onSubmit: (input: string) => void;
  loading?: boolean;
};

type FormData = {
  input: string;
};

export const InputForm: FC<InputFormProps> = ({ onSubmit, loading }) => {
  const [form] = useForm<FormData>();

  function handleFormSubmit({ input }: FormData) {
    form.resetFields();

    if (input.trim()) {
      onSubmit(input);
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form}>
      <Flex gap="small">
        <Form.Item<string> className={styles.input} name="input">
          <Input placeholder="Say hi..." />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Flex>
    </Form>
  );
};
