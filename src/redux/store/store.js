import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/userSlice";
import categoriesReducer from "../slices/category/categorySlice";
import postReducer from "../slices/posts/postSlices";
import commentReducer from "../slices/comments/commentSlices";
import sendMailReducer from "../slices/email/emailSlices";
import accountVerification from "../slices/accountVerification/accVerificationSlices";

const store = configureStore({
	reducer: {
		users: userReducer,
		category: categoriesReducer,
		post: postReducer,
		comment: commentReducer,
		sendMail: sendMailReducer,
		accountVerification,
	},
});

export default store;
