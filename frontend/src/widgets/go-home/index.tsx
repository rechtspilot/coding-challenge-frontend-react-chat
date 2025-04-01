import { HomeOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { FC } from "react";
import { Link } from "react-router";
import styles from "./index.module.css";

export type GoHomeProps = {
  className?: string;
};

export const GoHome: FC<GoHomeProps> = ({ className }) => {
  return (
    <Link to="/" className={className}>
      <Tag color="blue" className={styles.tag}>
        <HomeOutlined className={styles.icon} />
      </Tag>
    </Link>
  );
};
