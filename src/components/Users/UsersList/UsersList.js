import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../../redux/slices/users/userSlice";
import LoadingComponent from "../../../utils/LoadingComponent";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
	// dispatch
	const dispatch = useDispatch()
	// data from store
	const users = useSelector(state => state.users)
	const { userList, appErr, serverErr, loading,block,unblock} = users
	// fetch all users
	useEffect(() => {
		dispatch(fetchUsersAction())
	}, [dispatch,block,unblock])

	return (
		<>
			<UsersListHeader />
			<section className="py-8 bg-gray-900 min-h-screen">
				{loading ? (
					<LoadingComponent />
				) : appErr || serverErr ? (
					<h3 className="text-yellow-600 text-center text-lg">
						{serverErr} {appErr}
					</h3>
				) : userList?.length <= 0 ? (
					<h2>No User Found</h2>
				) : (
					userList?.map((user) => (
						<>
							{/* <div class="container px-4 mx-auto"> */}
							<UsersListItem key={user?._id} user={user} />
							{/* </div> */}
						</>
					))
				)}
			</section>
		</>
	);
};

export default UsersList;
