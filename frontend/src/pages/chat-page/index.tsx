import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import styles from "./index.module.css";
import { SessionQueryFn, SessionQueryKey } from "../../queries/session";
import { CenterWrap } from "../../components/center-wrap";
import { Alert, Button, Spin } from "antd";
import { Chat } from "../../widgets/chat";
import { GoHome } from "../../widgets/go-home";

export const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const sessionQuery = useQuery({
    queryKey: SessionQueryKey.get(id || ""),
    queryFn: SessionQueryFn.get,
    enabled: Boolean(id),
  });

  if (sessionQuery.isLoading) {
    return (
      <CenterWrap>
        <Spin />
      </CenterWrap>
    );
  }

  if (sessionQuery.isError || !sessionQuery.data) {
    return (
      <CenterWrap>
        <Alert
          message="Session not found"
          type="error"
          className={styles.alert}
        />
        <Button onClick={() => navigate("/")}>Go back</Button>
      </CenterWrap>
    );
  }

  return (
    <div className={styles.wrap}>
      <Chat sessionId={sessionQuery.data.sessionId} />
      <GoHome className={styles.goHome} />
    </div>
  );
};
