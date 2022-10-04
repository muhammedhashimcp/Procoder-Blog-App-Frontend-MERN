import React from 'react';

import { Disclosure } from '@headlessui/react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, XIcon, LoginIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';
import Procoder from '../../../img/procoder logo.jpg';

const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'Blogs', href: '/posts'},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const PublicNavbar = () => {
	const navLinkStyles = ({ isActive,item }) => {
		console.log("🚀 ~ file: PublicNavbar.js ~ line 20 ~ navLinkStyles ~ isActive", isActive)
		console.log("🚀 ~ file: PublicNavbar.js ~ line 21 ~ navLinkStyles ~ item", item)
		
		return (
				isActive?('bg-gray-700 text-white font-semibold px-3 py-2 rounded-md text-md font-medium'):('text-black hover:bg-gray-700 hover:text-white font-semibold px-3 py-2 rounded-md text-md font-medium')
				// isActive?'bg-gray-700 text-white font-semibold px-3 py-2 rounded-md text-md font-medium':'text-black hover:bg-gray-700 hover:text-white font-semibold px-3 py-2 rounded-md text-md font-medium'
													
												
		)
	}
	return (
		<Disclosure
			as="nav"
			className="bg-white border drop-shadow sticky top-0 "
		>
			{({ open }) => (
				<>
					<div className="   max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
										{'     '}Procoder
									</span>
								</Link>

								<div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
									{navigation.map((item) => (
										<nav>
											<NavLink
												key={item.name}
												to={item.href}
												className={navLinkStyles}
												aria-current={
													item.current
														? 'page'
														: undefined
												}
											>
												{item.name}
											</NavLink>
										</nav>
									))}
								</div>
							</div>
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<Link
										to="/login"
										type="button"
										className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
										className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							{navigation.map((item) => (
								<nav>
									<NavLink
										key={item.name}
										to={item.href}
										className={navLinkStyles}
										aria-current={
											item.current ? 'page' : undefined
										}
									>
										{item.name}
									</NavLink>
								</nav>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default PublicNavbar;
