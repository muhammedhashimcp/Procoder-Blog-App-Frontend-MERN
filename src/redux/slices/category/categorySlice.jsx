import axios from "axios";

import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseURL";

// action to redirect
const resetEditAction = createAction("category/reset")
const resetDeleteAction = createAction("category/delete-reset")
const resetCategoryAction = createAction("category/category-reset")


/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ // action                                                               │
  └─────────────────────────────────────────────────────────────────────────┘
 */

// create category action
export const createCategoryAction = createAsyncThunk(
	'category/create',
	async (category, { rejectWithValue, getState, dispatch }) => {
		console.log("🚀 ~ file: categorySlice.jsx ~ line 22 ~ category", category)
		
		const user = getState()?.users;
		const { userAuth } = user;

		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			}
		}
		try {
			const formData = new FormData();
			formData.append('title', category?.title);
			formData.append('image', category?.categoryImage);
			const { data } = await axios.post(
				`${baseUrl}/api/category`,
				formData,
				config
			);
			// dispatch action
			dispatch(resetCategoryAction())
			return data
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data)
		}
	}
)

// fetch all category
export const fetchCategoriesAction = createAsyncThunk(
	'category/fetch',
	async (category, { rejectWithValue, getState, dispatch }) => {
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			}
		}
		try {
			const { data } = await axios.get(`${baseUrl}/api/category`,
				config);
			return data
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data)
		}
	}
)

// Fetch category details
export const fetchCategoryAction = createAsyncThunk(
	'category/details',
	async (id, { rejectWithValue, getState, dispatch }) => {
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			}
		}
		try {
			const { data } = await axios.get(`${baseUrl}/api/category/${id}`,
				config
			);
			console.log(data);
			return data
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data)
		}
	}
)
// Update category
export const updateCategoryAction = createAsyncThunk(
	'category/update',
	async (category, { rejectWithValue, getState, dispatch }) => {
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			}
		}
		try {
			const { data } = await axios.put(`${baseUrl}/api/category/${category.id}`,
				{ title: category?.title },
				config
			);
			// dispatch action to reset the updated data
			dispatch(resetEditAction())
			return data
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data)
		}
	}
)


// Delete category
export const deleteCategoryAction = createAsyncThunk(
	'category/delete',
	async (id, { rejectWithValue, getState, dispatch }) => {
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			}
		}
		try {
			const { data } = await axios.delete(`${baseUrl}/api/category/${id}`,
				config
			);
			// dispatch action for delete reset
			dispatch(resetDeleteAction())
			return data
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data)
		}
	}
)
/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Slices                                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const categorySlices = createSlice({
	name: "category",
	initialState: {},
	extraReducers: (builder) => {
		builder.addCase(createCategoryAction.pending, (state, action) => {
			state.loading = true;
		})
		// dispatch action to redirect
		builder.addCase(resetCategoryAction, (state, action) => {
			state.isCreated=true
		})
		builder.addCase(createCategoryAction.fulfilled, (state, action) => {
			state.category = action?.payload;
			state.isCreated = false;
			state.loading = false;
			// state.isCreated
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(createCategoryAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message
		})

		// fetch all
		builder.addCase(fetchCategoriesAction.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
			state.categoryList = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		})
		builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message
		})
		//  fetch Category details
		builder.addCase(fetchCategoryAction.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
			state.category = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		})
		builder.addCase(fetchCategoryAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message
		})
		// Update Category
		builder.addCase(updateCategoryAction.pending, (state, action) => {
			state.loading = true
		})
		// Dispatch Action
		builder.addCase(resetEditAction, (state, action) => {
			state.isEdited = true;
		})
		builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
			state.updatedCategory = action?.payload;
			state.isEdited=false;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		})
		builder.addCase(updateCategoryAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message
		})

		// Delete Category
		builder.addCase(deleteCategoryAction.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(resetDeleteAction, (state, action) => {
			state.isDeleted=true
		})
		builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
			state.deletedCategory = action?.payload;
			state.isDeleted = false;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		})
		builder.addCase(deleteCategoryAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message
		})
	}
})

export default categorySlices.reducer