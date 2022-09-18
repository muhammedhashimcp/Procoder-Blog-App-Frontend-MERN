import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

// Redirect action
const resetUserAction = createAction("user/profile/reset");
// Redirect action
const resetPasswordAction = createAction("user/password/reset");

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Register action                                                         │
  └─────────────────────────────────────────────────────────────────────────┘
 */

export const registerUserAction = createAsyncThunk(
	"users/register",
	async (user, { rejectWithValue, getState, dispatch }) => {
		try {
			// http call
			const config = {
				header: {
					"Content-Type": "application/json",
				},
			};
			console.log("registerUserAction");
			const { data } = await axios.post(
				`${baseUrl}/api/users/register`,
				user,
				config
			);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Login                                                                   │
  └─────────────────────────────────────────────────────────────────────────┘
 */

export const loginUserAction = createAsyncThunk(
	"user/login",
	async (userData, { rejectWithValue, getState, dispatch }) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			//   make http call
			const { data } = await axios.post(
				`${baseUrl}/api/users/login`,
				userData,
				config
			);
			localStorage.setItem("userInfo", JSON.stringify(data));
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);
// Profile
export const userProfileAction = createAsyncThunk(
	"user/profile",
	async (id, { rejectWithValue, getState, dispatch }) => {
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			console.log(baseUrl, "baseUrl");
			const { data } = await axios.get(
				`${baseUrl}/api/users/profile/${id}`,
				config
			);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

// Follow
export const followUserAction = createAsyncThunk(
	"user/follow",
	async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			const { data } = await axios.put(
				`${baseUrl}/api/users/follow`,
				{ followId: userToFollowId },
				config
			);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

// unFollow
export const unFollowUserAction = createAsyncThunk(
	"user/un-follow",
	async (unFollowId, { rejectWithValue, getState, dispatch }) => {
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			const { data } = await axios.put(
				`${baseUrl}/api/users/un-follow`,
				{ unFollowId },
				config
			);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);
// Upload Profile photo
export const uploadProfilePhotoAction = createAsyncThunk(
	"user/profile-photo",
	async (userImage, { rejectWithValue, getState, dispatch }) => {
		// get user token
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			console.log(userImage);
			// http call
			const formData = new FormData();
			formData.append("image", userImage?.image);
			const { data } = await axios.put(
				`${baseUrl}/api/users/profile-photo-upload`,
				formData,
				config
			);
			return data;
		} catch (error) {
			if (!error?.response) throw error;
			return rejectWithValue(error?.response?.data);
		}
	}
);

// update user profile
export const updateUserAction = createAsyncThunk(
	"users/update",
	async (userData, { rejectWithValue, getState, dispatch }) => {
		try {
			// http call
			const user = getState()?.users;
			const { userAuth } = user;
			const config = {
				headers: {
					Authorization: `Bearer ${userAuth?.token}`,
				},
			};
			const { data } = await axios.put(
				`${baseUrl}/api/users/`,
				{
					firstName: userData?.firstName,
					lastName: userData?.lastName,
					email: userData?.email,
					bio: userData?.bio,
				},
				config
			);
			// dispatch
			dispatch(resetUserAction());
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

// update Password
export const updatePasswordAction = createAsyncThunk(
	"password/update",
	async (password, { rejectWithValue, getState, dispatch }) => {
		try {
			// http call
			const user = getState()?.users;
			const { userAuth } = user;
			const config = {
				headers: {
					Authorization: `Bearer ${userAuth?.token}`,
				},
			};
			const { data } = await axios.put(
				`${baseUrl}/api/users/password`,
				{
					password,
				},
				config
			);
			// dispatch
			dispatch(resetPasswordAction());
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

// Password reset token generator
export const passwordResetTokenAction = createAsyncThunk(
	"password/token",
	async (email, { rejectWithValue, getState, dispatch }) => {
		console.log("🚀 ~ file: userSlice.js ~ line 254 ~ email", email)
		try {
			// http call
			const config = {
				header: {
					"Content-Type": "application/json",
				},
			};

			const { data } = await axios.post(
				`${baseUrl}/api/users/forget-password-token`,
				{email},
				config
			);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

// Fetch user Details
export const fetchUserDetailsAction = createAsyncThunk(
	"users/detail",
	async (id, { rejectWithValue, getState, dispatch }) => {
		try {
			const { data } = await axios.get(`${baseUrl}/api/users/${id}`);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

// Fetch All user
export const fetchUsersAction = createAsyncThunk(
	"users/list",
	async (id, { rejectWithValue, getState, dispatch }) => {
		// http call
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			const { data } = await axios.get(`${baseUrl}/api/users`, config);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

// Block  User user
export const blockUserAction = createAsyncThunk(
	"users/block-user",
	async (id, { rejectWithValue, getState, dispatch }) => {
		// http call
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			const { data } = await axios.put(
				`${baseUrl}/api/users/block-user/${id}`,
				{},
				config
			);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);


// UnBlock  User user
export const unBlockUserAction = createAsyncThunk(
	"users/unblock-user",
	async (id, { rejectWithValue, getState, dispatch }) => {
		// http call
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			const { data } = await axios.put(
				`${baseUrl}/api/users/unblock-user/${id}`,
				{},
				config
			);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);
/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Logout Action                                                           │
  └─────────────────────────────────────────────────────────────────────────┘
 */

export const logoutAction = createAsyncThunk(
	"/user/logout",
	async (payload, { rejectWithValue, getState, dispatch }) => {
		console.log("logoutAction ");
		try {
			localStorage.removeItem("userInfo");
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

// get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Slices                                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const userSlices = createSlice({
	name: "users",
	initialState: {
		userAuth: userLoginFromStorage,
	},
	extraReducers: (builder) => {
		// register
		builder.addCase(registerUserAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(registerUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.registered = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(registerUserAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
		// Password reset token generator
		builder.addCase(passwordResetTokenAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
			state.loading = false;
			state.passwordToken = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// fetch user Details
		builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
			state.loading = false;
			state.userDetails = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// Block user
		builder.addCase(blockUserAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(blockUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.block = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(blockUserAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// UnBlock user
		builder.addCase(unBlockUserAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(unBlockUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.unblock = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(unBlockUserAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// fetch All user
		builder.addCase(fetchUsersAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
			state.loading = false;
			state.userList = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(fetchUsersAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
		// login
		builder.addCase(loginUserAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(loginUserAction.fulfilled, (state, action) => {
			console.log("log from login");
			state.userAuth = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(loginUserAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
		// Profile
		builder.addCase(userProfileAction.pending, (state, action) => {
			state.profileLoading = true;
			state.profileAppErr = undefined;
			state.profileServerErr = undefined;
		});
		builder.addCase(userProfileAction.fulfilled, (state, action) => {
			state.profile = action?.payload;
			state.profileLoading = false;
			state.profileAppErr = undefined;
			state.profileServerErr = undefined;
		});
		builder.addCase(userProfileAction.rejected, (state, action) => {
			state.profileLoading = false;
			state.profileAppErr = action?.payload?.message;
			state.profileServerErr = action?.error?.message;
		});

		// update profile
		builder.addCase(updateUserAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(resetUserAction, (state, action) => {
			state.isUpdated = true;
		});
		builder.addCase(updateUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.userUpdated = action?.payload;
			state.isUpdated = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(updateUserAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// update Password
		builder.addCase(updatePasswordAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(resetPasswordAction, (state, action) => {
			state.isPasswordUpdated = true;
		});
		builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
			state.loading = false;
			state.passwordUpdated = action?.payload;
			state.isPasswordUpdated = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(updatePasswordAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// Upload Profile Photo
		builder.addCase(uploadProfilePhotoAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(uploadProfilePhotoAction.fulfilled, (state, action) => {
			state.profilePhoto = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(uploadProfilePhotoAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// user Follow
		builder.addCase(followUserAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(followUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.followed = action?.payload;
			state.unFollowed = undefined;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(followUserAction.rejected, (state, action) => {
			state.loading = false;
			state.unFollowed = undefined;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// user unFollow
		builder.addCase(unFollowUserAction.pending, (state, action) => {
			state.unFollowLoading = true;
			state.unFollowAppErr = undefined;
			state.unFollowServerErr = undefined;
		});
		builder.addCase(unFollowUserAction.fulfilled, (state, action) => {
			state.unFollowLoading = false;
			state.unFollowed = action?.payload;
			state.followed = undefined;
			state.unFollowAppErr = undefined;
			state.unFollowServerErr = undefined;
		});
		builder.addCase(unFollowUserAction.rejected, (state, action) => {
			state.unFollowLoading = false;
			state.followed = undefined;
			state.unFollowAppErr = action?.payload?.message;
			state.unFollowServerErr = action?.error?.message;
		});

		// logout
		builder.addCase(logoutAction.pending, (state, action) => {
			state.loading = false;
		});
		builder.addCase(logoutAction.fulfilled, (state, action) => {
			state.userAuth = undefined;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(logoutAction.rejected, (state, action) => {
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
			state.loading = false;
		});
	},
});

export default userSlices.reducer;
