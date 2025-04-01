import { Alert, Button } from "antd";
import { CenterWrap } from "../center-wrap";
import styles from "./index.module.css";
import { FC } from "react";

export type ErrorReportProps = {
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

export const ErrorReport: FC<ErrorReportProps> = ({
  message,
  buttonText,
  onButtonClick,
}) => {
  return (
    <CenterWrap>
      <Alert
        message={message || "Something went wrong"}
        type="error"
        className={styles.alert}
      />
      {buttonText && onButtonClick ? (
        <Button onClick={onButtonClick}>{buttonText}</Button>
      ) : null}
    </CenterWrap>
  );
};
