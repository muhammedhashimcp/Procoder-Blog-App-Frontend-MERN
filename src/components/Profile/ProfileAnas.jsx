import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
// import { ExclamationIcon } from '@heroicons/react/solid';
// import { FcApprove } from 'react-icons/fc';
import DateFormater from '../../utils/DateFormatter';
import { MailIcon, EyeIcon } from '@heroicons/react/solid';
import {
	userProfileAction,
	followUserAction,
	unFollowUserAction,
} from '../../redux/slices/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../utils/LoadingComponent';
import { number } from 'yup/lib/locale';
import webDevBanner from '../../img/webDefaultBanner.jpg';
import capitalName from '../../utils/capitalName';
export default function Profile() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const {
		profile,
		profileLoading,
		profileServerErr,
		profileAppErr,
		followed,
		unFollowed,
		userAuth,
	} = useSelector((state) => state.users);
	const isLoggedUser = userAuth?._id === id;
	let isFollowing;
	profile?.followers?.forEach((row) => {
		if (row?._id.toString() === userAuth?._id.toString())
			isFollowing = true;
		else isFollowing = false;
	});
	const [data, setData] = useState([]);
	const [displayData, setDisplayData] = useState('My Followers');
	const [number, setNumber] = useState(0);
	useEffect(() => {
		dispatch(userProfileAction(id));
	}, [dispatch, id, followed, unFollowed]);
	return (
		<>
			<section className="min-h-screen bg-white ">
				<div className="container px-4 mx-auto">
					{profileLoading ? (
						<div className="flex justify-center align-center">
							<LoadingComponent />
						</div>
					) : profileAppErr || profileServerErr ? (
						<h2 className="text-2xl font-bold min-h-screen flex justify-center items-center">
							{profileServerErr} {profileAppErr}
						</h2>
					) : (
						<div className="h-screen flex bg-white ">
							{/* Static sidebar for desktop */}
							<div className="flex flex-col min-w-0 flex-1 ">
								<div className="flex-1 relative z-0 flex ">
									<main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
										<article>
											{/* Profile header */}
											<div className="h-30 relative lg:mx-10 mt-4 flex justify-center object-cover border border-slate-800  rounded-2xl  p-2 ">
												<img
													className=" w-full  h-auto border border-spacing-3 border-slate-400 object-cover   rounded-2xl mx-10"
													src={
														profile?.bannerImage
															? profile?.bannerImage
															: webDevBanner
													}
													alt={profile?.firstName}
												/>
												{/* <img
													className=" w-full h-30 border border-spacing-3 border-slate-400 object-cover   rounded-2xl mx-10"
													src={
														profile?.bannerImage
															? profile?.bannerImage
															: webDevBanner
													}
													alt={profile?.firstName}
												/> */}
												<div className="absolute text-md bg-gray-300  p-1 hover:bg-slate-900 hover:text-white border-none rounded-lg top-5 left-0 ml-5 lg:ml-20">
													Date Joined:{' '}
													<DateFormater
														date={
															profile?.createdAt
														}
													/>
												</div>
												<div class="absolute bottom-4 right-0 mr-5 md:mr-20">
													<div className=" sm:block top-24   z-10">
														{profile?.isAccountVerified ? (
															<h3 className="  rounded-md px-3 py-2  inline-flex text-lg font-medium bg-green-400 hover:bg-green-600 text-white">
																{/* <FontAwesomeIcon
												/media/hashimcp/BROCAMP/procoder-blog-app-frontend/src/components/Profile/ProfileAnas.jsx
												icon="fa-regular fa-badge-check"
																	className="w-6 h-6 text-md  mx-1 font-medium text-yellow-500"
																/> */}
																<span className="hidden lg:block ">
																	{' '}
																	Verified
																	Account
																</span>
															</h3>
														) : (
															<h3 className=" rounded-lg p-2 inline-flex  text-md font-medium bg-red-600 text-gray-300">
																<ExclamationIcon className="w-6 h-6 text-md  mx-1 font-medium text-yellow-600" />
																<span className="hidden lg:block ">
																	{' '}
																	Unverified
																	Account
																</span>
															</h3>
														)}
													</div>
												</div>
												{isLoggedUser && (
													<div className="absolute text-xl text-green-300 top-5 right-0 mr-5 md:mr-20">
														{/* Upload banner photo */}
														<Link
															className=" pr-3  relative inline-flex items-center   px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-blac focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
															to={`/upload-profile-banner`}
															state={{
																banner: true,
															}}
														>
															<UploadIcon
																className=" h-5 w-5 text-white"
																aria-hidden="true"
															/>
															<span className="hidden lg:block">
																Change
															</span>
														</Link>
													</div>
												)}
											</div>
											<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
												<div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
													<div className="flex -mt-20">
														<img
															className="z-10 h-24 w-24 rounded-full shadow-2xl shadow-gray-500 ring-4 ring-white sm:mx-50 sm:h-52 sm:w-52 lg:w-60 lg:h-60"
															src={
																profile?.profilePhoto
															}
															alt={
																profile?.fullName
															}
														/>
													</div>
													<div className=" mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
														<div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
															<h1 className="text-3xl my-2 mx-auto  font-bold text-gray-900  ">
																{capitalName(
																	profile?.firstName
																)}{' '}
																{capitalName(
																	profile?.lastName
																)}
																{/* Display if verified or not */}
															</h1>
															<div className="flex  space-x-2 mx-2">
																{isLoggedUser && (
																	<button
																		onClick={() => {
																			setData(
																				profile?.viewedBy
																			);
																			setDisplayData(
																				'Who Viewed My Profile'
																			);
																			setNumber(
																				profile
																					?.viewedBy
																					?.length
																			);
																		}}
																		className="cursor-pointer   text-blue-600 mt-2 mb-2 py-1  px-2 border rounded-lg hover:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500    "
																	>
																		{
																			profile
																				?.viewedBy
																				?.length
																		}{' '}
																		Profile
																		View
																	</button>
																)}
																<button
																	onClick={() => {
																		setData(
																			profile?.followers
																		);
																		setDisplayData(
																			'My Followers'
																		);
																		setNumber(
																			profile
																				?.followers
																				?.length
																		);
																	}}
																	className="cursor-pointer  text-blue-600 mt-2 mb-2 py-1  px-2 border rounded-lg hover:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 "
																>
																	{
																		profile
																			?.followers
																			?.length
																	}{' '}
																	followers
																</button>
																<button
																	onClick={() => {
																		setData(
																			profile?.following
																		);
																		setDisplayData(
																			'Folloing Profiles'
																		);
																		setNumber(
																			profile
																				?.following
																				?.length
																		);
																	}}
																	className="cursor-pointer  text-blue-600 mt-2 mb-2 py-1  px-2 border rounded-lg hover:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 "
																>
																	{
																		profile
																			?.following
																			?.length
																	}{' '}
																	following
																</button>
															</div>
															{/* is login user */}
															{/* Upload profile photo */}
															{isLoggedUser && (
																<Link
																	to={`/upload-profile-photo`}
																	state={{
																		banner: false,
																	}}
																	className="inline-flex justify-center w-full sm:w-48 sm px-4 py-2  lg:mx-2 my-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
																>
																	<UploadIcon
																		className="-ml-1 mr-2 h-5 w-5 text-gray-400"
																		aria-hidden="true"
																	/>
																	<span>
																		Upload
																		Photo
																	</span>
																</Link>
															)}
															{/* Update Profile */}
															{isLoggedUser ? (
																<Link
																	to={`/update-profile/${profile?._id}`}
																	className="inline-flex justify-center w-full sm:w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
																>
																	<UserIcon
																		className="-ml-1 mr-2 h-5 w-5 text-gray-400"
																		aria-hidden="true"
																	/>
																	<span>
																		Update
																		Profile
																	</span>
																</Link>
															) : null}
														</div>
														<div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
															{/* // Hide follow button from the same */}
															{!isLoggedUser && (
																<div>
																	{isFollowing ? (
																		<button
																			onClick={() =>
																				dispatch(
																					unFollowUserAction(
																						id
																					)
																				)
																			}
																			className="mr-2 inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
																		>
																			<EmojiSadIcon
																				className="-ml-1 mr-2 h-5 w-5 text-gray-400"
																				aria-hidden="true"
																			/>
																			<span>
																				Unfollow
																			</span>
																		</button>
																	) : (
																		<button
																			onClick={() =>
																				dispatch(
																					followUserAction(
																						id
																					)
																				)
																			}
																			type="button"
																			className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
																		>
																			<HeartIcon
																				className="-ml-1 mr-2 h-5 w-5 text-gray-400"
																				aria-hidden="true"
																			/>
																			<span>
																				Follow{' '}
																			</span>
																		</button>
																	)}
																	<></>
																</div>
															)}

															{/* Send Mail */}
															{!isLoggedUser ? (
																<Link
																	to={`/send-mail`}
																	state={{
																		email: profile?.email,
																		id: profile?._id,
																	}}
																	className="inline-flex justify-center bg-indigo-900 px-4 py-2 border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
																>
																	<MailIcon
																		className="-ml-1 mr-2 h-5 w-5 text-gray-200"
																		aria-hidden="true"
																	/>
																	<span className="text-base mr-2  text-bold text-yellow-500">
																		Send
																		Mail
																	</span>
																</Link>
															) : null}
														</div>
													</div>
												</div>
												<div className="hidden sm:block 2xl:hidden mt-10 min-w-0 flex-1">
													{/* <h1 className="text-2xl font-bold text-gray-900 truncate">
                                                    {profile?.fullName}
                                                </h1> */}
												</div>
											</div>
											{/* Tabs */}
											<div className="mt-10 sm:mt-2 2xl:mt-10">
												<div className="border-b border-red-900 mx-10">
													<div className="max-w-5xl mx-auto "></div>
												</div>
											</div>
											<div className="flex justify-center place-items-start flex-wrap   m-3 md:mb-10 border-2 bg-gray-50 rounded-xl">
												<div className="w-full md:w-1/3 px-10 mb-4 md:mb-0  ">
													<h1 className="text-center font-serif  px-10 text-xl mt-6 mb-6">
														{displayData} :{' '}
														{number
															? number
															: displayData ===
															  'My Followers'
															? profile?.followers
																	?.length
															: 0}
													</h1>
													{/* Who view my post */}
													{/* <div> */}
													<ul>
														{data.map((user) => (
															<li className="bg-white my-1 rounded-lg py-4 px-4 border border-gray-600">
																<Link className="flex items-center space-x-4 lg:space-x-6">
																	<div className=" flex justify-center">
															
																		<img
																			className="z-10 h-16 w-16 rounded-full shadow-md shadow-gray-400  ring-white sm:w-52 lg:w-20 lg:h-20"
																			src={
																				profile?.profilePhoto
																			}
																			alt={
																				profile?.fullName
																			}
																		/>
																	</div>
																	<div>
																		<div className="font-medium text-lg leading-6 space-y-1 flex justify-center mb-2">
																			<h3 className="flex items-center  ">
																				{
																					user?.firstName
																				}{' '}
																				{
																					user?.lastName
																				}
																			</h3>
																		</div>
																		<div className="flex flex-row">
																			<h3 className="inline-flex m-1 pt-1  ">
																				{user?.accountType ? (
																					// <FcApproval />
																					<h1>
																						{
																							user.accountType
																						}
																					</h1>
																				) : null}
																			</h3>
																			<div className="m-1 pt-1 ">
																				{user?.isAccountVerified ? (
																					<h3 className="  rounded-md px-3 py-2  inline-flex text-lg font-medium bg-green-400 hover:bg-green-600 text-white">
															
																						<span className="hidden lg:block ">
																							{' '}
																							<span className="mx-auto">
																								{' '}
																								Verified
																								Account
																							</span>
																						</span>
																					</h3>
																				) : (
																					<h3 className=" rounded-lg  inline-flex  text-md font-medium bg-red-600 text-gray-300">
																						<ExclamationIcon className="w-6 h-6 text-md  mx-2 my-auto  font-medium text-yellow-600" />
																						<span className="hidden lg:block mx-auto ">
																							Unverified
																							Account
																						</span>
																					</h3>
																				)}
																			</div>
																		</div>
																	</div>
																</Link>
															</li>
														))}
													</ul>
												</div>

												{/* All my Post */}
												<div className="w-full md:w-2/3 px-4 mb-4 md:mb-0 ">
													<div>
														<h1 className="text-center font-serif px-10 text-xl mt-6 mb-6 ">
															My Post :{' '}
															{
																profile?.posts
																	?.length
															}
														</h1>
													</div>
													{/* Loop here */}
													{profile?.posts?.length <=
													0 ? (
														<h2 className="text-center text-xl">
															No Post Found
														</h2>
													) : (
														profile?.posts?.map(
															(post) => (
																// <div
																// 	key={
																// 		post._id
																// 	}
																// 	className="flex flex-wrap   mt-3  lg:mb-6 border border-slate-400 p-4 rounded-xl"
																// >
																// 	<div className="object-fit flex justify-center  w-full lg:w-1/4">
																// 		<Link
																// 			to={`/posts/${post?._id}`}
																// 		>
																// 			<img
																// 				className="object-cover h-40 rounded"
																// 				src={
																// 					post?.image
																// 				}
																// 				alt="poster"
																// 			/>
																// 		</Link>
																// 	</div>
																// 	<div className="relative w-full lg:w-3/4 pl-4 border-1 ">
																// 		<Link
																// 			to={`/posts/${post?._id}`}
																// 			className="hover:underline"
																// 		>
																// 			<h3 className="absolute   top-0 left-1/2 -translate-x-1/2 mb-1 text-2xl text-gray-800 font-bold font-heading">
																// 				{
																// 					post?.title
																// 				}
																// 			</h3>
																// 		</Link>
																// 		<p className="absolute text-gray-600  line-clamp-3 top-10 ">
																// 			{
																// 				post?.description
																// 			}
																// 		</p>
																// 		<Link
																// 			className=" absolute text-indigo-500 hover:underline bottom-3"
																// 			to={`/posts/${post?._id}`}
																// 		>
																// 			Read
																// 			More...
																// 		</Link>

																// 	</div>
																// </div>
																<div
																	key={
																		post._id
																	}
																	className="flex flex-wrap   mt-3  lg:mb-6 border border-slate-400 p-4 rounded-xl"
																>
																	<div className="object-fit flex justify-center  w-full lg:w-1/4">
																		<Link
																			to={`/posts/${post?._id}`}
																		>
																			<img
																				className="object-cover h-40 rounded"
																				src={
																					post?.image
																				}
																				alt="poster"
																			/>
																		</Link>
																	</div>
																	<div className=" w-full lg:w-3/4 pl-4 border-1 ">
																		<Link
																			to={`/posts/${post?._id}`}
																			className="hover:underline"
																		>
																			<h3 className="  top-0 flex justify-center mb-1 text-2xl text-gray-800 font-bold font-heading">
																				{
																					post?.title
																				}
																			</h3>
																		</Link>
																		<p className=" text-gray-600  line-clamp-3 top-10 ">
																			{
																				post?.description
																			}
																		</p>
																		<Link
																			className="  text-indigo-500 hover:underline bottom-3"
																			to={`/posts/${post?._id}`}
																		>
																			Read
																			More...
																		</Link>
																	</div>
																</div>
															)
														)
													)}
												</div>
											</div>
										</article>
									</main>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</>
	);
}
