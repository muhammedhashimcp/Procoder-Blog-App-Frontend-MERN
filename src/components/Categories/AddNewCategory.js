import React from 'react';

import { PlusCircleIcon, BookOpenIcon } from '@heroicons/react/solid';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../redux/slices/category/categorySlice';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Dropzone from 'react-dropzone';
//css for dropzone
const Container = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
border-width: 2px;
border-radius: 2px;
border-style: dashed;
background-color: #fafafa;
color: #bdbdbd;
border-color: gray
transition: border 0.24s ease-in-out;
`;

const formSchema = Yup.object({
	title: Yup.string().required('Categoryr is Required'),
	categoryImage: Yup.string().required('Image is required'),
});

const AddNewCategory = () => {
	const [preview, setPreview] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			title: '',
			image: '',
		},
		onSubmit: (values) => {
			console.log("🚀 ~ file: AddNewCategory.js ~ line 45 ~ AddNewCategory ~ values", values)
			
			const data = {
				title: values?.title,
				image: values?.image,
			};
			dispatch(createCategoryAction(data));
		},
		validationSchema: formSchema,
	});


	// get data from store
	const state = useSelector((state) => state?.category);
	const { loading, appErr, serverErr, isCreated } = state;
	let image = formik?.values?.image;

	console.log("🚀 ~ file: AddNewCategory.js ~ line 61 ~ AddNewCategory ~ formik?.values", formik?.values)
	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(image);
		} else {
			setPreview(null);
		}
	}, [image]);
	// redirect
	if (isCreated) navigate('/category-list');
	return (
		<div className="min-h-screen  bg-white py-12 px-4 sm:px-6 lg:px-8">
			<div className="container px-4 mx-auto">
				<div className="max-w-md w-full space-y-8 mx-auto">
					<div>
						<BookOpenIcon className="mx-auto h-12 w-auto" />
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Add New Category
						</h2>
						<div className="mt-2 text-center text-sm text-gray-600">
							<p className="font-medium text-indigo-600 hover:text-indigo-500">
								These are the categories user will select when
								creating a post
							</p>
							{/* Display error */}
							<div>
								{appErr || serverErr ? (
									<h2 className="text-red-500 text-center text-lg">
										{' '}
										{serverErr} {appErr}
									</h2>
								) : null}
							</div>
						</div>
					</div>
					{/* Form */}
					<form
						onSubmit={formik.handleSubmit}
						className="mt-8 space-y-6"
					>
						<input
							type="hidden"
							name="remember"
							defaultValue="true"
						/>
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="category" className="sr-only">
									Name
								</label>
								{/* Title */}
								<input
									value={formik.values.title}
									onChange={formik.handleChange('title')}
									onBlur={formik.handleBlur('title')}
									type="text"
									autoComplete="text"
									className="appearance-none rounded-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
									placeholder="New Category"
								/>
								<div className="text-red-400 mb-2">
									{formik.touched.title &&
										formik.errors.title}
								</div>
							</div>
							{/* Image component */}

							<div>
								<label
									htmlFor="image"
									className="block text-sm font-medium mb-2 text-gray-700"
								>
									Select a image as category icon
								</label>
								{/* image preview */}
								{preview ? (
									<div className="border border-gray-300 p-2 bg-gray-100 rounded-md shadow-sm">
										<img
											className="mx-auto  w-2/4"
											src={preview}
											alt=""
											onClick={() => {
												setPreview(null);
											}}
										/>
									</div>
								) : (
									<Container className="container bg-gray-700">
										<Dropzone
											onBlur={formik.handleBlur('image')}
											accept="image/jpeg, image/jpg, image/png"
											onDrop={(acceptedFiles) => {
												formik.setFieldValue(
													'image',
													acceptedFiles[0]
												);
											}}
										>
											{({
												getRootProps,
												getInputProps,
											}) => (
												<div className="container">
													<div
														{...getRootProps({
															className:
																'dropzone',
															onDrop: (event) =>
																event.stopPropagation(),
														})}
													>
														<input
															{...getInputProps()}
														/>
														<p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
															Click here to select
															Category Image
														</p>
													</div>
												</div>
											)}
										</Dropzone>
									</Container>
								)}
							</div>
						</div>
						<div>
							<div>
								{/* Submit */}
								{loading ? (
									<button
										disabled
										className="group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 "
									>
										<span className=" left-0 inset-y-0 flex items-center pl-3">
											<PlusCircleIcon
												className="h-5 w-5 text-yellow-500 group-hover:text-white"
												aria-hidden="true"
											/>
										</span>
										Loading please wait....
									</button>
								) : (
									<button
										type="submit"
										className="group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										<span className=" left-0 inset-y-0 flex items-center pl-3">
											<PlusCircleIcon
												className="h-5 w-5 text-yellow-500 group-hover:text-white"
												aria-hidden="true"
											/>
										</span>
										Add new Category
									</button>
								)}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddNewCategory;
