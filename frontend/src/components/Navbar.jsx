
import { useLocation } from "react-router-dom";

const Navbar = () => {
    
    const location = useLocation();
    const token = localStorage.getItem('token');
    const logOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
    };

    return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed w-100 mb-3">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Home</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        {!token ? (
                            <>
                            
                                <li className="nav-item">
                                    <a className="nav-link" href="/auth/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/auth/register">Sign Up</a>
                                </li>
                            </>
                        ) : null}
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" disabled={location.pathname === '/dashboard' || location.pathname === '/profile'} />
                        <button
                            className="btn btn-outline-success"
                            type="button"
                            onClick={location.pathname === '/dashboard' || location.pathname === '/profile' ? logOut : null}
                        >
                            {location.pathname === '/dashboard' || location.pathname === '/profile' ? 'Logout' : 'Search'}
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
    
}

export default Navbar;