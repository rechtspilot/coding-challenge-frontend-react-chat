import { Button, Flex, Form, Input, InputRef } from "antd";
import styles from "./index.module.css";
import { FC, useRef } from "react";

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
  const inputRef = useRef<InputRef>(null);

  function handleFormSubmit({ input }: FormData) {
    form.resetFields();
    setTimeout(() => inputRef.current?.focus(), 100)


    if (input.trim()) {
      onSubmit(input);
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form}>
      <Flex gap="small">
        <Form.Item<string> className={styles.input} name="input">
          <Input placeholder="Say hi..." ref={inputRef} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Flex>
    </Form>
  );
};
