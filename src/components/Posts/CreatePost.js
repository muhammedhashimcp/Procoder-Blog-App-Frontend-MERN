import { useMemo, useRef } from 'react';
import { useFormik } from 'formik';
import DropZone from 'react-dropzone';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createPostAction } from '../../redux/slices/posts/postSlices';
import CategoriesOptions from '../Categories/CategoriesOptions';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import RichTextEditor from 'react-rte';
import { useState } from 'react';
import { useEffect } from 'react';

// Form schema
const formSchema = Yup.object({
	title: Yup.string().required('Title is required'),
	description: Yup.string().required('Description is required'),
	category: Yup.object().required('Category is required'),
	image: Yup.string().required('Image is required'),
});

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

export default function CreatePost() {
	const [preview, setPreview] = useState('');
	console.log(
		'🚀 ~ file: CreatePost.js ~ line 40 ~ CreatePost ~ preview',
		preview
	);
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
			image: '',
		},
		onSubmit: (values) => {
			// dispatch the action
			const data = {
				category: values?.category?.label,
				title: values?.title,
				description: values?.description,
				image: values?.image,
			};
			dispatch(createPostAction(data));
		},
		validationSchema: formSchema,
	});
	if (isCreated) navigate('/posts');
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
	// Tags
	const [tags, setTags] = useState([]);
	const addTag = (e) => {
		console.log(e.target.value, e.key);
		if (e.key === 'Enter') {
			console.log('inside the enter');
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
	// console.log(tags);
	return (
		<>
			<div className="min-h-screen bg-white flex flex-col justify-center  px-4 sm:px-6 lg:px-8 overflow-hidden relative">
				<div className=" container mt-10 sm:mx-auto sm:w-full sm:max-w-md  ">
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Create Post
					</h2>

					<p className="mt-2 text-center text-sm text-gray-600">
						<p className="font-medium text-green-600 hover:text-indigo-500">
							Share your ideas to the world. Your post must be
							free from Profanity
						</p>
					</p>
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

							{/* Image component */}

							<div>
								<label
									htmlFor="image"
									className="block text-sm font-medium mb-2 text-gray-700"
								>
									Select a image to banner
								</label>
								{/* image preview */}
								{preview ? (
									<img
										className="mx-auto w-50 h-50"
										src={preview}
										alt=""
										onClick={() => {
											setPreview(null);
										}}
									/>
								) : (
									<Container className="container bg-gray-700">
										<DropZone
											onBlur={formik.handleBlur('image')}
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
									value={formik?.values?.description}
									onChange={formik?.handleChange(
										'description'
									)}
									onBlur={formik?.handleBlur('description')}
									rows="10"
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
									htmlFor="tags"
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
													className='text-xl text-red-700 ml-5'
													onClick={() =>
														removeTag(tag)
													}
												>
													X
												</span>
											</div>
										))}

										<input className='text-lg border-0 ml-3 pl-3' type="text" onKeyDown={addTag} placeholder='Tag your Blog with five keywords'/>
									</div>
									{/* <input
										value={formik?.values?.tags}
										onChange={formik?.handleChange('tags')}
										onBlur={formik?.handleBlur('tags')}
										id="tags"
										name="tags"
										type="text"
										onKeyDown={addTag}
										autoComplete="tags"
										placeholder="Input Tags  to your blog for search "
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>*/}
								</div>
								{/* Err msg */}
								{/* <div className="text-red-500">
									{formik.touched.title &&
										formik.errors.title}
								</div> */}
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
