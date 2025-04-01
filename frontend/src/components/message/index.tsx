import { FC } from "react";
import cn from "classnames";
import { LocalMessage, MessageStatus } from "../../types/message";
import { Button, Tag, Flex, Typography } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import styles from "./index.module.css";

export type MessageProps = {
  message: LocalMessage;
  onRetry: (message: LocalMessage) => void;
};

const IconMap = {
  [MessageStatus.Pending]: <LoadingOutlined />,
  [MessageStatus.Success]: <CheckCircleOutlined />,
  [MessageStatus.Error]: <ExclamationCircleOutlined className={styles.red} />,
} as const;

export const Message: FC<MessageProps> = ({ message, onRetry }) => {
  const isRobot = message.kind === "robot";

  return (
    <Tag
      className={cn(styles.wrap, { [styles.user]: !isRobot })}
      color={isRobot ? undefined : "green"}
    >
      <Flex
        gap="small"
        justify="space-between"
        align="center"
        className={styles.title}
      >
        <Typography.Text strong>{isRobot ? "Robot" : "You"}</Typography.Text>
        <Typography.Text className={styles.small}>
          {message.timestamp}
        </Typography.Text>
      </Flex>
      <Typography.Text className={styles.break}>{message.text}</Typography.Text>
      <Flex
        gap="small"
        justify="right"
        align="center"
        className={styles.statusWrap}
      >
        {!isRobot && message.status === MessageStatus.Error ? (
          <Button onClick={() => onRetry(message)} size="small">
            Retry
          </Button>
        ) : null}
        {!isRobot ? IconMap[message.status || MessageStatus.Success] : null}
      </Flex>
    </Tag>
  );
};
