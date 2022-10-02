import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import {
	deletePostAction,
	fetchPostDetailsAction,
} from '../../redux/slices/posts/postSlices';
import { useDispatch, useSelector } from 'react-redux';
import DateFormatter from '../../utils/DateFormatter';
import LoadingComponent from '../../utils/LoadingComponent';
import AddComment from '../Comments/AddComment';
import CommentsList from '../Comments/CommentsList';

const PostDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const navigate = useNavigate();

	// select post details from store
	const post = useSelector((state) => state.post);
	const { postDetails, loading, appErr, serverErr, isDeleted } = post;
	// Get login user
	const user = useSelector((state) => state.users);
	const { userAuth } = user;
	const isCreatedBy = postDetails?.user?._id === userAuth?._id;
	// comment
	const comment = useSelector((state) => state.comment);
	const { commentCreated, commentDeleted } = comment;

	useEffect(() => {
		dispatch(fetchPostDetailsAction(id));
	}, [id, dispatch, commentCreated, commentDeleted]);
	// redirect
	if (isDeleted) {
		navigate('/posts');
	}
	return (
		<div>
			{loading ? (
				<div className="h-screen">
					<LoadingComponent />{' '}
				</div>
			) : appErr || serverErr ? (
				<h1 className="h-screen text-red-400 text-xl">
					{serverErr} {appErr}
				</h1>
			) : (
				<section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
					<div className="container px-4 mx-auto">
						{/* Post Image */}
						<img
							className="mb-24 w-96 h-96 rounded-lg object-cover"
							src={postDetails?.image}
							alt=""
						/>
						<div className="max-w-2xl mx-auto text-center">
							<h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
								{post?.title}
							</h2>
							{/* User */}
							<div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
								<img
									className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
									src={postDetails?.user?.profilePhoto}
									alt=""
								/>
								<div className="text-left">
									<Link
										to={`/profile/${postDetails?.user?._id}`}
									>
										<h4 className="mb-1 text-2xl font-bold text-gray-50">
											<span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
												{postDetails?.user?.fullName}{' '}
												{postDetails?.user?.lastName}
											</span>
										</h4>
									</Link>
									<p className="text-black font-bold">
										<DateFormatter
											date={postDetails?.createdAt}
										/>
									</p>
								</div>
							</div>
							{/* Post description */}
							<div className="max-w-xl mx-auto">
								<div className="mb-6  text-xl text-black text-justify">
									{postDetails?.description}
									{/* Show delete and update btn if created by the user */}
									{isCreatedBy ? (
										<div className="flex">
											<Link
												to={`/update-post/${postDetails?.id}`}
												className="p-3"
											>
												<PencilAltIcon class="h-8 mt-3 text-slate-800" />
											</Link>
											<button
												onClick={() =>
													dispatch(
														deletePostAction(
															postDetails?.id
														)
													)
												}
												className="ml-3"
											>
												<TrashIcon className="h-8 mt-3 text-slate-800" />
											</button>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</div>
					{/* Add comment Form component here */}
					{userAuth ? <AddComment postId={id} /> : null}
					<div className="flex justify-center  items-center">
						{/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
						<CommentsList comments={postDetails?.comments} />
					</div>
				</section>
			)}
		</div>
	);
};

export default PostDetails;
