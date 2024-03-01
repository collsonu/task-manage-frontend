// import { Cookies } from 'js-cookie';
// import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import { getApiCall } from '../../services/api.js';

// const Header = () => {

//   const handleSignOut = async () => {
//     Cookies.remove('accessToken');

//     try {
//       const response = await getApiCall("tasks/list-task");
//       return response.message

//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }

//     window.location.reload()
//   }
//   return (
//     <>
//       <header className="bg-gray-800 py-4">
//         <div className="container mx-auto flex justify-between items-center px-4">
//           <div><Link to='/' className="text-white text-xl font-semibold">Task Manager</Link> </div>

//           <nav>
//             <ul className="flex">

//               <li><Link to="/signup" className="text-white mr-2">Sign Up</Link></li>
//               <button className="text-white ml-2" onClick={handleSignOut}>Signout</button>
//             </ul>
//           </nav>
//         </div>
//       </header>

//     </>
//   );
// };

// export default Header;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiCall } from '../../services/api.js';

const Header = () => {
  const history = useNavigate();

  const handleSignOut = async () => {
    try {

      const response = await getApiCall("users/logout-user");
      console.log('Logout response:', response);
      history('/')
    } catch (error) {
      console.error('Error during logout:', error);
    }
    window.location.reload();
  };

  return (
    <>
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div><Link to='/' className="text-white text-xl font-semibold">Task Manager</Link> </div>

          <nav>
            <ul className="flex">
              <li><Link to="/signup" className="text-white mr-2">Sign Up</Link></li>
              <button className="text-white ml-2" onClick={handleSignOut}>Signout</button>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
