import '../App.css'

const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://bootleg-wrapped.herokuapp.com/login';

const Login = () => {
    return(<div>

        <h1>spotify stats</h1>

        <a href={LOGIN_URI}>
            <button className="spotify-button">
                login
            </button>
        </a>
    </div>)
}


export default Login