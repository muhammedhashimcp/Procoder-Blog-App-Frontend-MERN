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
import * as DOMPurify from 'dompurify';
import {
	DocumentReportIcon,
	SaveIcon,
	ShareIcon,
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
	ExclamationIcon,
} from '@heroicons/react/outline';
export default function PostsList() {
	const user = useSelector((state) => state?.users);
	const { userAuth } = user;
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
				<div className="mb-5 flex flex-wrap items-center">
					<div className="w-full flex items-center justify-center ">
						{/* <span className="text-green-600 font-bold"> */}
						<span className="text-slate-900 text-2xl font-bold">
							Trending Posts from our awesome authors
						</span>
					</div>
				</div>
				<div className="flex flex-wrap mx-3">
					<div className="w-full lg:mx-[10%] x-5 ">
						{/* Post goes here */}

						{appErr || serverErr ? (
							<p className="mt-2 text-center text-lg text-red-600">
								{serverErr} {appErr}
							</p>
						) : postLists?.length <= 0 ? (
							<h1>No Post Found</h1>
						) : (
							postLists?.slice(0,10).map((post, index) => (
								<div
									key={index}
									className="mt-5  flex flex-wrap lg:h-92  bg-gray-300 -mx-3  lg:mb-6 shadow-md shadow-gray-500 "
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
														? post?.likes?.length
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
													{post?.disLikes?.length
														? post?.disLikes?.length
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
										<div className="mt-10 flex justify-between">
											{/* User Avatar */}
											<div className=" flex items-center ">
												<div className="my-3 flex-shrink-0 ">
													<Link>
														<img
															className="h-12 w-12 mx-3 rounded-full"
															src={
																post?.user
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
																post?.user
																	?.firstname
															}
															haifgdasgfg{' '}
															{
																post?.user
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
											
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</section>
		</>
	);
}
