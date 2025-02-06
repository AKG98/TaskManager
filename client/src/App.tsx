import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';
import { RootState } from './store'; 
import Login from './pages/AuthPage/';

export default function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Login/>}/>
        <Route element={<ProtectedRoute isAuth={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}