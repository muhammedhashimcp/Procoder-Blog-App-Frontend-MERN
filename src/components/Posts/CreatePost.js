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
	return (
		// <>
		// 	<div className=" container min-h-screen  py-20 2xl:py-40 bg-white overflow-hidden  flex flex-col justify-center py-12 sm:px-6 lg:px-2">
		// 		<div className="sm:mx-auto sm:w-full sm:max-w-md">
		// 			<h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
		// 				Create a Blog here..
		// 			</h1>
		// 			<div className="mt-2 text-center text-sm text-gray-600">
		// 				<p className="font-medium text-gray-600 hover:text-indigo-500">
		// 					Share your ideas to the world. Your Blog must be
		// 					free from profanity
		// 				</p>
		// 			</div>
		// 			{appErr || serverErr ? (
		// 				<div className="mt-2 text-center text-sm text-gray-600">
		// 					<p className="font-lg text-red-600 ">
		// 						{serverErr} {appErr}
		// 					</p>
		// 				</div>
		// 			) : null}
		// 		</div>
		// 		<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		// 			<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-300 ">
		// 				<form
		// 					onSubmit={formik.handleSubmit}
		// 					className="space-y-6"
		// 				>
		// 					<div>
		// 						<label
		// 							htmlFor="title"
		// 							className="block text-sm font-medium text-gray-700"
		// 						>
		// 							Title
		// 						</label>
		// 						<div className="mt-1">
		// 							{/* Title */}
		// 							<input
		// 								value={formik.values.title}
		// 								onChange={formik.handleChange('title')}
		// 								onBlur={formik.handleBlur('title')}
		// 								id="title"
		// 								name="title"
		// 								type="title"
		// 								autoComplete="title"
		// 								className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
		// 							/>
		// 						</div>
		// 						{/* Err msg */}
		// 						<div className="text-red-500">
		// 							{formik?.touched?.title &&
		// 								formik?.errors?.title}
		// 						</div>
		// 					</div>
		// 					<label
		// 						htmlFor="category"
		// 						className="block text-sm font-medium text-gray-700"
		// 					>
		// 						Category
		// 					</label>
		// 					<CategoriesOptions
		// 						value={formik.values.category?.label}
		// 						onChange={formik.setFieldValue}
		// 						onBlur={formik.setFieldTouched}
		// 						error={formik.errors.category}
		// 						touched={formik.touched.category}
		// 					/>
		// 					<div>
		// 						<label
		// 							htmlFor="description"
		// 							className="block text-sm font-medium text-gray-700"
		// 						>
		// 							Blog Content
		// 						</label>
		// 						{/* Description */}
		// 						<JoditEditor
		// 							value={formik.values.description}
		// 							onChange={formik.handleChange(
		// 								'description'
		// 							)}
		// 							onBlur={formik.handleBlur('description')}
		// 							rows="20"
		// 							cols="20"
		// 							className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
		// 							type="text"
		// 						/>
		// 						{/* Image Component */}
		// 						<label
		// 							htmlFor="image"
		// 							className="block text-sm font-medium mt-3 mb-2 text-gray-700"
		// 						>
		// 							Select Banner Image to your Blog
		// 						</label>
		// 						<Container className="container bg-gray-700">
		// 							<DropZone
		// 								onBlur={formik.handleBlur('image')}
		// 								accept="image/jpeg, image/png image/webp"
		// 								onDrop={(acceptedFiles) => {
		// 									formik.setFieldValue(
		// 										'image',
		// 										acceptedFiles[0]
		// 									);
		// 								}}
		// 							>
		// 								{({ getRootProps, getInputProps }) => (
		// 									<div className="container">
		// 										<div
		// 											{...getRootProps({
		// 												className: 'dropzone',
		// 												onDrop: (event) =>
		// 													event.stopPropagation(),
		// 											})}
		// 										>
		// 											<input
		// 												{...getInputProps()}
		// 											/>
		// 											<p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
		// 												Click here to select
		// 												Image
		// 											</p>
		// 										</div>
		// 									</div>
		// 								)}
		// 							</DropZone>
		// 						</Container>
		// 						{/* Err msg */}
		// 						<div className="text-red-500">
		// 							{formik?.touched?.description &&
		// 								formik?.errors?.description}
		// 						</div>
		// 					</div>
		// 					<div>
		// 						{/* Submit btn */}
		// 						{loading ? (
		// 							<button
		// 								disabled
		// 								type="submit"
		// 								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		// 							>
		// 								loading Please Wait...
		// 							</button>
		// 						) : (
		// 							<button
		// 								type="submit"
		// 								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		// 							>
		// 								publish
		// 							</button>
		// 						)}
		// 					</div>
		// 				</form>
		// 			</div>
		// 		</div>
		// 	</div>
		// </>
	// 	<>
	// 		<div className="container min-h-screen bg-zinc-50 flex flex-col justify-center py-12 sm:px-6 lg:px-2">
	// 			<div className="sm:mx-auto sm:w-full sm:max-w-md ">
	// 				<h1 className=" text-center text-3xl font-extrabold text-blue-700 animate-bounce">
	// 					What going in Your Mind?...
	// 				</h1>

	// 				<p className="mt-2 text-center text-sm text-gray-600">
	// 					<p className="font-semibold text-gray-700 hover:text-indigo-500  ">
	// 						Share your ideas to the world. Your post must be
	// 						free from profanity
	// 					</p>
	// 				</p>
	// 			</div>
	// 			<div className="rounded-br-lg shadow-xl">
	// 				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
	// 					<form
	// 						onSubmit={formik.handleSubmit}
	// 						className="space-y-6"
	// 					>
	// 						{/* Category input goes here */}

	// 						<label
	// 							htmlFor="password"
	// 							className="block text-sm font-bold text-indigo-600"
	// 						>
	// 							Select Category
	// 						</label>

	// 						<CategoriesOptions
	// 							value={formik.values.category?.label}
	// 							onChange={formik.setFieldValue}
	// 							onBlur={formik.setFieldTouched}
	// 							error={formik.errors.category}
	// 							touched={formik.touched.category}
	// 						/>

	// 						<div>
	// 							<label
	// 								htmlFor="email"
	// 								className="block text-sm font-bold text-indigo-600"
	// 							>
	// 								Title
	// 							</label>
	// 							<div className="mt-1">
	// 								{/* Title */}
	// 								<input
	// 									value={formik.values.title}
	// 									onChange={formik.handleChange('title')}
	// 									onBlur={formik.handleBlur('title')}
	// 									id="title"
	// 									name="title"
	// 									type="title"
	// 									autoComplete="title"
	// 									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
	// 								/>
	// 							</div>
	// 							{/* Err msg */}
	// 							<div className="text-red-500">
	// 								{formik?.touched?.title &&
	// 									formik?.errors?.title}
	// 							</div>
	// 						</div>

	// 						<div>
	// 							<label
	// 								htmlFor="password"
	// 								className="block text-bold font-medium text-indigo-700"
	// 							>
	// 								Post Content
	// 							</label>
	// 							{/* Description */}
	// 							<JoditEditor
	// 								ref={editor}
	// 								value={formik.values.description}
	// 								onChange={formik.handleChange(
	// 									'description'
	// 								)}
	// 								onBlur={formik.handleBlur('description')}
	// 								rows="5"
	// 								cols="10"
	// 								className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
	// 								type="text"
	// 							/>
	// 							{/* Err msg */}
	// 							<div className="text-red-500">
	// 								{formik?.touched?.description &&
	// 									formik?.errors?.description}
	// 							</div>

	// 							{/* Image component */}
	// 							<label
	// 								htmlFor="password"
	// 								className="block text-sm font-medium mt-3 mb-2 text-indigo-700"
	// 							>
	// 								Select image to upload
	// 							</label>
	// 							<Container className="container bg-gray-700">
	// 								<DropZone
	// 									onBlur={formik.handleBlur('image')}
	// 									accept="image/jpeg, image/png image/webp"
	// 									onDrop={(acceptedFiles) => {
	// 										formik.setFieldValue(
	// 											'image',
	// 											acceptedFiles[0]
	// 										);
	// 									}}
	// 								>
	// 									{({ getRootProps, getInputProps }) => (
	// 										<div className="container">
	// 											<div
	// 												{...getRootProps({
	// 													className: 'dropzone',
	// 													onDrop: (event) =>
	// 														event.stopPropagation(),
	// 												})}
	// 											>
	// 												<input
	// 													{...getInputProps()}
	// 												/>
	// 												<p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
	// 													Click here to select
	// 													image
	// 												</p>
	// 											</div>
	// 										</div>
	// 									)}
	// 								</DropZone>
	// 							</Container>

	// 							{appErr || serverErr ? (
	// 								<p className="mt-2 text-center text-lg text-red-600">
	// 									{serverErr} {appErr}
	// 								</p>
	// 							) : null}
	// 						</div>
	// 						<div>
	// 							{/* Submit btn */}
	// 							{loading ? (
	// 								<button
	// 									disabled
	// 									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
	// 								>
	// 									Loading please wait...
	// 								</button>
	// 							) : (
	// 								<button
	// 									type="submit"
	// 									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-pink-600 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
	// 								>
	// 									Publish
	// 								</button>
	// 							)}
	// 						</div>
	// 					</form>
	// 				</div>
	// 			</div>
	// 		</div>
	// 		{/* <div className="container">
    //   <NewFeed />
    //   </div> */}
	// 	</>
		<>
            <div className="min-h-screen bg-[#F1F5F9] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 " >
                <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-md  ">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
                        Create Post
                    </h2>

                    <p className="mt-2 text-center text-sm text-gray-600">
                        <p className="font-medium text-green-600 hover:text-indigo-500">
                            Share your ideas to the word.
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
                        <form className="space-y-6" onSubmit={formik.handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Title
                                </label>
                                <div className="mt-1">
                                    {/* Title */}
                                    <input
                                        value={formik?.values?.title}
                                        onChange={formik?.handleChange("title")}
                                        onBlur={formik?.handleBlur("title")}
                                        id="title"
                                        name="title"
                                        type="title"
                                        autoComplete="title"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {/* Err msg */}
                                <div className="text-red-500">
                                    {formik.touched.title && formik.errors.title}
                                </div>
                            </div>
                            <CategoryDropDown
                                value={formik.values.category?.label}
                                onChange={formik.setFieldValue}
                                onBlur={formik.setFieldTouched}
                                error={formik.errors.category}
                                touched={formik.touched.category}
                            />
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                {/* Description */}
                                <JoditEditor
                                    
                                    ref={editor}
                                    value={formik?.values?.description}
                                    onChange={formik?.handleChange("description")}
                                    onBlur={formik?.handleBlur("description")}
                                    config={config}
                                    
                                    className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                                    type="text"
                                />
                                {/* <textarea
                                    value={formik.values.description}
                                    onChange={formik.handleChange("description")}
                                    onBlur={formik.handleBlur("description")}
                                    rows="5"
                                    cols="10"
                                    className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                                    type="text"
                                ></textarea> */}
                                {/* Err msg */}
                                <div className="text-red-500">
                                    {formik.touched.description && formik.errors.description}
                                </div>
                                {/* Image component */}
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium mt-3 mb-2 text-gray-700"
                                >
                                    Select image to upload
                                </label>
                                <Container className="container bg-gray-700">
                                    <Dropzone
                                        onBlur={formik.handleBlur("image")}
                                        accept="image/jpeg, image/jpg, image/png"
                                        onDrop={acceptedFiles => {
                                            formik.setFieldValue("image", acceptedFiles[0]);
                                        }}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <div className="container">
                                                <div
                                                    {...getRootProps({
                                                        className: "dropzone",
                                                        onDrop: event => event.stopPropagation(),
                                                    })}
                                                >
                                                    <input {...getInputProps()} />
                                                    <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                                                        Click here to select image
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </Dropzone>
                                </Container>
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
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Create
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
