import React from 'react';

import { useRef } from 'react';
import {
	useFormik,
	Formik,
	Form,
	Field,
	ErrorMessage,
	FieldArray,
	FastField,
} from 'formik';
import DropZone from 'react-dropzone';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createPostAction } from '../../redux/slices/posts/postSlices';
import CategoriesOptions from '../Categories/CategoriesOptions';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { useState } from 'react';
import { useEffect } from 'react';

// Form schema
const formSchema = Yup.object({
	title: Yup.string().required('Title is required'),
	description: Yup.string().required('Description is required'),
	category: Yup.object().required('Category is required'),
	blogBannerImage: Yup.string().required('Banner Image is required'),
	blogIconImage: Yup.string().required('Blog Icon Image is required'),
});

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

export default function CreatePost() {
	const [tags, setTags] = useState([]);

	const editor = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// select store data
	const post = useSelector((state) => state?.post);
	const { isCreated, loading, appErr, serverErr } = post;
	// formik
	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			category: '',
			blogBannerImage: '',
			blogIconImage: '',
			tags: [''],
		},
		onSubmit: (values,submitProps) => {
			// dispatch the action
			const data = {
				category: values?.category?.label,
				title: values?.title,
				description: values?.description,
				blogBannerImage: values?.blogBannerImage,
				blogIconImage: values?.blogIconImage,
				tags: values?.tags,
			};

			console.log(
				'🚀 ~ file: CreatePost.js ~ line 75 ~ CreatePost ~ data',
				data
			);
			dispatch(createPostAction(data));
			 submitProps.setSubmitting(false);
		},
		validationSchema: formSchema,
	});
	if (isCreated) navigate('/posts');
	//Banner  Image Preview
	const [blogBannerPreview, setBlogBannerPreview] = useState('');

	let blogBannerImage = formik?.values?.blogBannerImage;
	useEffect(() => {
		if (blogBannerImage) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setBlogBannerPreview(reader.result);
			};
			reader.readAsDataURL(blogBannerImage);
		} else {
			setBlogBannerPreview(null);
		}
	}, [blogBannerImage]);

	//Blog Icon Image Preview
	const [blogIconImagePreview, setBlogIconImagePreview] = useState('');

	let blogIconImage = formik?.values?.blogIconImage;
	useEffect(() => {
		if (blogIconImage) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setBlogIconImagePreview(reader.result);
			};
			reader.readAsDataURL(blogIconImage);
		} else {
			setBlogIconImagePreview(null);
		}
	}, [blogIconImage]);

	// description box
	const config = {
		zIndex: 0,
		readonly: false,
		activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
		toolbarButtonSize: 'middle',
		theme: 'default',
		enableDragAndDropFileToEditor: true,
		enter: 'BR',
		saveModeInCookie: false,
		spellcheck: true,
		editorCssClass: false,
		triggerChangeEvent: true,
		height: 300,
		direction: 'ltr',
		language: 'en',
		debugLanguage: false,
		i18n: 'en',
		tabIndex: -1,
		toolbar: true,

		useSplitMode: false,
		colorPickerDefaultTab: 'background',
		imageDefaultWidth: 500,
		// removeButtons: ['source', 'fullsize', 'about', 'outdent', 'indent', 'video', 'print', 'table', 'fontsize', 'superscript', 'subscript', 'file', 'cut', 'selectall'],
		// disablePlugins: ['paste', 'stat'],
		events: {},
		textIcons: false,
		uploader: {
			insertImageAsBase64URI: true,
		},
		placeholder: 'Start typing',
		showXPathInStatusbar: false,
	};
	// Tags
	const addTag = (e) => {
		console.log(e.target.value, e.key);
		if (e.key === 'Enter') {
			if (e.target.value.length > 0) {
				setTags([...tags, e.target.value]);
				console.log(tags);
			}
			e.target.value = '';
		}
	};
	const removeTag = (removedTag) => {
		console.log(removedTag, 'hello');
		const newTags = tags.filter((tag) => tag !== removedTag);
		setTags(newTags);
	};
	const clearTags = () => {
		setTags([]);
	};
	return (
		<>
			<div className="min-h-screen bg-white flex flex-col justify-center  px-4 sm:px-6 lg:px-8 overflow-hidden relative">
				<div className=" container mt-10 sm:mx-auto sm:w-full sm:max-w-md  ">
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Create Post
					</h2>

					<div className="mt-2 text-center text-sm text-gray-600">
						<p className="font-medium text-green-600 hover:text-indigo-500">
							Share your ideas to the world. Your post must be
							free from Profanity
						</p>
					</div>
					{appErr || serverErr ? (
						<p className="mt-2 text-center text-lg text-red-600">
							{serverErr} {appErr}
						</p>
					) : null}
				</div>
				<div className="mt-8 sm:mx-auto sm:w-full  lg:w-3/4 border-none rounded-xl">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form
							className="space-y-6"
							onSubmit={formik.handleSubmit}
						>
							<div className="">
								<label
									htmlFor="category"
									className="block text-sm mt-2 font-medium text-gray-700"
								>
									Category
								</label>
								<CategoriesOptions
									value={formik.values.category?.label}
									onChange={formik.setFieldValue}
									onBlur={formik.setFieldTouched}
									error={formik.errors.category}
									touched={formik.touched.category}
								/>
							</div>
							{/* Title  */}
							<div>
								<label
									htmlFor="title"
									className="block  text-sm font-medium text-gray-700"
								>
									Title
								</label>
								<div className=" my-1">
									{/* Title */}
									<input
										value={formik?.values?.title}
										onChange={formik?.handleChange('title')}
										onBlur={formik?.handleBlur('title')}
										id="title"
										name="title"
										type="title"
										autoComplete="title"
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
								{/* Err msg */}
								<div className="text-red-500">
									{formik.touched.title &&
										formik.errors.title}
								</div>
							</div>
							{/* Banner Image component */}
							<div>
								<label
									htmlFor="bannerImage"
									className="block text-sm font-medium mb-2 text-gray-700"
								>
									Select an image as your Blog banner
								</label>

								{/* Banner Image preview */}
								{blogBannerPreview ? (
									<div className="border border-gray-300 p-2 bg-gray-100 rounded-md shadow-sm">
										<img
											className="mx-auto  w-2/4"
											src={blogBannerPreview}
											alt=""
											onClick={() => {
												setBlogBannerPreview(null);
											}}
										/>
									</div>
								) : (
									<Container className="container bg-gray-700">
										<DropZone
											onBlur={formik.handleBlur(
												'blogBannerImage'
											)}
											accept="image/jpeg, image/jpg, image/png"
											onDrop={(acceptedFiles) => {
												formik.setFieldValue(
													'blogBannerImage',
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
							{/*Blog Icon Image component */}
							<div>
								<label
									htmlFor="blogIconImage"
									className="block text-sm font-medium mb-2 text-gray-700"
								>
									Select an image as Blog icon
								</label>

								{/* Blog Icon image preview */}
								{blogIconImagePreview ? (
									<div className="border border-gray-300 p-2 bg-gray-100 rounded-md shadow-sm">
										<img
											className="mx-auto  w-1/4"
											src={blogIconImagePreview}
											alt=""
											onClick={() => {
												setBlogIconImagePreview(null);
											}}
										/>
									</div>
								) : (
									<Container className="container bg-gray-700">
										<DropZone
											onBlur={formik.handleBlur(
												'blogIconImage'
											)}
											accept="image/jpeg, image/jpg,image/*, image/png"
											onDrop={(acceptedFiles) => {
												formik.setFieldValue(
													'blogIconImage',
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
							<div>
								<label
									htmlFor="description"
									className="block text-sm mb-2 font-medium text-gray-700"
								>
									Description
								</label>
								{/* Description */}

								<JoditEditor
									ref={editor}
									value={formik.values.description}
									onChange={formik.handleChange(
										'description'
									)}
									config={config}
									onBlur={formik.handleBlur('description')}
									rows="5"
									cols="10"
									className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
									type="text"
								/>

								{/* Err msg */}
								<div className="text-red-500">
									{formik.touched.description &&
										formik.errors.description}
								</div>
							</div>
							{/* Tags  */}
							<div>
								<label
									htmlFor="Keywords"
									className="block  text-sm font-medium text-gray-700"
								>
									Tags
								</label>
								<div className=" my-1">
									{/* Tags */}
									<div className="flex flex-row  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
										{tags.map((tag, index) => (
											<div
												key={index}
												className="border text-lg border-gray-600 px-5  ml-3 rounded "
											>
												{tag}
												<span
													className="text-xl text-red-700 ml-5"
													onClick={() =>
														removeTag(tag)
													}
												>
													X
												</span>
											</div>
										))}
										{tags.length < 5 && (
											<input
												className="text-lg border-0 ml-3 pl-3"
												type="text"
												onKeyDown={addTag}
												placeholder="Tag your Blog with five keywords"
											/>
										)}
										<button className="border ml-auto text-lg border-gray-600 px-5 bg-red-600  rounded ">
											<span
												className="text-xl text-white "
												onClick={() => clearTags()}
											>
												Clear
											</span>
										</button>
									</div>
								</div>
								{/* Tag Err msg */}
								<div className="text-red-500">
									{tags.length > 0 &&
										tags.length < 2 &&
										'Minimum 2 tags reguired'}
								</div>
							</div>
							

							<div className="w-full flex flex-row py-2 px-4 justify-center gap-6  ">
								<button
									type="submit"
									className="w-90  py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
								>
									Draft
								</button>
								<button
									type="submit"
									className="w-90  py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
								>
									Save
								</button>
							</div>
							<div>
								{/* Submit btn */}
								{loading ? (
									<button
										disabled
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Loading please wait...
									</button>
								) : (
									<button
										type="submit"
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
									>
										Publish
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
