import { Link } from 'react-router-dom'

const Homepage = () => {

    return (
        <div>

            <div className='content'>
                <h1>spotify stats</h1>

                <table>
                    <thead>
                        <tr><th><Link to='top-artists'><h2 className='nav-text'>top artists</h2></Link></th></tr>
                        <tr><th><Link to='top-tracks'><h2 className='nav-text'>top tracks</h2></Link></th></tr>
                        <tr><th><Link to='recently-played'><h2 className='nav-text'>recently played</h2></Link></th></tr>
                    </thead>
                </table>
            </div>
        </div>
    )
};

export default Homepage;