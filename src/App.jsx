import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Settings from "./pages/Settings";
import Libraries from "./pages/Libraries";
import LibraryDetail from "./pages/LibraryDetail";
import Messages from "./pages/Messages";
import Notes from "./pages/Notes";
import PrivateMessage from "./pages/PrivateMessage";
import Saved from "./pages/Saved";
import Books from "./pages/Books";
import Login from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoutes";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/libraries" element={<Libraries />} />
            <Route path="/books" element={<Books />} />
            <Route
              path="/library/:libraryId/:libraryName"
              element={<LibraryDetail />}
            />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/private_messages" element={<PrivateMessage />} />
            <Route path="/saved" element={<Saved />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
