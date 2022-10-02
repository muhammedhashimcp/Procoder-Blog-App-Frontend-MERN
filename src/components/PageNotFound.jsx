import React from 'react';
import Error404 from '../img/404-computer.svg'
const PageNotFound = () => {
	return (
		<div className="bg-white relative overflow-hidden h-screen">
			<div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
				<img
					src={Error404}
					className="absolute object-cover"
					alt="Page Not Found"
				/>
				<div className="w-full font-mono flex flex-col items-center relative z-10">
					{' '}
					<h1 className="font-extrabold text-5xl text-center text-gray-700 leading-tight mt-4">
					You are all alone here
					</h1>
					<p className="font-extrabold text-8xl my-44 text-gray-700 animate-bounce">
						404
					</p>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
