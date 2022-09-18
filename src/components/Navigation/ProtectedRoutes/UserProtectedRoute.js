
import { useSelector } from 'react-redux'
import { Navigate, Outlet, } from "react-router-dom";

const UserProtectedRoute = () => {
	console.log("user protected route");
	//check if user is login
	const user = useSelector(state => state?.users);
	const { userAuth } = user;
	const isAdmin = userAuth?.isAdmin;

		return userAuth ? <Outlet /> : <Navigate to="/login" />;

}
export default UserProtectedRoute



// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Route, useNavigate, } from 'react-router-dom'



// const PrivateProtectRoute = ({ element: Element, ...rest }) => {
// 	const navigate=useNavigate()
// 	// check if user is login
// 	const user = useSelector(state => state?.users)
// 	const { userAuth } = user;
// 	return (
// 		<Route {...rest} render={() => userAuth ? <Element {...rest} /> : (navigate('/login'))} />
// 	)
// }

// export default PrivateProtectRoute
