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
import {toast} from 'react-toastify'
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
toast.success('This is your home page')
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
				<div className="mb-5 flex flex-wrap items-center">
					<div className="w-full flex items-center justify-center ">
						{/* <span className="text-green-600 font-bold"> */}
						<span className="text-slate-900 text-2xl font-bold">
							Latest Posts from our awesome authors
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
							postLists?.map((post, index) => (
								<div
									key={index}
									className="flex flex-wrap bg-[#F1F5F9] mb-4 lg:mb-6 border border-gray-400 rounded-xl mx-auto p-10"
								>
									<div className="mx-auto  w-full lg:w-1/4">
										<Link to={`/posts/${post?._id}`}>
											{/* Post image */}
											<img
												className=" h-60 mx-auto rounded object-fit"
												src={post?.image}
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
														? post?.likes?.length
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
													{post?.disLikes?.length
														? post?.disLikes?.length
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
												textOverflow: 'ellipsis',
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
											className="text-indigo-500 hover:underline absolute bottom-10"
										>
											<p className="text-blue-700 cursor-pointer mb-3">
												Read More..
											</p>
										</Link>
										{/* User Avatar */}
										<div className=" mt-auto flex items-center">
											<div className="flex-shrink-0">
												<Link
													to={`/profile/${post?.user?._id}`}
												>
													<img
														className="h-10 w-10 rounded-full"
														src={
															post?.user
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
														{post?.user?.firstName}
														{post?.user?.lastName}
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
										<div className=" mt-auto flex items-center">
											<div className="flex flex-row bottom-3 ml-10 absolute left-1/2 -translate-x-1/2">
												<SaveIcon className="text-black w-10 h-7" />
												<BookmarkIcon className="text-black w-10 h-7" />
												<UserRemoveIcon className="text-black w-10 h-7" />
												<UserAddIcon className="text-black w-10 h-7" />
												<UserCircleIcon className="text-black w-10 h-7" />
												<UserGroupIcon className="text-black w-10 h-7" />
												<UserIcon className="text-black w-10 h-7" />
												<UsersIcon className="text-black w-10 h-7" />
												<ShareIcon className="text-black w-10 h-7" />
												<BookOpenIcon className="text-black w-10 h-7" />
												<DocumentReportIcon className="text-black w-10 h-7" />
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
