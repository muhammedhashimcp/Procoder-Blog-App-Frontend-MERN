import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UploadIcon } from '@heroicons/react/outline';
import DropZone from 'react-dropzone';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { uploadProfileBannerAction } from '../../redux/slices/users/userSlice';
import { useNavigate } from 'react-router-dom';

//Css for dropzone
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
	outline: none;
	transition: border 0.24s ease-in-out;
`;
// Form schema
const formSchema = Yup.object({
	image: Yup.string().required('Image is required'),
});
export default function UploadProfileBanner() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [preview, setPreview] = useState('');

	// formik
	const formik = useFormik({
		initialValues: {
			image: '',
		},
		onSubmit: (values) => {
			console.log(values);
			dispatch(uploadProfileBannerAction(values));
		},
		validationSchema: formSchema,
	});
	// store data
	const user = useSelector((state) => state?.users);
	const { profilePhoto, loading, appErr, serverErr, userAuth } = user;

	// redirect
	if (profilePhoto) {
		navigate(`/profile/${userAuth?._id}`);
	}
	// Image Preview
	let image = formik?.values?.image;
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
	return (
		<section className="min-h-screen  py-20 2xl:py-40 bg-white overflow-hidden">
			<div className="container px-4 mx-auto">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-extrabold text-slate-700">
						Upload Banner Image
					</h2>
					{/* Displya err here */}
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-300">
						<form
							className="space-y-6"
							onSubmit={formik.handleSubmit}
						>
							{/* Image container here thus Dropzone */}
							{appErr || serverErr ? (
								<h2 className="text-center text-red-500">
									{serverErr} {appErr}
								</h2>
							) : null}
							{/* <Container className="">
								<DropZone
									onBlur={formik.handleBlur('image')}
									accept="image/jpeg, image/png"
									onDrop={(acceptedFiles) => {
										formik.setFieldValue(
											'image',
											acceptedFiles[0]
										);
									}}
								>
									{({ getRootProps, getInputProps }) => (
										<div className="container">
											<div
												{...getRootProps({
													className: 'dropzone',
													onDrop: (event) =>
														event.stopPropagation(),
												})}
											>
												<input {...getInputProps()} />
												<p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
													Click here to select image
												</p>
											</div>
										</div>
									)}
								</DropZone>
							</Container> */}
							<div>
								
								{/* image preview */}
								{preview ? (
									<div className="border border-gray-300 p-2 bg-gray-100 rounded-md shadow-sm">
										<img
											className="mx-auto   w-2/4"
											src={preview}
											alt=""
											onClick={() => {
												setPreview(null);
											}}
										/>
									</div>
								) : (
									<Container className="container bg-gray-700">
										<DropZone
											onBlur={formik.handleBlur(
												'image'
											)}
											accept="image/jpeg, image/jpg,image/*, image/png"
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
															image
														</p>
													</div>
												</div>
											)}
										</DropZone>
									</Container>
								)}
							</div>
							<div className="text-red-500">
								{formik.touched.image && formik.errors.image}
							</div>
							<p className="text-sm text-gray-500">
								PNG, JPG, GIF minimum size 400kb uploaded only 1
								image
							</p>

							<div>
								{loading ? (
									<button
										disabled
										className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
									>
										<UploadIcon
											className="-ml-1 mr-2 h-5  text-gray-400"
											aria-hidden="true"
										/>
										<span>Loading Please Wait</span>
									</button>
								) : (
									<button
										type="submit"
										className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
									>
										<UploadIcon
											className="-ml-1 mr-2 h-5  text-gray-400"
											aria-hidden="true"
										/>
										<span>Upload Photo</span>
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
		// <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
		// 	<div className="sm:mx-auto sm:w-full sm:max-w-md">
		// 		<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
		// 			Upload profile photo
		// 		</h2>
		// 	</div>
		// 	<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		// 		<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
		// 			<form className="space-y-6" onSubmit={formik.handleSubmit}>
		// 				{/* Image container here thus Dropzone */}
		// 				{appErr || serverErr ? (
		// 					<h1 className="text-center text-red-500">
		// 						{serverErr} {appErr}
		// 					</h1>
		// 				) : null}
		// 				<Container>
		// 					<DropZone
		// 						onBlur={formik.handleBlur('image')}
		// 						accept="image/jpeg, image/png"
		// 						onDrop={(acceptedFiles) => {
		// 							formik.setFieldValue(
		// 								'image',
		// 								acceptedFiles[0]
		// 							);
		// 						}}
		// 					>
		// 						{({ getRootProps, getInputProps }) => (
		// 							<div className="container">
		// 								<div
		// 									{...getRootProps({
		// 										className: 'dropzone',
		// 										onDrop: (event) =>
		// 											event.stopPropagation(),
		// 									})}
		// 								>
		// 									<input {...getInputProps()} />
		// 									<p className="text-gray-300 text-lg cursor-pointer">
		// 										Click here to select Image
		// 									</p>
		// 								</div>
		// 							</div>
		// 						)}
		// 					</DropZone>
		// 				</Container>
		// 				<div className="text-red-500">
		// 					{formik.touched.image && formik.errors.image}
		// 				</div>
		// 				<p className="text-sm text-gray-500">
		// 					PNG, JPG, GIF minimum size 400kb uploaded only 1
		// 					image
		// 				</p>
		// 				<div>
		// 					{loading ? (
		// 						<button
		// 							disabled
		// 							className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-500 "
		// 						>
		// 							<UploadIcon
		// 								className="-ml-1 mr-2 h-5  text-gray-400"
		// 								aria-hidden="true"
		// 							/>
		// 							<span>Upload Photo</span>
		// 						</button>
		// 					) : (
		// 						<button
		// 							type="submit"
		// 							className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
		// 						>
		// 							<UploadIcon
		// 								className="-ml-1 mr-2 h-5  text-gray-400"
		// 								aria-hidden="true"
		// 							/>
		// 							<span>Upload Photo</span>
		// 						</button>
		// 					)}
		// 				</div>
		// 			</form>
		// 		</div>
		// 	</div>
		// </div>
	);
}
