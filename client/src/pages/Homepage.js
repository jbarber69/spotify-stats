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
                        <tr><th><h2 className='nav-text inactive'>recently played</h2></th></tr>
                    </thead>
                </table>
            </div>
        </div>
    )
};

export default Homepage;