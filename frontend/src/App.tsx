import { SessionSelect } from "./pages/session-select";
import { Container } from "./components/container";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Container />}>
            <Route index element={<SessionSelect />}>
              {/* <Route path="/session/:id" /> element={<ExistingSession />} */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
