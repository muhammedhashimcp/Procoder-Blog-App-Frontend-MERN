import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Navbar";
import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";
import Profile from "./components/Profile/Profile";
import PageNotFound from "./components/PageNotFound";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import AdminProtectedRoute from "./components/Navigation/ProtectedRoutes/AdminProtectedRoute";
import UserProtectedRoute from "./components/Navigation/ProtectedRoutes/UserProtectedRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostsList";
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/UpdatePost";
import UpdateComment from "./components/Comments/UpdateComment";
import UploadProfilePhoto from "./components/Profile/UploadProfilePhoto";
import UpdateProfileForm from "./components/Profile/UpdateProfileForm";
import UsersList from "./components/Users/UsersList/UsersList";
import SendEmail from "./components/Users/SendEmail/SendEmail";
import AccountVerified from "./components/Users/AccountVerification/AccountVerified";
import UpdatePassword from "./components/Users/PasswordManagement/UpdatePassword";
import ResetPasswordForm from "./components/Users/PasswordManagement/ResetPasswordForm";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					{/*
  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │           Public Routes                                                                                             │
  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 */}
					<Route path="/" element={<HomePage />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/posts" element={<PostsList />} />
					<Route path="/posts/:id" element={<PostDetails />} />
					<Route
						path="/password-reset-token"
						element={<ResetPasswordForm />}
					/>
					<Route path="*" element={<PageNotFound />} />
					{/*
  ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Private Route                                                                                                  │
  └────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 */}
					<Route path="/" element={<UserProtectedRoute />}>
						<Route path="/create-post" element={<CreatePost />} />
						<Route
							path="/update-post/:id"
							element={<UpdatePost />}
						/>
						<Route
							path="/update-comment/:id"
							element={<UpdateComment />}
						/>
						<Route
							path="/upload-profile-photo"
							element={<UploadProfilePhoto />}
						/>
						<Route
							path="/update-profile/:id"
							element={<UpdateProfileForm />}
						/>
						<Route path="/profile/:id" element={<Profile />} />
						<Route path="/send-mail" element={<SendEmail />} />
						<Route
							path="/verify-account/:token"
							element={<AccountVerified />}
						/>
						<Route
							path="/update-password"
							element={<UpdatePassword />}
						/>
					</Route>

					{/*
  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │           Admin Routes                                                                                              │
  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 */}

					<Route path="/" element={<AdminProtectedRoute />}>
						<Route path="/users" element={<UsersList />} />
						<Route
							path="/add-category"
							element={<AddNewCategory />}
						/>
						<Route
							path="/category-list"
							element={<CategoryList />}
						/>
						<Route
							path="/update-category/:id"
							element={<UpdateCategory />}
						/>
						<Route path="/send-mail" element={<SendEmail />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
