import { SessionSelect } from "./pages/session-select";
import { Container } from "./components/container";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatPage } from "./pages/chat-page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Container />}>
            <Route index element={<SessionSelect />} />
            <Route path="/sessions/:id" element={<ChatPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
