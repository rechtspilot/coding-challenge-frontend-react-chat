import { Input, Typography } from "antd";
import styles from "./index.module.css";
import { SessionQueryFn, SessionQueryKey } from "../../../../queries/session";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { useState } from "react";

const { Search } = Input;

export const SessionReload = () => {
  const [search, setSearch] = useState("");

  const sessionQuery = useQuery({
    queryKey: SessionQueryKey.get(search),
    queryFn: SessionQueryFn.get,
    enabled: Boolean(search),
  });

  if (sessionQuery.data) {
    return <Navigate to={`/sessions/${sessionQuery.data.sessionId}`} />;
  }

  return (
    <div className={styles.searchWrap}>
      <Search
        placeholder="session id"
        allowClear
        enterButton="Reload Session"
        onSearch={setSearch}
        loading={sessionQuery.isLoading}
        status={sessionQuery.isError ? "error" : undefined}
      />
      {sessionQuery.isError ? (
        <Typography.Text className={styles.searchErrorMessage} type="danger">
          Session not found
        </Typography.Text>
      ) : null}
    </div>
  );
};
