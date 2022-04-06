import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import Signup from "./pages/signup/Signup";
import { Login } from "./pages/login/Login";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { SetAvatar } from "./pages/setAvatar/SetAvatar";
import { AuthContext } from "./context/Auth";
import Chat from "./pages/chat/Chat";

function App() {

  const { auth } = useContext(AuthContext);
  const queryClient = new QueryClient();
  axios.defaults.headers.common["x-access-token"] = auth && auth.token;


  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/chat/login" element={<Login />} />
          <Route path="/chat/signup" element={<Signup />} />
          <Route
            path="/chat/avatar"
            element={auth ? <SetAvatar /> : <Navigate to="/chat/login" />}
          />
          <Route
            path="/chat"
            element={auth ? <Chat /> : <Navigate to="/chat/login" />}
          />
          <Route path="*" element={<Navigate to="/chat/login" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
