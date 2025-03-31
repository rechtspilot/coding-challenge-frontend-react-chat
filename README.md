# Frontend Challenge: Resilient Chat Application

This challenge is designed to evaluate your React skills in state management (especially for asynchronous operations), API interaction with error handling, UI/UX for real-time-like interactions, and application structure. You will build a simplified chat application interface.

## Challenge Objective
Build a Chat Application UI where users can:

- [ ] Start a new chat session.
- [ ] Reload an existing chat session using a session key.
- [ ] Send messages within the current session.
- [ ] See the status of sent messages (sending, sent, failed).
- [ ] Resend messages that failed to send.
- [ ] View the conversation history for the current session (messages sent/received during the session).

You will interact with a **mocked backend** simulation layer that introduces deliberate failures and delays.

## Prerequisites
*   **Duration:** We estimate this task should take approximately 3-5 hours. Please provide an estimation of the total time you spent on this challenge if it is not evident from your commit history.
*   **Technology:** React with Typescript.
*   **Testing:** Write at least one unit test for a critical function/component (e.g., message sending logic, state update on error).

## Evaluation Criteria
1.  **State Management:** Effective handling of application state, especially message statuses (pending, sent, failed) and the current session state.
2.  **Code Structure:** Modular, readable, and reusable components. Clear separation of concerns.
3.  **API Interaction & Error Handling:** Robust handling of asynchronous operations, including detecting timeouts/no-replies from the mock backend, updating UI accordingly, and implementing retry logic.
4.  **Session Management:** Correct implementation of starting, reloading, and associating messages with sessions.
5.  **UI/UX:** Clear visual feedback for message statuses, loading states, and error conditions. Intuitive user flow for sending and resending messages.
6.  **Logical Reasoning:** Correct implementation of the chat flow, status updates, and resend mechanism.
7.  **Best Practices:** Type definitions, code comments where necessary, clean code.
8.  **Collaboration:** Clear `README.md`, meaningful commit history.

## Functional Requirements

1.  **Session Management**
    *   [ ] On initial load, allow the user to either "Start New Chat" or "Reload Session".
    *   [ ] **Start New Chat:** Trigger a mock API call to get a new `sessionId`. Store this `sessionId` and display it to the user (so they could theoretically use it to reload later).
    *   [ ] **Reload Session:** Provide an input field for the user to enter an existing `sessionId`. On submission, store this `sessionId` as the current session. (For simplicity, we won't fetch historical messages on reload; reloading just sets the context for *new* messages).
    *   [ ] Once a session is active (new or reloaded), display the main chat interface.

2.  **Chat Interface**
    *   [ ] Display a list of messages sent/received *during the current interaction*.
    *   [ ] Each message should show:
        *   [ ] Message content.
        *   [ ] A visual indicator of its status: "Sending...", "Sent", or "Failed".
    *   [ ] Provide a text input field and a "Send" button to send new messages.

3.  **Sending Messages**
    *   [ ] When the user sends a message:
        *   [ ] Assign a unique temporary ID to the message (frontend generated).
        *   [ ] Add the message to the displayed list with a "Sending..." status.
        *   [ ] Make a mock API call to send the message, including the `sessionId` and message content.
        *   [ ] **Handle Response:**
            *   On successful response: Update the message status to "Sent".
            *   On error response *or* if no response is received within a reasonable timeout (e.g., 5 seconds): Update the message status to "Failed".

4.  **Resending Messages**
    *   [ ] For messages marked as "Failed", provide a "Resend" button or similar UI element.
    *   [ ] Clicking "Resend" should:
        *   [ ] Change the message status back to "Sending...".
        *   [ ] Retry the mock API call to send the message.
        *   [ ] Handle the response/timeout as described in step 3.

## Non-Functional Requirements
1.  **Error Handling:** Focus specifically on handling the "no reply" / timeout scenario from the backend simulation when sending messages. Provide clear feedback to the user.
2.  **Loading States:** Visually indicate when messages are being sent.
3.  **Scalability:** Consider how the state management and component structure could scale if more features (like receiving messages pushed from the server) were added later.

## Mocked API Definition (Simulated within Frontend)

### Example Payloads

#### `POST` /sessions 
```typescript
{
  sessionId: string // e.g., "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8"
}
```

#### `GET` /sessions 
```typescript
[
  { 
    sessionId: string
  }
]
```

#### `POST` /messages 
*Input Payload:*
```typescript
{
  sessionId: "a1b2c3d4-...",
  message: {
    id: "temp-frontend-id-123", // Frontend generated unique ID for tracking
    text: "Hello there!"
  }
}
```
*No Response:* The Promise returned by POST /messages simply never settles in this case.

#### `GET` /messages/:sessionId
*Input Payload:*
```typescript
[
  {
    "id":"msg_123",
    "kind":"user",
    "text":"Hello server!",
    "backendId":"33979c56-204c-466a-aaa3-485e7cb5669b",
    "timestamp":"2025-03-31T11:00:45.806Z"
  },
  {
    "id":"97e4614c-97b1-4d69-9014-59c6919f0bc2",
    "kind":"robot",
    "text":"Auto-response to: Hello server!",
    "backendId":"19d8ae80-2a7e-48d4-8ef1-04c7a8cd72d5",
    "timestamp":"2025-03-31T11:00:45.806Z"
  }
]
```

### Error scenarios
Check the backend mock code for further errors.


## Suggested Features (Optional)
If time allows, consider adding:
-   **Local Storage Persistence:** Persist messages for the *active* session in `localStorage` so they survive a page refresh (until a new session is explicitly started or reloaded).
-   **Timestamp Display:** Show a simple timestamp for each message.

## Submission
-   **Repository:** Provide a link to a GitHub repository with your code (can be public or private).
-   **Access (if private):** If the repository is private, invite the user [@FloHiwg](https://github.com/FloHiwg) to your repository. Ensure the username is correct and that access is granted.
-   **Instructions:** Include clear instructions in the `README.md` for setting up, running the application, and running any tests.
-   **Time Spent:** Please give an estimation of the total time you needed to complete the challenge if the commit history does not clearly reflect it.
-   **Running the App:** Ensure the app can be easily run locally following your instructions.

## Final Notes
This challenge focuses on handling the complexities of asynchronous communication in a potentially unreliable environment, a common scenario in real-world frontend development. Focus on robust state management, clear user feedback for different message states, and the retry mechanism. Good luck! 🚀