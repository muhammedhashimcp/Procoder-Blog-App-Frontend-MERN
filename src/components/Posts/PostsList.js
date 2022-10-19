import React, { useState } from 'react';

import { EyeIcon, ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategoriesAction } from '../../redux/slices/category/categorySlice';
import { FaRegBookmark, FaBookmark, FaFlag, FaRegFlag } from 'react-icons/fa';
import * as DOMPurify from 'dompurify';

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
import Sidebar from '../../DynamicSideBar/Sidebar';
import AnimatedSidebar from '../../DynamicSideBar/AnimatedSidebar';
export default function PostsList() {
	// dispatch
	const dispatch = useDispatch();
	const [search, setSearch] = useState('');
	// fetch all categories
	useEffect(() => {
		dispatch(fetchCategoriesAction());
	}, [dispatch]);
	// select post from store
	const post = useSelector((state) => state.post);
	const { userAuth } = useSelector((state) => state.users);
	const {
		postLists,
		loading,
		appErr,
		serverErr,
		likes,
		disLikes,
		pageNumber,
		savedPost,
		savedList,
		saved,
		deleted,
		reports,
	} = post;
	// select categories from store
	const category = useSelector((state) => state.category);

	// fetch all posts
	useEffect(() => {
		dispatch(fetchPostsAction(''));
	}, [dispatch, likes, disLikes]);
	return (
		<>
			<AnimatedSidebar category={category} />
			<section className="flex justify-center bg-gray-200">
				<div className="py-20  min-h-screen radius-for-skewed mx-auto">
					<div className="container  mx-auto ">
						<div className="flex justify-center  ">
							<div className="flex border border-gray-300 rounded">
								<input
									onChange={(event) => {
										setSearch(event.target.value);
									}}
									type="text"
									className="block w-96  py-2 text-black-700 bg-white border rounded-md focus:border-gray-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
									placeholder="Search..."
								/>
								<button className="px-4 text-white bg-black hover:bg-gray-500  border-l rounded ">
									Search
								</button>
							</div>
						</div>

						<div className="mb-20 flex justify-center items-center">
							<div className="w-full ml-10 lg:w-1/2  ">
								<span className="text-black-600 font-bold font-serif text-blue-400">
									Latest Posts from our awesome authors
								</span>
								<h2 className="text-4xl text-black-300 lg:text-5xl font-bold font-serif font-heading">
									Latest Post
								</h2>
							</div>
							<div className=" block text-right w-1/2 p-2">
								{/* View All */}
								{/* <button
									onClick={() =>
										dispatch(fetchAllPostAction(''))
									}
									className=" ml-4 inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-black hover:bg-gray-700 text-gray-50 font-bold leading-loose transition duration-200"
								>
									All Posts
								</button> */}
							</div>
						</div>
						<div className="flex flex-wrap -mx-3">
							<div className="w-full lg:w-[90vw] px-7 shadow-md shadow-gray-500">
								{/* Post goes here */}

								{
									// loading ? (
									//   <h1>Loading...</h1>
									// ) :
									appErr || serverErr ? (
										<h1 className="text-black text-lg text-center">
											{catAppErr} {catServerErr}
										</h1>
									) : postLists?.length <= 0 ? (
										<div className="">
											<div className="">
												<Link
													to="/create-post"
													className="pr-3mr-2 px-4 py-2 border border-transparent shadow-lg shadow-gray-400 text-sm font-medium rounded-md text-white bg-gray-800  hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
												>
													<span>Creat New Post</span>
												</Link>
											</div>

											<div className="max-w-screen-lg mx-auto pb-10 flex justify-center  ">
												<img
													className="w-full"
													src={noPosts}
													alt={noPosts}
												/>
											</div>
										</div>
									) : (
										postLists
											?.filter((val) => {
												if (search === '') {
													return val;
												} else if (
													val.title
														.toLowerCase()
														.includes(
															search.toLocaleLowerCase()
														)
												) {
													return val;
												}
											})
											?.map((post) => (
												<div
													className="flex flex-wrap bg-gray-300 mx-3 my-2  lg:mb-6 shadow-md shadow-gray-500 "
													key={post._id}
												>
													<div className=" mb-10 w-full h-41 lg:w-1/4 px-8 py-8 p-20">
														<Link>
															{/* Post image */}
															<img
																className=" mt-4 w-full h-30 object-cover rounded"
																src={
																	post?.image
																}
																alt=""
															/>
														</Link>
														{/* Likes, views dislikes */}
														<div className="p-4  flex flex-row bg-gray-300 justify-center w-full  items-center ">
															{/* Likes */}
															<div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
																{/* Toggle like  */}

																<div className="">
																	{savedList &&
																	savedList[0]?.post?.find(
																		(
																			element
																		) =>
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
																			className=" h-4 w-4 text-blue-600 cursor-pointer"
																		/>
																	) : (
																		<FaRegBookmark
																			onClick={() => {
																				tostAlert(
																					`${post?.title} saved successfully`
																				);
																				dispatch(
																					savedPostAction(
																						post?._id
																					)
																				);
																			}}
																			className=" h-4 w-4 text-gray-500 cursor-pointer"
																		/>
																	)}
																</div>

																{post?.likes.includes(
																	userAuth?._id
																) ? (
																	<div className="ml-4">
																		<ThumbUpIcon
																			onClick={() =>
																				dispatch(
																					toggleAddLikesToPostAction(
																						post?._id
																					)
																				)
																			}
																			className=" h-5 w-5 text-blue-600 cursor-pointer"
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
																			className=" h-5 w-5 text-gray-600 cursor-pointer"
																		/>
																	</div>
																)}

																<div className="text-gray-600 ">
																	{post?.likes
																		?.length
																		? post
																				?.likes
																				?.length
																		: 0}
																</div>
															</div>
															{/* Dislike */}
															<div className="flex flex-row  justify-center items-center  mr-4 pb-2 pt-1 ">
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
																			className="h-5 w-5 cursor-pointer text-red-600"
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
																			className="h-5 w-5 cursor-pointer text-gray-600"
																		/>
																	</div>
																)}

																<div className=" text-gray-600">
																	{post
																		?.disLikes
																		?.length
																		? post
																				?.disLikes
																				?.length
																		: 0}
																</div>
															</div>
															{/* Views */}
															<div className="flex flex-row justify-center items-center  mr-4 pb-2 pt-1">
																<div>
																	<EyeIcon className="h-5 w-5  text-gray-400" />
																</div>
																<div className=" text-gray-600">
																	{
																		post?.numViews
																	}
																</div>
															</div>
															{/* reports */}
															{/* <div className="flex flex-row justify-center items-center  mr-4 pb-2 pt-1">
                                <div>
                                  <FlagIcon className="h-5 w-5  text-gray-400" />
                                </div>
                                <div className=" text-gray-600">
                                  {post?.reports?.length}
                                </div>
                              </div> */}

															{post?.reports?.includes(
																userAuth?._id
															) ? (
																<div className="">
																	<FaFlag
																		// onClick={() =>
																		//   dispatch(
																		//     toggleAddLikesToPostAction(post?._id)
																		//   )
																		// }
																		className=" h-5 w-5 text-black-600 cursor-pointer"
																	/>
																</div>
															) : (
																<div className="">
																	<FaRegFlag
																		onClick={() =>
																			dispatch(
																				reportPostAction(
																					post?._id
																				)
																			)
																		}
																		className=" h-5 w-5 text-gray-600 cursor-pointer"
																	/>
																</div>
															)}
															<div className="text-gray-600 ">
																{post?.reports
																	?.length
																	? post
																			?.reports
																			?.length
																	: 0}
															</div>
														</div>
													</div>

													<div className="w-full lg:w-[90vw] px-auto px-3">
														<Link className="hover:underline">
															<h3 className="mb-1 pt-12 text-2xl text-black-400 font-bold font-heading">
																{/* {capitalizeWord(post?.title)} */}
																{post?.title}
															</h3>
														</Link>

														<div
															className="text-black truncate "
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
														{/* User Avatar */}
														<div className=" flex items-center ">
															<div className="mt-3 flex-shrink-0 ">
																<Link>
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
															<div className="ml-3 ">
																<p className=" text-sm font-medium text-gray-900 mt-4">
																	<Link
																		to={`/profile/${post?.user?._id}`}
																		className="text-black-400 hover:underline "
																	>
																		{
																			post
																				?.user
																				?.firstname
																		}{' '}
																		{
																			post
																				?.user
																				?.lastname
																		}
																	</Link>
																</p>
																<div className="flex space-x-1 text-sm text-black-500">
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
														{/* <p className="text-gray-500">
                             Quisque id sagittis turpis. Nulla sollicitudin rutrum
                             eros eu dictum...
                           </p> */}
													</div>
												</div>
											))
									)
								}
							</div>
						</div>
					</div>
				</div>
				{/* <div className="bg-gray-900">
          <div className="skew bg-green-500 skew-bottom mr-for-radius">
            <svg
              className="h-8 md:h-12 lg:h-10 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
            </svg>
          </div>
          <div className="skew bg-gray-500  skew-bottom ml-for-radius">
            <svg
              className="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
            </svg>
          </div>
        </div> */}
				{/* <Toaster position="top-center" reverseOrder={false} /> */}
			</section>
		</>
	);
}
