import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import { accessToken, logout, getCurrentUserProfile } from './spotify'
import { catchErrors } from './utils'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { Login, Homepage, TopArtists, Header, TopTracks, RecentlyPlayed } from './pages'

function App() {

  const [token, setToken] = useState(null)

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    setToken(accessToken)

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile()
      setProfile(data)
    }

    catchErrors(fetchData())
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {!token ?
          (<Login />) : (
            <div className='main-content'>
              <Router>
                <Header />
                <Routes>
                  <Route path="/top-artists" element={<TopArtists />}>
                  </Route>
                  <Route path="/top-tracks" element={<TopTracks />}>
                  </Route>
                  <Route path="/recently-played" element={<RecentlyPlayed />}>
                  </Route>
                  <Route path="/" element={<Homepage />}>
                  </Route>
                </Routes>
              </Router>
            </div>
          )
        }
      </header>
    </div>
  );
}

export default App;
