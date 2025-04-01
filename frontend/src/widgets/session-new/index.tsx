import { useMutation } from "@tanstack/react-query";
import { Button, message } from "antd";
import { useNavigate } from "react-router";
import { SessionMutationFn } from "../../queries/session";

export const SessionNew = () => {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const createNewSession = useMutation({
    mutationFn: SessionMutationFn.create,
    onSuccess({ sessionId }) {
      navigate(`/sessions/${sessionId}`);
    },
    onError() {
      messageApi.error("Could not create new session. Please try again");
    },
  });

  return (
    <>
      {contextHolder}
      <Button
        onClick={() => createNewSession.mutate()}
        loading={createNewSession.isPending}
      >
        Start New Chat
      </Button>
    </>
  );
};
