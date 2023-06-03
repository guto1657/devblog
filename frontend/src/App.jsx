//Imports
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
//Components
import { Navbar } from "./components/Layout/Navbar";
import { Container } from "./components/Layout/Container";
import { Footer } from "./components/Layout/Footer";
import { ScrollToTop } from "./components/Layout/ScrollToTop";
import { Message } from "./components/Layout/Message";
//Pages
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { CreatePost } from "./pages/Post/CreatePost";
import { ReadPost } from "./pages/Post/ReadPost";
import { Dashboard } from "./pages/User/Dashboard";
import { Page404 } from "./pages/Page404";
import { EditPost } from "./pages/Post/EditPost";
import { EditUser } from "./pages/User/EditUser";
//Contexts
import { UserProvider } from "./context/UserContext";
import { PostProvider } from "./context/PostContext";
import { CommentProvider } from "./context/CommentContext";

function App() {
    return (
        <Router>
            <UserProvider>
                <PostProvider>
                    <CommentProvider>
                        <Navbar />
                        <Container>
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Navigate to="/home" />}
                                />
                                <Route path="/home" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/post/create"
                                    element={<CreatePost />}
                                />
                                <Route
                                    path="/post/edit/:id"
                                    element={<EditPost />}
                                />
                                <Route
                                    path="/post/:id"
                                    element={<ReadPost />}
                                />
                                <Route
                                    path="/users/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route
                                    path="/users/edit"
                                    element={<EditUser />}
                                />
                                <Route path="*" element={<Page404 />} />
                            </Routes>
                        </Container>
                        <Footer />
                        <Message />
                        <ScrollToTop />
                    </CommentProvider>
                </PostProvider>
            </UserProvider>
        </Router>
    );
}

export default App;
