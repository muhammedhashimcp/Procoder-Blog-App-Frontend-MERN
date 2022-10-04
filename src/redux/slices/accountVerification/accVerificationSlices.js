import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ // action                                                               │
  └─────────────────────────────────────────────────────────────────────────┘
 */

// action for redirect
const resetAcc = createAction("account/verify-reset");
// Create Account Verification Token
export const accVerificationSendTokenAction = createAsyncThunk(
	"account/token",
	async (email, { rejectWithValue, getState, dispatch }) => {
		// get user token
		const user = getState().users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth.token}`,
			},
		};
		try {
			const { data } = await axios.post(
				`${baseUrl}/api/users/generate-verify-email-token`,
				{},
				config
			);
			dispatch(resetAcc());
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

// Verify Account
export const verifyAccountAction = createAsyncThunk(
	"account/verify",
	async (token, { rejectWithValue, getState, dispatch }) => {
		// get user token
		const user = getState().users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			const { data } = await axios.put(
				`${baseUrl}/api/users/verify-account`,
				{ token },
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


// Remind Me Later Action
export const remindMeLaterAction = createAsyncThunk(
	'account/remind-later',
	async (token, { rejectWithValue, getState, dispatch }) => {
		// get user token
		const user = getState().users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			const { data } = await axios.put(
				`${baseUrl}/api/users/remind-later`,
				{ token },
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
const accountVerificationSlices = createSlice({
	name: "account",
	initialState: {},
	extraReducers: (builder) => {
		// Create Verification Token
		builder.addCase(
			accVerificationSendTokenAction.pending,
			(state, action) => {
				state.loading = true;
			}
		);
		builder.addCase(
			accVerificationSendTokenAction.fulfilled,
			(state, action) => {
				state.token = action?.payload;
				state.loading = false;
				state.appErr = undefined;
				state.serverErr = undefined;
			}
		);
		builder.addCase(
			accVerificationSendTokenAction.rejected,
			(state, action) => {
				state.loading = false;
				state.appErr = action?.payload?.message;
				state.serverErr = action?.error?.message;
			}
		);

		// Verify Account
		builder.addCase(verifyAccountAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(resetAcc, (state, action) => {
			state.isVerified = true;
		});
		builder.addCase(verifyAccountAction.fulfilled, (state, action) => {
			state.token = action?.payload;
			state.isVerified = false;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(verifyAccountAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// Remind Me Later Action
		builder.addCase(remindMeLaterAction.pending, (state, action) => {
			state.loading = true;
		});
		
		builder.addCase(remindMeLaterAction.fulfilled, (state, action) => {
			state.token = action?.payload;
			state.isVerified = false;
			state.remindMeLater=true
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(remindMeLaterAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
	},
});

export default accountVerificationSlices.reducer;
