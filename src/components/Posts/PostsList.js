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

export default function PostsList() {
	// dispatch
	const dispatch = useDispatch();
	// fetch all categories
	useEffect(() => {
		dispatch(fetchCategoriesAction());
	}, [dispatch]);
	// select post from store
	const post = useSelector((state) => state?.post);
	const { postLists, loading, appErr, serverErr, likes, disLikes } = post;
	// select categories from store
	const category = useSelector((state) => state?.category);
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
			<section className="mt-32">
				<div className="py-20 bg-white min-h-screen radius-for-skewed ">
					<div className="container mx-auto px-4">
						<div className="mb-16 flex flex-wrap items-center">
							{/* <div className="w-full lg:w-1/2 lg:fixed">
								<span class="text-green-600 font-bold">
									<span className="text-slate-700 font-bold">
									Latest Posts from our awesome authors
								</span>
								<h2 className="text-4xl text-black lg:text-5xl font-bold font-heading">
									Latest Posts
								</h2>
							</div> */}
							         <div class="w-full lg:w-1/2 lg:fixed ">
                <span class="text-green-600 font-bold">
                  Latest Posts from our awesome authors
                </span>
                <h2 class="text-4xl text-black lg:text-5xl font-bold font-heading ">
                  Latest Post
                </h2>
              </div>
							{/* View All */}
							{/* <div className=" block text-right w-1/2">
								<button
									onClick={() =>
										dispatch(fetchPostsAction(''))
									}
									className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-gray-50 font-bold leading-loose transition duration-200"
								>
									View All Posts
								</button>
							</div> */}
						</div>
						<div className="flex flex-wrap -mx-3">
							<div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3 lg:fixed">
								<div className="py-4 px-6 bg-gray-200 shadow rounded lg:overflow-hidden lg:hover:overflow-y-scroll  lg:max-h-[600px]">
									{/* <h4 className="mb-4 text-slate-600 font-bold uppercase flex justify-center">
										Categories
									</h4> */}
									<h4 class="mb-4 text-black font-bold uppercase">
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
											<div className='flex flex-row justify-center'>
												<LoadingComponent />
											</div>
										) : catAppErr || catServerErr ? (
											<h1>
												{catServerErr} {catAppErr}
											</h1>
										) : categoryList?.length <= 0 ? (
											<h1 className="text-yellow-400 text-lg text-center">
												No Category Found
											</h1>
										) : (
											categoryList?.map((category) => (
												<li key={category._id}>
													<p
														onClick={() =>
															dispatch(
																fetchPostsAction(
																	category?.title
																)
															)
														}
														className=" cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gray-700 flex justify-center"
													>
														{category?.title}
													</p>
												</li>
											))
										)}
									</ul>
								</div>
							</div>
							<div className="w-full lg:w-3/4 px-3 py-3 ">
								{/* Post goes here */}
								{/* {loading ? <LoadingComponent /> : null} */}
								{appErr || serverErr ? (
									<h1 className="text-red-600 text-center text-lg">
										{serverErr} {appErr}
									</h1>
								) : postLists?.length <= 0 ? (
									<h1 className="text-yellow-400 text-lg   font-bold text-center">
										No Post Found
									</h1>
								) : (
									postLists?.map((post) => (
										<div
											key={post._id}
											className="flex flex-wrap bg-white -mx-3 pb-3 lg:mb-6 shadow  shadow-black"
										>
											<div className="  w-full lg:w-1/4 px-3 ">
												<Link to="">
													{/* Post image */}
													<img
														className="w-full pb-3 object-cover rounded"
														src={post?.image}
														alt=""
													/>
												</Link>
												{/* Likes, views dislikes */}
												<div className="flex flex-row bg-gray-400  justify-center w-full  items-center ">
													{/* Likes */}
													<div className="flex flex-row justify-center items-center ml-4 mr-2 pb-2 pt-1">
														{/* Toggle like  */}
														<div className="">
															<ThumbUpIcon
																onClick={() =>
																	dispatch(
																		toggleAddLikesToPost(
																			post?._id
																		)
																	)
																}
																className="h-7 w-7 text-gray-600 cursor-pointer"
															/>
														</div>
														<div className="pl-1 text-gray-600">
															{
																post?.likes
																	?.length
															}
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
															{
																post?.disLikes
																	?.length
															}
														</div>
													</div>
													{/* Views */}
													<div className="flex flex-row justify-center items-center ml-4 mr-4 py-2">
														<div>
															<EyeIcon className="h-7 w-7  text-gray-400" />
														</div>
														<div className="pl-2 text-gray-600">
															{post?.numViews}
														</div>
													</div>
												</div>
											</div>
											<div className="w-full lg:w-3/4 px-5 flex flex-col ">
												<Link
													to=""
													className="hover:underline"
												>
													<h3 className="mb-1 text-2xl text-slate-800 font-bold font-heading cursor-pointer">
														{/* {capitalizeWord(post?.title)}  */}
														{post?.title}
													</h3>
												</Link>
												{/* <p className="text-gray-300">
													{post?.description}
												</p> */}
												<p class="text-black truncate ">
													{post?.description}
												</p>

												{/* Read more */}
												<Link
													to={`/posts/${post?._id}`}
													className="text-indigo-500 hover:underline"
												>
													Read More...
												</Link>
												{/* User Avatar */}
												<div className="mt-10 flex items-center mt-auto">
													<div className="flex-shrink-0">
														<Link to="">
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
																className="text-slate-800 hover:underline "
															>
																{
																	post?.user
																		?.firstName
																}
																{
																	post?.user
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
															<span aria-hidden="true">
																&middot;
															</span>
														</div>
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
