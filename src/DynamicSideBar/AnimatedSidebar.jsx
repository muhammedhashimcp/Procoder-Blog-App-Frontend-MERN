import { useEffect, useState } from 'react';
import LoadingComponent from '../utils/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesAction } from '../redux/slices/category/categorySlice';

const AnimatedSidebar = ({ category }) => {
	// const dispatch = useDispatch();

	const [showSidebar, setShowSidebar] = useState(false);
	// useEffect(() => {
	// 	dispatch(fetchCategoriesAction());
	// }, [dispatch]);
	const {
		categoryList,
		loading: catLoading,
		appErr: catAppErr,
		serverErr: catServerErr,
	} = category;
	console.log(
		'🚀 ~ file: AnimatedSidebar.jsx ~ line 11 ~ AnimatedSidebar ~ category',
		categoryList
	);
	return (
		<>
			{/* <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3"> */}
				<div
				className={`top-15 left-10 w-[50vw] md:w-[30vw] bg-gray-400 p-10 pl-10 text-white fixed h-full ease-in-out duration-300 ${
					showSidebar ? '-translate-x-full ' : '-translate-x-10'
				}`}
			>
				{/* <div
				className={`top-15 left-10 w-[50vw] md:w-[30vw] bg-gray-400 p-10 pl-10 text-white fixed h-full ease-in-out duration-300 ${
					showSidebar ? '-translate-x-full ' : '-translate-x-10'
				}`}
			> */}
				<svg
					onClick={() => setShowSidebar(!showSidebar)}
					className="fixed  z-40 flex text-slate-900 items-center cursor-pointer right-1 top-5"
					viewBox="0 0 100 80"
					width="30"
					height="30"
				>
					<rect width="100" height="10"></rect>
					<rect y="30" width="100" height="10"></rect>
					<rect y="60" width="100" height="10"></rect>
				</svg>
				<div className="mb-8 lg:mb-0 w-full px-3">
					<div className="py-4 px-2 bg-gray-300  shadow-md shadow-gray-500 rounded">
						<h4 className="mb-4 text-black-500 font-bold mx-auto flex justify-center font-serif uppercase">
							Categories
						</h4>
						<ul>
							{catLoading ? (
								<div className="flex justify-center">
									<LoadingComponent />
								</div>
							) : catAppErr || catServerErr ? (
								<h1>
									{' '}
									{catAppErr} {catServerErr}
								</h1>
							) : categoryList?.length <= 0 ? (
								<h1 className="text-center">
									No category found
								</h1>
							) : (
								categoryList?.map((category) => (
									<li key={category._id}>
										<p
											onClick={() =>
												dispatch(
													fetchAllPostAction(
														category?.title
													)
												)
											}
											className="block cursor-pointer py-2 px-3 mb-4 rounded shadow-md shadow-gray-500 text-black-500  font-bold font-serif bg-white"
										>
											{category?.title}
											<span className="text-red-600">
												{' '}
												hhhhh
											</span>
										</p>
									</li>
								))
							)}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default AnimatedSidebar;
