export type NewSessionResponse ={
  sessionId: string;
}

export type SendMessagePayload = {
  sessionId: string;
  message: {
      id: string;
      text: string;
  };
}

export type GetMessagesParams = {
  sessionId: string;

}

export type MessageData = {
  id: string;
  kind: 'robot' | 'user';
  text: string;
}
