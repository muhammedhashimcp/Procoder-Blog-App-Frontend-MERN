import React from 'react';

import { NavLink } from 'react-router-dom';
import { PencilAltIcon ,TrashIcon} from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategoriesAction } from '../../redux/slices/category/categorySlice';
import DateFormatter from '../../utils/DateFormatter';
import LoadingComponent from '../../utils/LoadingComponent';
const CategoryList = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCategoriesAction());
	}, [dispatch]);
	const category = useSelector((state) => state.category);
	const { categoryList, loading, appErr, serverErr } = category;
	return (
		<>
			{loading ? (
				<div className="flex justify-center">
					<LoadingComponent />
				</div>
			) : appErr || serverErr ? (
				<h2 className="text-center text-3xl text-red-500">
					{serverErr} {appErr}
				</h2>
			) : categoryList?.length <= 0 ? (
				<h2 className="text-center text-3xl text-green-800 mt-5">
					No Category Found
				</h2>
			) : (
				<div className="flex flex-col max-w-7xl mx-auto mt-5">
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-900 sm:rounded-lg">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-200">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Author
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Title
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Created At
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Edit
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Delete
											</th>
										</tr>
									</thead>
									<tbody>
										{/* Loop through categoriesList */}
										{categoryList?.map((category) => (
											<tr
												key={category._id}
												className="bg-gray-50"
											>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
													<div className="flex items-center">
														<div className="flex-shrink-0 h-10 w-10">
															{/* User image */}
															<img
																className="h-10 w-10 rounded-full"
																//   src="https://cdn.pixabay.com/photo/2021/02/24/23/43/boy-6047786_960_720.jpg"
																src={
																	/* A destructured object from the `category` object in the redux store. */
																	category
																		?.user
																		?.profilePhoto
																}
																alt="category profile"
															/>
														</div>
														<div className="ml-4">
															<div className="text-sm font-medium text-gray-900">
																{
																	category
																		?.user
																		?.firstName
																}{' '}
																{
																	category
																		?.user
																		?.lastName
																}
															</div>
															<div className="text-sm text-gray-500">
																{
																	category
																		?.user
																		?.email
																}
															</div>
														</div>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{category.title}
												</td>
												<td className="px-6 py-4 whitespace-nowrap  text-sm text-gray-500">
													{
														<DateFormatter
															date={
																category?.createdAt
															}
														/>
													}
												</td>
												<td className="">
													<NavLink
														to={`/update-category/${category?._id}`}
													>
														<div className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
															<PencilAltIcon className="h-5 text-slate-900" />
															Edit
														</div>
													</NavLink>
												</td>
												<td className="">
													<NavLink
														to={`/update-category/${category?._id}`}
													>
														<div className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
															<TrashIcon className="h-5 text-red-600" />
															Delete
														</div>
													</NavLink>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CategoryList;
