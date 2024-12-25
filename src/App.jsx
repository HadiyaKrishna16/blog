import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <AppRoutes />
        </BlogProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
