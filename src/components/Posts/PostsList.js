import React from 'react';

import { EyeIcon, ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategoriesAction } from '../../redux/slices/category/categorySlice';
import {
	fetchPostsAction,
	toggleAddLikesToPost,
	toggleAddDisLikesToPost,
} from '../../redux/slices/posts/postSlices';
import DateFormatter from '../../utils/DateFormatter';
import LoadingComponent from '../../utils/LoadingComponent';
import {
	HeartIcon,
	EmojiSadIcon,
	UploadIcon,
	UserIcon,
	SaveIcon,
	ShareIcon,
	BookOpenIcon,
	DocumentReportIcon,
	BookmarkIcon,
	UserAddIcon,
	UserCircleIcon,
	UserGroupIcon,
	UserRemoveIcon,
	UsersIcon,
	ExclamationIcon,

} from '@heroicons/react/outline';
import  Sidebar  from '../../DynamicSideBar/Sidebar';
import AnimatedSidebar from '../../DynamicSideBar/AnimatedSidebar';
export default function PostsList() {
	// dispatch
	const dispatch = useDispatch();
	// fetch all categories
	useEffect(() => {
		dispatch(fetchCategoriesAction());
	}, [dispatch]);
	// select post from store
	const post = useSelector((state) => state.post);
	const { postLists, loading, appErr, serverErr, likes, disLikes } = post;
	// select categories from store
	const category = useSelector((state) => state.category);
	const {
		categoryList,
		loading: catLoading,
		appErr: catAppErr,
		serverErr: catServerErr,
	} = category;
	// fetch all posts
	useEffect(() => {
		dispatch(fetchPostsAction(''));
	}, [dispatch, likes, disLikes]);
	return (
		<>
			<section className="">
				{/* <Sidebar /> */}
				<AnimatedSidebar />

				<div className="py-20 bg-white min-h-screen radius-for-skewed z-10">
					{loading ? (
						<div className="flex justify-center">
							<LoadingComponent />
						</div>
					) : null}
					<div className="container mx-auto px-4">
						<div className="mb-16 flex flex-wrap items-center">
							<div className="w-full lg:w-1/4 lg:fixed ">
								{/* <span className="text-green-600 font-bold"> */}
								<span className="text-slate-700 font-bold">
									Latest Posts from our awesome authors
								</span>
								<h2 className="text-4xl text-black lg:text-5xl font-bold font-heading ">
									Latest Post
								</h2>
							</div>
						</div>
						<div className="flex flex-wrap mx-3">
							<div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3 lg:fixed ">
								<div className="py-4 px-6 bg-gray-200 shadow rounded lg:overflow-hidden lg:hover:overflow-y-scroll  lg:max-h-[600px]">
									<h4 className="mb-4 text-slate-700 text-xl font-bold uppercase flex justify-center">
										Categories
									</h4>
									<ul>
										<p
											onClick={() =>
												dispatch(fetchPostsAction())
											}
											className="cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gray-700 flex justify-center"
										>
											View All Posts
										</p>
										{catLoading ? (
											<div className="flex justify-center">
												<LoadingComponent />
											</div>
										) : catAppErr || catServerErr ? (
											<h1>
												{catServerErr} {catAppErr}
											</h1>
										) : categoryList?.length <= 0 ? (
											<h1>No Category Found</h1>
										) : (
											categoryList?.map((category) => (
												<li key={category.id}>
													<p
														onClick={() =>
															dispatch(
																fetchPostsAction(
																	category.title
																)
															)
														}
														className="block cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gray-500"
													>
														{category.title}
													</p>
												</li>
											))
										)}
									</ul>
								</div>
							</div>
							<div className="w-full lg:ml-[25%] lg:w-3/4 px-5 ">
								{/* Post goes here */}

								{appErr || serverErr ? (
									<p className="mt-2 text-center text-lg text-red-600">
										{serverErr} {appErr}
									</p>
								) : postLists?.length <= 0 ? (
									<h1>No Post Found</h1>
								) : (
									postLists?.map((post, index) => (
										<div
											key={index}
											className="flex flex-wrap bg-[#F1F5F9] mb-4 lg:mb-6 border border-gray-400 rounded-xl mx-auto p-10"
										>
											<div className="mx-auto  w-full lg:w-1/4">
												<Link
													to={`/posts/${post?._id}`}
												>
													{/* Post image */}
													<img
														className=" h-60 mx-auto rounded object-fit"
														src={post?.blogImage}
														alt=""
													/>
												</Link>
												{/* Likes, views dislikes */}
												<div className="flex flex-row bg-gray-300 justify-center w-full  items-center mt-2">
													{/* Likes */}
													<div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
														{/* Togle like  */}
														<div className="">
															<ThumbUpIcon
																onClick={() =>
																	dispatch(
																		toggleAddLikesToPost(
																			post?._id
																		)
																	)
																}
																className="h-7 w-7 text-indigo-600 cursor-pointer"
															/>
														</div>
														<div className="pl-2 text-gray-600">
															{post?.likes?.length
																? post?.likes
																		?.length
																: 0}
														</div>
													</div>
													{/* Dislike */}
													<div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
														<div>
															<ThumbDownIcon
																onClick={() =>
																	dispatch(
																		toggleAddDisLikesToPost(
																			post?._id
																		)
																	)
																}
																className="h-7 w-7 cursor-pointer text-gray-600"
															/>
														</div>
														<div className="pl-2 text-gray-600">
															{post?.disLikes
																?.length
																? post?.disLikes
																		?.length
																: 0}
														</div>
													</div>
													{/* Views */}
													<div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
														<div>
															<EyeIcon className="h-7 w-7  text-gray-400" />
														</div>
														<div className="pl-2 text-gray-600">
															{post?.numViews}
														</div>
													</div>
												</div>
											</div>
											<div className=" relative flex flex-col w-full lg:w-3/4 px-3 mt-10 lg:mt-0 ">
												<Link
													to={`/posts/${post?._id}`}
													className="hover:underline"
												>
													<h3 className="absolute left-1/2 -translate-x-1/2 mb-1 text-2xl text-gray-800 font-bold font-heading">
														{post?.title}
													</h3>
												</Link>

												<div
													style={{
														overflow: 'hidden',
														textOverflow:
															'ellipsis',
														height: '150px',
													}}
													className="text-black absolute top-10 line-clamp-5"
													dangerouslySetInnerHTML={{
														__html: post?.description,
													}}
												></div>

												{/* Read more */}
												<Link
													to={`/posts/${post?._id}`}
													className="text-indigo-500 hover:underline absolute my-auto bottom-10"
												>
													<p className="text-blue-700 cursor-pointer mb-8">
														Read More..
													</p>
												</Link>
												{/* User Avatar */}
												<div className="absolute  bottom-2 ">
													<div className='inline-flex'>
														<div className="">
															<Link
																to={`/profile/${post?.user?._id}`}
															>
																<img
																	className="h-10 w-10 rounded-full"
																	src={
																		post
																			?.user
																			?.profilePhoto
																	}
																	alt=""
																/>
															</Link>
														</div>
														<div className="ml-3">
															<p className="text-sm font-medium text-gray-900">
																<Link
																	to={`/profile/${post?.user?._id}`}
																	className="text-slate-800 md:text-xl hover:underline "
																>
																	{
																		post
																			?.user
																			?.firstName
																	}
																	{
																		post
																			?.user
																			?.lastName
																	}
																</Link>
															</p>
															<div className="flex space-x-1 text-sm text-gray-500 font-semibold">
																<time>
																	<DateFormatter
																		date={
																			post?.createdAt
																		}
																	/>
																</time>
															</div>
														</div>
													</div>
												</div>
												<div className=" mt-auto flex items-center">
													<div className="flex flex-row bottom-3 ml-10 absolute left-1/2 -translate-x-1/2">
														<SaveIcon className="text-black w-10 h-7" />
														<BookmarkIcon className="text-black w-10 h-7" />
														{/* <UserRemoveIcon className="text-black w-10 h-7" />
														<UserAddIcon className="text-black w-10 h-7" />
														<UserCircleIcon className="text-black w-10 h-7" />
														<UserGroupIcon className="text-black w-10 h-7" />
														<UserIcon className="text-black w-10 h-7" />
														<UsersIcon className="text-black w-10 h-7" />
														<ShareIcon className="text-black w-10 h-7" />
														<BookOpenIcon className="text-black w-10 h-7" />
														<DocumentReportIcon className="text-black w-10 h-7" /> */}
													</div>
												</div>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="bg-gray-900">
					<div className="skew bg-green-500 skew-bottom mr-for-radius">
						<svg
							className="h-8 md:h-12 lg:h-10 w-full text-gray-900"
							viewBox="0 0 10 10"
							preserveAspectRatio="none"
						>
							<polygon
								fill="currentColor"
								points="0 0 10 0 0 10"
							></polygon>
						</svg>
					</div>
					<div className="skew bg-gray-500  skew-bottom ml-for-radius">
						<svg
							className="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
							viewBox="0 0 10 10"
							preserveAspectRatio="none"
						>
							<polygon
								fill="currentColor"
								points="0 0 10 0 10 10"
							></polygon>
						</svg>
					</div>
				</div>
			</section>
		</>
	);
}
