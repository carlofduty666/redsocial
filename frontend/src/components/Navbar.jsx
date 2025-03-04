
import { useLocation } from "react-router-dom";

const Navbar = () => {
    
    const location = useLocation();
    const token = localStorage.getItem('token');
    const logOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
    };

    return (

        <nav>

            <div className="side-bar">
                <div className="side-bar-icon">
                    <a href="/dashboard">Dashboard</a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-house-heart" viewBox="0 0 16 16" id="House-Heart--Streamline-Bootstrap" height="16" width="16"><desc>House Heart Streamline Icon: https://streamlinehq.com</desc><path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982" stroke-width="1"></path><path d="M8.707 1.5a1 1 0 0 0 -1.414 0L0.646 8.146a0.5 0.5 0 0 0 0.708 0.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5 -1.5V8.207l0.646 0.646a0.5 0.5 0 0 0 0.708 -0.707L13 5.793V2.5a0.5 0.5 0 0 0 -0.5 -0.5h-1a0.5 0.5 0 0 0 -0.5 0.5v1.293zM13 7.207V13.5a0.5 0.5 0 0 1 -0.5 0.5h-9a0.5 0.5 0 0 1 -0.5 -0.5V7.207l5 -5z" stroke-width="1"></path></svg>
                </div>
                <div className="side-bar-icon">
                    <a href="/dashboard">Notificaciones</a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-rocket-takeoff" viewBox="0 0 16 16" id="Rocket-Takeoff--Streamline-Bootstrap" height="16" width="16"><desc>Rocket Takeoff Streamline Icon: https://streamlinehq.com</desc><path d="M9.752 6.193c0.599 0.6 1.73 0.437 2.528 -0.362s0.96 -1.932 0.362 -2.531c-0.599 -0.6 -1.73 -0.438 -2.528 0.361 -0.798 0.8 -0.96 1.933 -0.362 2.532" stroke-width="1"></path><path d="M15.811 3.312c-0.363 1.534 -1.334 3.626 -3.64 6.218l-0.24 2.408a2.56 2.56 0 0 1 -0.732 1.526L8.817 15.85a0.51 0.51 0 0 1 -0.867 -0.434l0.27 -1.899c0.04 -0.28 -0.013 -0.593 -0.131 -0.956a9 9 0 0 0 -0.249 -0.657l-0.082 -0.202c-0.815 -0.197 -1.578 -0.662 -2.191 -1.277 -0.614 -0.615 -1.079 -1.379 -1.275 -2.195l-0.203 -0.083a10 10 0 0 0 -0.655 -0.248c-0.363 -0.119 -0.675 -0.172 -0.955 -0.132l-1.896 0.27A0.51 0.51 0 0 1 0.15 7.17l2.382 -2.386c0.41 -0.41 0.947 -0.67 1.524 -0.734h0.006l2.4 -0.238C9.005 1.55 11.087 0.582 12.623 0.208c0.89 -0.217 1.59 -0.232 2.08 -0.188 0.244 0.023 0.435 0.06 0.57 0.093q0.1 0.026 0.16 0.045c0.184 0.06 0.279 0.13 0.351 0.295l0.029 0.073a3.5 3.5 0 0 1 0.157 0.721c0.055 0.485 0.051 1.178 -0.159 2.065m-4.828 7.475 0.04 -0.04 -0.107 1.081a1.54 1.54 0 0 1 -0.44 0.913l-1.298 1.3 0.054 -0.38c0.072 -0.506 -0.034 -0.993 -0.172 -1.418a9 9 0 0 0 -0.164 -0.45c0.738 -0.065 1.462 -0.38 2.087 -1.006M5.205 5c-0.625 0.626 -0.94 1.351 -1.004 2.09a9 9 0 0 0 -0.45 -0.164c-0.424 -0.138 -0.91 -0.244 -1.416 -0.172l-0.38 0.054 1.3 -1.3c0.245 -0.246 0.566 -0.401 0.91 -0.44l1.08 -0.107zm9.406 -3.961c-0.38 -0.034 -0.967 -0.027 -1.746 0.163 -1.558 0.38 -3.917 1.496 -6.937 4.521 -0.62 0.62 -0.799 1.34 -0.687 2.051 0.107 0.676 0.483 1.362 1.048 1.928 0.564 0.565 1.25 0.941 1.924 1.049 0.71 0.112 1.429 -0.067 2.048 -0.688 3.079 -3.083 4.192 -5.444 4.556 -6.987 0.183 -0.771 0.18 -1.345 0.138 -1.713a3 3 0 0 0 -0.045 -0.283 3 3 0 0 0 -0.3 -0.041Z" stroke-width="1"></path><path d="M7.009 12.139a7.6 7.6 0 0 1 -1.804 -1.352A7.6 7.6 0 0 1 3.794 8.86c-1.102 0.992 -1.965 5.054 -1.839 5.18 0.125 0.126 3.936 -0.896 5.054 -1.902Z" stroke-width="1"></path></svg>
                </div>
                <div className="side-bar-icon">
                    <a href="/dashboard">Explorar</a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-rocket-takeoff" viewBox="0 0 16 16" id="Rocket-Takeoff--Streamline-Bootstrap" height="16" width="16"><desc>Rocket Takeoff Streamline Icon: https://streamlinehq.com</desc><path d="M9.752 6.193c0.599 0.6 1.73 0.437 2.528 -0.362s0.96 -1.932 0.362 -2.531c-0.599 -0.6 -1.73 -0.438 -2.528 0.361 -0.798 0.8 -0.96 1.933 -0.362 2.532" stroke-width="1"></path><path d="M15.811 3.312c-0.363 1.534 -1.334 3.626 -3.64 6.218l-0.24 2.408a2.56 2.56 0 0 1 -0.732 1.526L8.817 15.85a0.51 0.51 0 0 1 -0.867 -0.434l0.27 -1.899c0.04 -0.28 -0.013 -0.593 -0.131 -0.956a9 9 0 0 0 -0.249 -0.657l-0.082 -0.202c-0.815 -0.197 -1.578 -0.662 -2.191 -1.277 -0.614 -0.615 -1.079 -1.379 -1.275 -2.195l-0.203 -0.083a10 10 0 0 0 -0.655 -0.248c-0.363 -0.119 -0.675 -0.172 -0.955 -0.132l-1.896 0.27A0.51 0.51 0 0 1 0.15 7.17l2.382 -2.386c0.41 -0.41 0.947 -0.67 1.524 -0.734h0.006l2.4 -0.238C9.005 1.55 11.087 0.582 12.623 0.208c0.89 -0.217 1.59 -0.232 2.08 -0.188 0.244 0.023 0.435 0.06 0.57 0.093q0.1 0.026 0.16 0.045c0.184 0.06 0.279 0.13 0.351 0.295l0.029 0.073a3.5 3.5 0 0 1 0.157 0.721c0.055 0.485 0.051 1.178 -0.159 2.065m-4.828 7.475 0.04 -0.04 -0.107 1.081a1.54 1.54 0 0 1 -0.44 0.913l-1.298 1.3 0.054 -0.38c0.072 -0.506 -0.034 -0.993 -0.172 -1.418a9 9 0 0 0 -0.164 -0.45c0.738 -0.065 1.462 -0.38 2.087 -1.006M5.205 5c-0.625 0.626 -0.94 1.351 -1.004 2.09a9 9 0 0 0 -0.45 -0.164c-0.424 -0.138 -0.91 -0.244 -1.416 -0.172l-0.38 0.054 1.3 -1.3c0.245 -0.246 0.566 -0.401 0.91 -0.44l1.08 -0.107zm9.406 -3.961c-0.38 -0.034 -0.967 -0.027 -1.746 0.163 -1.558 0.38 -3.917 1.496 -6.937 4.521 -0.62 0.62 -0.799 1.34 -0.687 2.051 0.107 0.676 0.483 1.362 1.048 1.928 0.564 0.565 1.25 0.941 1.924 1.049 0.71 0.112 1.429 -0.067 2.048 -0.688 3.079 -3.083 4.192 -5.444 4.556 -6.987 0.183 -0.771 0.18 -1.345 0.138 -1.713a3 3 0 0 0 -0.045 -0.283 3 3 0 0 0 -0.3 -0.041Z" stroke-width="1"></path><path d="M7.009 12.139a7.6 7.6 0 0 1 -1.804 -1.352A7.6 7.6 0 0 1 3.794 8.86c-1.102 0.992 -1.965 5.054 -1.839 5.18 0.125 0.126 3.936 -0.896 5.054 -1.902Z" stroke-width="1"></path></svg>
                </div>
            </div>



        </nav>

        // <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed w-100 mb-3">
        //     <div className="container-fluid">
        //         <a className="navbar-brand" href="/">Rizoma</a>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //                 {!token ? (
        //                     <>
                            
        //                         <li className="nav-item">
        //                             <a className="nav-link" href="/auth/login">Login</a>
        //                         </li>
        //                         <li className="nav-item">
        //                             <a className="nav-link" href="/auth/register">Sign Up</a>
        //                         </li>
                                
        //                     </>
        //                 ) : (

        //                     <>
                            
        //                         <li className="nav-item">
        //                             <a className="nav-link" href="/dashboard">Dashboard</a>
        //                         </li>
        //                         <li className="nav-item">
        //                             <a className="nav-link" href="/profile">Profile</a>
        //                         </li>
        //                         <li className="nav-item">
        //                             <a className="nav-link" href="/edit-profile">Edit profile</a>
        //                         </li>
                            
                            
        //                     </>
                            
        //                 )}
        //             </ul>
        //             <form className="d-flex" role="search">
        //                 <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" disabled={location.pathname === '/dashboard' || location.pathname === '/profile'} />
        //                 <button
        //                     className="btn btn-outline-success"
        //                     type="button"
        //                     onClick={location.pathname === '/dashboard' || location.pathname === '/profile' ? logOut : null}
        //                 >
        //                     {location.pathname === '/dashboard' || location.pathname === '/profile' ? 'Logout' : 'Search'}
        //                 </button>
        //             </form>
        //         </div>
        //     </div>
        // </nav>
    )
    
}

export default Navbar;