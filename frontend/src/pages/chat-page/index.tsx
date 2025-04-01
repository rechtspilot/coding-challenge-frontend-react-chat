import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import styles from "./index.module.css";
import { SessionQueryFn, SessionQueryKey } from "../../queries/session";
import { Chat } from "../../widgets/chat";
import { GoHome } from "../../widgets/go-home";
import { Loader } from "../../components/loader";
import { ErrorReport } from "../../components/error-report";

export const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const sessionQuery = useQuery({
    queryKey: SessionQueryKey.get(id || ""),
    queryFn: SessionQueryFn.get,
    enabled: Boolean(id),
  });

  if (sessionQuery.isLoading) {
    return <Loader />;
  }

  if (sessionQuery.isError || !sessionQuery.data) {
    return (
      <ErrorReport
        message="Session not found"
        buttonText="Go back"
        onButtonClick={() => navigate("/")}
      />
    );
  }

  return (
    <div className={styles.wrap}>
      <Chat sessionId={sessionQuery.data.sessionId} />
      <GoHome className={styles.goHome} />
    </div>
  );
};
