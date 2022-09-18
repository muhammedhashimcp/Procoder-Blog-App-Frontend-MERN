import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import AccountVerificationAlertWarning from "../../components/Alerts/AccountVerificationAlert/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "../../components/Alerts/AccountVerificationAlert/AccountVerificationSuccessAlert";

// // frontend/src/components/Alerts/AccountVerificationAlert/AccountVerificationSuccessAlert
// const Navbar = () => {
// 	// get user from store
// 	const state = useSelector((state) => state.users);
// 	const { userAuth, profile } = state;
// 	const isAdmin = userAuth?.isAdmin;
// 	// Acoount verification from store
// 	const account = useSelector((state) => state?.accountVerification);
// 	const { loading, appErr, serverErr, token } = account;
// 	return (
// 		<>
// 			{isAdmin ? (
// 				<AdminNavbar isLogin={userAuth} />
// 			) : userAuth ? (
// 				<PrivateNavbar isLogin={userAuth} />
// 			) : (
// 				<PublicNavbar />
// 			)}
// 			{/* Display alert */}
// 			{userAuth && !userAuth.isVerified && (
// 				<AccountVerificationAlertWarning />
// 			)}

// 			{/* Display success msg */}
// 			{loading &&
// 				<h2 className="text-center">Loading please wait ...</h2>
// 		}
// 			{token && <AccountVerificationSuccessAlert />}
// 			{appErr || serverErr ? (
// 				<h2 className="text-center text-red-500 ">
// 					{serverErr} {appErr}
// 				</h2>
// 			) : null}
// 		</>
// 	);
// };

// export default Navbar;

const Navbar = () => {
  //get user from store
  const state = useSelector(state => state.users);
  const { userAuth, profile } = state;
  const isAdmin = userAuth?.isAdmin;
  //account verification
  const account = useSelector(state => state?.accountVerification);
  const { loading, appErr, serverErr, token } = account;
  return (
    <>
      {isAdmin ? (
        <AdminNavbar isLogin={userAuth} />
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}
      {/* Display alert */}
      {userAuth && !userAuth.isVerified && <AccountVerificationAlertWarning />}


      {/* display success msg */}
      {loading && <h2 className="text-center">Loading please wait...</h2>}
      {token && <AccountVerificationSuccessAlert />}
      {appErr || serverErr ? (
        <h2 className="text-center text-red-500">
          {serverErr} {appErr}
        </h2>
      ) : null}
    </>
  );
};

export default Navbar;
