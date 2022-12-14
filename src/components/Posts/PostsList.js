import { useEffect, useState } from 'react';
import {
	ThumbUpIcon,
	ThumbDownIcon,
	EyeIcon,
	FlagIcon,
} from '@heroicons/react/solid';

import { FaRegBookmark, FaBookmark, FaFlag, FaRegFlag } from 'react-icons/fa';
// import { toast, Toaster } from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import * as DOMPurify from 'dompurify';
// import {
// 	fetchAllPostAction,
// 	toggleAddDisLikesToPostAction,
// 	toggleAddLikesToPostAction,
// 	deleteSavedPostAction,
// 	savedPostAction,
// 	fetchSavedPostAction,
// 	reportPostAction,
// } from '../../redux/slices/posts/postSlices';
import {
	fetchPostsAction,
	toggleAddLikesToPost,
	toggleAddDisLikesToPost,
} from '../../redux/slices/posts/postSlices';

import DateFormatter from '../../utils/DateFormatter';
// import { fetchAllCategoriesAction } from '../../redux/slices/category/categorySlice';
import { fetchCategoriesAction } from '../../redux/slices/category/categorySlice';
import LoadingComponent from '../../utils/LoadingComponent';
import AnimatedSidebar from '../../DynamicSideBar/AnimatedSidebar';
import noPosts from '../../img/noPosts.png';
import noPosts1 from '../../img/noPosts1.png';
import {
	DocumentReportIcon,
	SaveIcon,
	ShareIcon,
	StopIcon,
	ShieldExclamationIcon,
	HeartIcon,
	EmojiSadIcon,
	UploadIcon,
	UserIcon,
	BookOpenIcon,
	BookmarkIcon,
	UserAddIcon,
	UserCircleIcon,
	UserGroupIcon,
	UserRemoveIcon,
	UsersIcon,
	DangerIcon,
} from '@heroicons/react/outline';
import { ExclamationIcon } from '@heroicons/react/solid';
import Pagination from '../pagination/Pagination';
export default function PostsList() {
	// const [search, setSearch] = useState("");
	const [showSidebar, setShowSidebar] = useState(false);

	const [query, setQuery] = useState(' ');
	//dispatch
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Select user from from store
	const user = useSelector((state) => state?.users);
	const { userAuth } = user;

	//select post from store
	const posts = useSelector((state) => state?.post);
	const {
		postLists,
		loading,
		appErr,
		serverErr,
		likes,
		dislikes,
		pageNumber,
		savedPost,
		savedList,
		saved,
		deleted,
		reports,
	} = posts;
	console.log(postLists, 'bbbbbbbbbbbb');

	// const blogsPerPage = 10;
	// const pagesVisited = pageNumber * blogsPerPage;
	// const pageCount = Math.ceil([postLists].length / blogsPerPage);
	// console.log(pageCount, "ghjkl");

	//select category from store
	const category = useSelector((state) => state?.category);
	const {
		categoryList,
		loading: catLoading,
		appErr: catAppErr,
		serverErr: catServerErr,
	} = category;
	console.log(categoryList);

	// fetch post
	useEffect(() => {
		dispatch(fetchPostsAction(''));
		// dispatch(fetchSavedPostAction(''));
		// dispatch(searchPostAction(query));
		//load all the posts from server
		// if (userAuth) {
		//   dispatch(fetchAllPostAction(""));
		// }

		// else {
		//   navigate("/login");
		// }
	}, [dispatch, likes, dislikes, saved, deleted, savedPost, reports, query]);

	// fetch category
	useEffect(() => {
		dispatch(fetchCategoriesAction());
	}, [dispatch]);

	const tostAlert = (msg) => {
		toast.success(msg);
	};

	return (
		<>
			<AnimatedSidebar
				category={category}
				showSidebar={showSidebar}
				setShowSidebar={setShowSidebar}
			/>
			<section>
				<div className="py-20 bg-gray-200 min-h-screen radius-for-skewed ">
					<div className="container mx-auto px-4 ">
						<div className="flex justify-center  mb-3">
							<div className="flex border border-gray-300 rounded">
								<input
									onChange={(event) => {
										setQuery(
											event.target.value.toLowerCase()
										);
									}}
									type="text"
									className="block w-96 px-4 py-2 text-black-700 bg-white border rounded-md focus:border-gray-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
									placeholder="Search..."
								/>
								<button className="px-4 text-white bg-black hover:bg-gray-500  border-l rounded ">
									Search
								</button>
							</div>
						</div>
						{/* Content Div */}
						<div
							className={`flex ml-10 lg:ml-5 ${
								showSidebar ? 'justify-center' : 'justify-end'
							}`}
						>
							<div className="w-full lg:w-3/4 px-7 shadow-md shadow-gray-500">
								{/* Post goes here */}
								<div className="my-10 flex justify-between">
									<div className="my-auto">
										<h3 className="text-xl text-black-300 lg:text-4xl font-bold font-serif font-heading">
											Latest Posts from our awesome
											authors
										</h3>
									</div>
									<div className=" block text-right p-2">
										{/* View All */}
										<button
											onClick={() =>
												dispatch(fetchPostsAction(''))
											}
											className=" ml-4 inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-black hover:bg-gray-700 text-gray-50 font-bold leading-loose transition duration-200"
										>
											All Posts
										</button>
									</div>
								</div>
								{loading ? (
									<div className="flex justify-center">
										<LoadingComponent />
									</div>
								) : appErr || serverErr ? (
									<h1 className="text-black text-lg text-center">
										{catAppErr} {catServerErr}
									</h1>
								) : postLists?.length <= 0 ? (
									<div className="">
										<div className="p-5 justify-center">
											<Link
												to="/create-post"
												className="pr-3mr-2 px-4 py-2 border border-transparent shadow-lg shadow-gray-400 text-sm font-medium rounded-md text-white bg-gray-800  hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
											>
												<span className="">
													Creat New Post
												</span>
											</Link>
										</div>

										<div className="max-w-screen-lg mx-auto pb-10 flex justify-center  ">
											<img
												className="w-96 h-96"
												src={noPosts1}
												alt={noPosts}
											/>
										</div>
									</div>
								) : (
									postLists?.map((post, index) => (
										<div
											key={index}
											className="mt-5 flex flex-wrap lg:h-92  bg-gray-300 -mx-3  lg:mb-6 shadow-md shadow-gray-500 "
										>
											<div className="h-full bg-gray-300  my-5 w-full  lg:w-1/4 px-4 py-4 p-20">
												<Link>
													{/* Post image */}
													<img
														className=" mt-4 w-full h-60 object-cover rounded"
														src={post?.image}
														alt=""
													/>
												</Link>
												{/* Likes, views dislikes */}
												<div className="p-4 flex flex-row bg-gray-300 justify-center px-2 w-full  items-center ">
													{/* Likes */}
													<div className="flex flex-row justify-center items-center mx-3">
														{post?.likes.includes(
															userAuth?._id
														) ? (
															<div className="">
																<ThumbUpIcon
																	onClick={() =>
																		dispatch(
																			toggleAddLikesToPostAction(
																				post?._id
																			)
																		)
																	}
																	className=" h-6 w-6 text-blue-600 cursor-pointer"
																/>
															</div>
														) : (
															<div className="ml-4">
																<ThumbUpIcon
																	onClick={() =>
																		dispatch(
																			toggleAddLikesToPostAction(
																				post?._id
																			)
																		)
																	}
																	className=" h-6 w-6 text-gray-600 cursor-pointer"
																/>
															</div>
														)}
														<div className="text-gray-600 text-xl ml-1">
															{post?.likes?.length
																? post?.likes
																		?.length
																: 0}
														</div>
													</div>
													{/* Dislike */}
													<div className="flex flex-row justify-center items-center mx-3">
														{post?.disLikes.includes(
															userAuth?._id
														) ? (
															<div>
																<ThumbDownIcon
																	onClick={() =>
																		dispatch(
																			toggleAddDislikesToPostAction(
																				post?._id
																			)
																		)
																	}
																	className="h-6 w-6 cursor-pointer text-red-600"
																/>
															</div>
														) : (
															<div>
																<ThumbDownIcon
																	onClick={() =>
																		dispatch(
																			toggleAddDislikesToPostAction(
																				post?._id
																			)
																		)
																	}
																	className="h-6 w-6 cursor-pointer text-gray-600"
																/>
															</div>
														)}
														<div className=" text-gray-600 text-xl ml-1">
															{post?.disLikes
																?.length
																? post?.disLikes
																		?.length
																: 0}
														</div>
													</div>
													{/* Views */}
													<div className="flex flex-row justify-center items-center  mr-4 pb-2 pt-1">
														<div className="flex flex-row justify-center items-center mx-3">
															<EyeIcon className="h-6 w-6  text-gray-400" />
														</div>
														<div className=" text-gray-600 text-xl ml-1">
															{post?.numViews}
														</div>
													</div>
												</div>
											</div>
											<div className="w-full lg:w-3/4 px-10 ">
												<Link className="hover:underline flex justify-center">
													<h3 className="mb-1 pt-6 text-2xl text-black-400 font-bold font-heading">
														{/* {capitalizeWord(post?.title)} */}
														{post?.title.toUpperCase()}
													</h3>
												</Link>
												<div
													className="text-black line-clamp-6 text-justify "
													dangerouslySetInnerHTML={{
														__html: DOMPurify.sanitize(
															post?.description
														),
													}}
												></div>

												{/* Read more */}
												<div className="mt-5">
													<Link
														to={`/posts/${post?._id}`}
														className=" text-gray-500 hover:underline "
													>
														Read More..
													</Link>
												</div>
												<div className="mt-10 my-5 lg:mb-0 flex justify-between">
													{/* User Avatar */}
													<div className=" flex items-center ">
														<div className="my-3 flex-shrink-0 ">
															<Link>
																<img
																	className="h-12 w-12 mx-3 rounded-full"
																	src={
																		post
																			?.user
																			?.profilePhoto
																	}
																	alt=""
																/>
															</Link>
														</div>
														<div className="ml-3 ">
															<p className=" text-md font-medium text-gray-900 ">
																<Link
																	to={`/profile/${post?.user?._id}`}
																	className="text-black-400 text-xl hover:underline "
																>
																	{
																		post
																			?.user
																			?.firstname
																	}
																	haifgdasgfg{' '}
																	{
																		post
																			?.user
																			?.lastname
																	}
																	hai
																</Link>
															</p>
															<div className="flex space-x-1 mt-1 text-sm text-black-500 justify-center">
																<time>
																	<DateFormatter
																		date={
																			post?.createdAt
																		}
																	/>
																</time>
																<span aria-hidden="true">
																	&middot;
																</span>
															</div>
														</div>
													</div>
													{/* save report share */}
													<div className="inline-flex ">
														<div className="mr-10 my-5">
															{savedList &&
															savedList[0]?.post?.find(
																(element) =>
																	element?._id.toString() ===
																	post?._id.toString()
															) ? (
																<FaBookmark
																	onClick={() => {
																		tostAlert(
																			`${post?.title} unsaved successfully`
																		);
																		dispatch(
																			deleteSavedPostAction(
																				post?._id
																			)
																		);
																	}}
																	className=" h-8 w-8 text-blue-600 cursor-pointer"
																/>
															) : (
																<FaRegBookmark
																	onClick={() => {
																		toastAlert(
																			`${post?.title} saved successfully`
																		);
																		dispatch(
																			savedPostAction(
																				post?._id
																			)
																		);
																	}}
																	className=" h-8 w-8   text-gray-500 cursor-pointer"
																/>
															)}
														</div>

														<div className="text-black mr-10 my-5">
															{savedList &&
															savedList[0]?.post?.find(
																(element) =>
																	element?._id.toString() ===
																	post?._id.toString()
															) ? (
																<ShareIcon
																	onClick={() => {
																		tostAlert(
																			`${post?.title} unsaved successfully`
																		);
																		dispatch(
																			deleteSavedPostAction(
																				post?._id
																			)
																		);
																	}}
																	className=" h-8 w-8 text-blue-600 cursor-pointer"
																/>
															) : (
																<ShareIcon
																	onClick={() => {
																		toastAlert(
																			`${post?.title} saved successfully`
																		);
																		dispatch(
																			savedPostAction(
																				post?._id
																			)
																		);
																	}}
																	className=" h-8 w-8   text-gray-500 cursor-pointer"
																/>
															)}
														</div>
														<div className="text-black mr-10 my-5">
															{savedList &&
															savedList[0]?.post?.find(
																(element) =>
																	element?._id.toString() ===
																	post?._id.toString()
															) ? (
																<SaveIcon
																	onClick={() => {
																		tostAlert(
																			`${post?.title} unsaved successfully`
																		);
																		dispatch(
																			deleteSavedPostAction(
																				post?._id
																			)
																		);
																	}}
																	className=" h-8 w-8 text-blue-600 cursor-pointer"
																/>
															) : (
																<SaveIcon
																	onClick={() => {
																		toastAlert(
																			`${post?.title} saved successfully`
																		);
																		dispatch(
																			savedPostAction(
																				post?._id
																			)
																		);
																	}}
																	className=" h-8 w-8   text-gray-500 cursor-pointer"
																/>
															)}
														</div>
														<div className="text-black mr-10 my-5">
															{savedList &&
															savedList[0]?.post?.find(
																(element) =>
																	element?._id.toString() ===
																	post?._id.toString()
															) ? (
																<ExclamationIcon
																	onClick={() => {
																		tostAlert(
																			`${post?.title} unsaved successfully`
																		);
																		dispatch(
																			deleteSavedPostAction(
																				post?._id
																			)
																		);
																	}}
																	className=" h-8 w-8 text-blue-600 cursor-pointer"
																/>
															) : (
																<ExclamationIcon
																	onClick={() => {
																		toastAlert(
																			`${post?.title} saved successfully`
																		);
																		dispatch(
																			savedPostAction(
																				post?._id
																			)
																		);
																	}}
																	className=" h-8 w-8   text-gray-500 cursor-pointer"
																/>
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									))
								)}
								<div className="flex justify-end mb-3">
									<Pagination />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
