import { useState, useEffect } from 'react';
import { catchErrors } from '../utils';
import { logout, getCurrentUserProfile } from '../spotify'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {

    const [profile, setProfile] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
            const { data } = await getCurrentUserProfile()
            setProfile(data)
        }

        catchErrors(fetchData())
    }, [])

    let location = useLocation()

    return (
        <div>
            <div className='site_header'>
                <button className="spotify-button" onClick={logout}>Log Out</button>
                <table className='nav-menu'>
                    {location.pathname !== '/' && (<thead>
                        <tr>
                            <th><Link to="/"><h3 className='nav-text'>home</h3></Link></th>
                            <th><Link to="/top-artists"><h3 className='nav-text'>top artists</h3></Link></th>
                            <th><Link to="/top-tracks"><h3 className='nav-text'>top tracks</h3></Link></th>
                            <th><Link to="/recently-played"><h3 className='nav-text'>recently played</h3></Link></th>
                        </tr>
                    </thead>)}
                </table>
                {profile &&
                    (<h3 className='name'>{profile.display_name.toLowerCase()}</h3>)}
            </div>
            <div className='site_header__mobile'>
                <div className='top-half-mobile'>
                    <button className="spotify-button" onClick={logout}>Log Out</button>
                    {profile &&
                        (<h3 className='name'>{profile.display_name.toLowerCase()}</h3>)}
                </div>
                <table className='nav-menu'>
                    {location.pathname !== '/' && (<thead>
                        <tr>
                            <th><Link to="/"><h3 className='nav-text'>home</h3></Link></th>
                            <th><Link to="/top-artists"><h3 className='nav-text'>top artists</h3></Link></th>
                            <th><Link to="/top-tracks"><h3 className='nav-text'>top tracks</h3></Link></th>
                            <th style={{ "padding-right": "0px" }}><Link to="/recently-played"><h3 className='nav-text'>recently played</h3></Link></th>
                        </tr>
                    </thead>)}
                </table>
            </div>
        </div>
    );
};

export default Header;