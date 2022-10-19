import React from 'react';

import { Disclosure } from '@headlessui/react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, XIcon, LoginIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';
import Procoder from '../../../img/procoder logo.jpg';
const navigation = [
	{ name: 'Blogs', href: '/posts', current: true },
	{ name: 'About Us', href: '/about', current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const PublicNavbar = () => {
	return (
		<Disclosure
			as="nav"
			className="bg-white border drop-shadow sticky top-0  py-3 z-50"
		>
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between ">
							<div className="flex">
								<div className="-ml-2 mr-2 flex items-center md:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-blue-700">
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

								{/* Logo */}
								<Link
									to={'/'}
									className="flex-shrink-0 flex items-center  text-2xl font-semibold "
								>
									<img
										className="h-12 w-8 "
										src={Procoder}
										alt="Procoder"
									/>
									<span className="logoText">
										{'  '}Procoder
									</span>
								</Link>

								<div className="hidden md:ml-6 md:flex md:items-center md:space-x-4 ">
									{navigation.map((item) => (
										

										<NavLink
											to={item.href}
											key={item.name}
											className={({ isActive }) =>
												isActive
													? 'relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-black hover:outline-none ring-4 ring-offset-5 ring-offset-gray-800 ring-pink-700'
													: 'relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-black focus:outline-none focus:ring-4 focus:ring-offset-5 focus:ring-offset-gray-800 focus:ring-blue-700'
											}
										>
											{item.name}
										</NavLink>
										
									))}
								</div>
							</div>
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<Link
										to="/login"
										type="button"
										className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-black focus:outline-none focus:ring-4 focus:ring-offset-5 focus:ring-offset-gray-800 focus:ring-blue-700"
									>
										<LoginIcon
											className="-ml-1 mr-2 h-5 w-5"
											aria-hidden="true"
										/>
										<span>Login</span>
									</Link>
								</div>
								<div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
									<Link
										to="/register"
										className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-black focus:outline-none focus:ring-4 focus:ring-offset-5 focus:ring-offset-gray-800 focus:ring-blue-700"
									>
										<PlusIcon
											className="-ml-1 mr-2 h-5 w-5"
											aria-hidden="true"
										/>
										<span>Register</span>
									</Link>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="md:hidden">
						<div className="px-2 pt-5 pb-3 space-y-1 ">
							{navigation.map((item) => (
								// <nav>
								// 	<NavLink
								// 		key={item.name}
								// 		to={item.href}
								// 		className={navLinkStyles}
								// 		aria-current={
								// 			item.current ? 'page' : undefined
								// 		}
								// 	>
								// 		{item.name}
								// 	</NavLink>
								// </nav>
								<a
									key={item.name}
									href={item.href}
									className={classNames(
										item.current
											? 'bg-gray-900 text-white'
											: 'text-slate-900 hover:bg-gray-700 hover:text-white',
										'block px-3 py-2 rounded-md text-base font-medium'
									)}
									aria-current={
										item.current ? 'page' : undefined
									}
								>
									{item.name}
								</a>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default PublicNavbar;
