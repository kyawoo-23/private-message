import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import MessageBox from './pages/MessageBox/MessageBox'
import Login from './pages/Login/Login'
import NavBar from './components/NavBar/NavBar'
import { useThemeContext } from './hooks/useThemeContext'
import { useAuthContext } from './hooks/useAuthContext';
import Create from './pages/Create/Create';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer/Footer';

function App() {
  const { mode } = useThemeContext()
  const { user, authIsReady } = useAuthContext()

  return (
    <>
      <div className={`App ${mode}`}>
        {authIsReady && (
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path='/' 
                element={user ? <Home /> : <Navigate replace to='/login' />} 
              />
              <Route path='/:userId/:boxId' element={<MessageBox />} />
              <Route path='/create' 
                element={user ? <Create /> : <Navigate replace to='/' />} 
              />
              <Route path='/login' 
                element={!user ? <Login /> : <Navigate replace to='/' />} 
              />
              <Route path='/*' 
                element={user ? <NotFound /> : <Navigate replace to='/' />} 
              />
            </Routes>
          </BrowserRouter>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
