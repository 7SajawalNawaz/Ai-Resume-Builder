import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/features/authSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()

  const logoutUser = () =>{
    navigate('/')
    dispatch(logout())
  }

  return (
    <div className="shadow-xs bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5">
        <Link to='/'>
          <img src="/logo.png" alt="" className="h-8 w-auto" />
        </Link>

        {/* user details */}
        <div className="flex items-center gap-6">
          <p>Hi, {user.name}</p>
          <button onClick={logoutUser} className="bg-white hover:bg-purple-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all">
            Logout
          </button>
        </div>


      </nav>
    </div>
  );
};

export default Navbar;
