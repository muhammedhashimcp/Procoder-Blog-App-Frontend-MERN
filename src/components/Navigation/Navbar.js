import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import AccountVerificationAlertWarning from "../../components/Alerts/AccountVerificationAlert/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "../../components/Alerts/AccountVerificationAlert/AccountVerificationSuccessAlert";


const Navbar = () => {
	//get user from store
	const state = useSelector((state) => state.users);
	const { userAuth } = state;
	const isAdmin = userAuth?.isAdmin;
	//account verification
	const account = useSelector((state) => state.accountVerification);
	const { loading, appErr, serverErr, token, remindMeLater } = account;
	const [close, setClose] = useState(false);
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
			{userAuth &&
				!userAuth.isVerified &&
				!remindMeLater&&(<AccountVerificationAlertWarning />)}
			{/* display success msg */}
			{loading && <h2 className="text-center">Loading please wait...</h2>}
			{token &&!close&& <AccountVerificationSuccessAlert setClose={setClose} />}
			{appErr || serverErr ? (
				<h2 className="text-center text-red-500">
					{serverErr} {appErr}
				</h2>
			) : null}
		</>
	);
}

export default Navbar;
