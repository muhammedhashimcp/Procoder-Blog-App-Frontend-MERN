/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Procoder from '../../../img/procoder logo.jpg';


import { Link } from "react-router-dom";
import {
  BellIcon,
  MenuIcon,
  XIcon,
 
  LogoutIcon,
} from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/slices/users/userSlice";

const navigation = [

//   { name: "Create", href: "/create-post", current: false },
  { name: "Posts", href: "/posts", current: false },
  { name: "Authors", href: "/users", current: false },
  { name: "Add Category", href: "/add-category", current: false },
  { name: "Category List", href: "/category-list", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminNavbar = ({isLogin}) => { 
  //Navigation
  const userNavigation = [
    { name: "Your Profile", href: `/profile/${isLogin?._id}` },
    { name: "Change your password", href: "/update-password" },
    { name: "Settings", href: "/update-password" },
  ];

	// logout
	const dispatch = useDispatch()

  return (
		<Disclosure
			as="nav"
			className="bg-white border rounded-b-2xl drop-shadow sticky top-0 z-50"
		>
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-50">
						<div className="flex justify-between h-16">
							<div className="flex">
								<div className="-ml-2 mr-2 flex items-center md:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="sr-only">
											Open main menu
										</span>
										{open ? (
											<XIcon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										) : (
											<MenuIcon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										)}
									</Disclosure.Button>
								</div>
								<Link
									to={'/'}
									className="flex-shrink-0 flex items-center  text-2xl font-semibold"
								>
									{/* Logo */}
									<img
										className="h-12 w-8 "
										src={Procoder}
										alt="Procoder"
									/>
									<span className="logoText hidden lg:block">
										{'     '}Procoder
									</span>
								</Link>
								<div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
									{navigation.map((item) => (
										<Link
											key={item.name}
											to={item.href}
											className={classNames(
												item.current
													? 'bg-gray-500 text-white hover:bg-gray-700 shadow-lg shadow-gray-400'
													: 'relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
											)}
											aria-current={
												item.current
													? 'page'
													: undefined
											}
										>
											{item.name}
										</Link>
									))}
								</div>
							</div>
							<div className="flex items-center">
								<div className="flex-shrink-0">
									{/* New post */}
									<Link
										to="/create-post"
										type="button"
										className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-black "
									>
										<PlusIcon
											className="-ml-1 mr-2 h-5 w-5"
											aria-hidden="true"
										/>
										<span>New Post</span>
									</Link>
									{/* Logout */}
									<button
										onClick={() => dispatch(logoutAction())}
										type="button"
										className="relative inline-flex items-center px-4 py-2 border ml-3 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-black "
									>
										<LogoutIcon
											className="-ml-1 mr-2 h-5 w-5"
											aria-hidden="true"
										/>
										<span>Logout</span>
									</button>
								</div>
								<div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
									{/* Profile dropdown */}
									<Menu
										as="div"
										className="ml-3 relative z-10"
									>
										{({ open }) => (
											<>
												<div>
													<Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
														<span className="sr-only">
															Open user menu
														</span>
														<img
															className="h-8 w-8 rounded-full"
															src={
																isLogin?.profilePhoto
															}
															alt="Admin Profile"
														/>
														<div className="text-base font-medium text-white m-auto mx-3">
															{isLogin?.firstName}{' '}
															{isLogin?.lastName}
														</div>
													</Menu.Button>
												</div>
												<Transition
													show={open}
													as={Fragment}
													enter="transition ease-out duration-200"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items
														static
														className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
													>
														{userNavigation.map(
															(item) => (
																<Menu.Item
																	key={
																		item.name
																	}
																>
																	{({
																		active,
																	}) => (
																		<a
																			href={
																				item.href
																			}
																			className={classNames(
																				active
																					? 'bg-gray-100'
																					: '',
																				'block px-4 py-2 text-sm text-black'
																			)}
																		>
																			{
																				item.name
																			}
																		</a>
																	)}
																</Menu.Item>
															)
														)}
													</Menu.Items>
												</Transition>
											</>
										)}
									</Menu>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							{navigation.map((item) => (
								<Link
									to={`${item.href}`}
									key={item.name}
									className={classNames(
										item.current
											? 'bg-gray-900 text-white'
											: 'text-black hover:bg-gray-700 hover:text-white',
										'block px-3 py-2 rounded-md text-base font-medium'
									)}
									aria-current={
										item.current ? 'page' : undefined
									}
								>
									{item.name}
								</Link>
							))}
						</div>
						<div className="pt-4 pb-3 border-t border-gray-700">
							<div className="flex items-center px-5 sm:px-6">
								<div className="flex-shrink-0">
									{/* Image */}
									<img
										className="h-10 w-10 rounded-full"
										src={isLogin?.profilePicture}
										alt=""
									/>
								</div>
								<div className="ml-3">
									<div className="text-base font-medium text-black">
										{isLogin?.firstName} {isLogin?.lastName}
									</div>
									<div className="text-sm font-medium text-gray-400">
										{isLogin?.email}
									</div>
								</div>
								<button className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
									<span className="sr-only">
										View notifications
									</span>
									<BellIcon
										className="h-6 w-6"
										aria-hidden="true"
									/>
								</button>
							</div>
							<div className="mt-3 px-2 space-y-1 sm:px-3">
								{userNavigation.map((item) => (
									<Link
										key={item.name}
										to={item.href}
										className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-white hover:bg-gray-700"
										aria-current={
											item.current ? 'page' : undefined
										}
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
  );
};

export default AdminNavbar;
