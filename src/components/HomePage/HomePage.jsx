
// import React from "react";
// import poster from '../../img/poster.png'
// const HomePage = () => {
// 	return (
// 		<>
// 			<section className="pb-10 bg-white">
// 				<div className="relative container px-4   mx-auto">
// 					<div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
// 						<div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
// 							<span className="text-lg font-bold text-blue-400">
// 								Create posts to educate
// 							</span>
// 							<h2 className="max-w-2xl mt-12 mb-12 text-6xl 2xl:text-8xl text-white font-bold font-heading">
// 								Pen down your ideas{" "}
// 								<span className="text-yellow-500">By creating a post</span>
// 							</h2>
// 							<p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-gray-100">
// 								Your post must be free from racism and unhealthy words
// 							</p>
						
// 						</div>
// 						<div className="w-full lg:w-1/2 px-4">
// 							<img className="w-full" src={poster} alt={poster} />
// 						</div>
// 					</div>
// 				</div>
// 			</section>
// 		</>
// 	);
// };

// export default HomePage;
import React from 'react';
import poster from '../../img/bgi.jpg';
const HomePage = () => {
	return (
		<>
			<section className="pb-7 pt-2 px-14 bg-white mt-16">
				<div className="px-auto ">
					<div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
						<div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
							<span className="text-2xl font-bold text-black">
								Create Posts to Educate
							</span>
							<h2 className="max-w-2xl mt-2  text-6xl 2xl:text-8xl text-zinc font-bold font-heading text-slate-600">
								Pen down your{' '}
							</h2>
							<h2 className="max-w-2xl mt-1 text-6xl 2xl:text-8xl text-zinc font-bold font-heading text-slate-600">
								Ideas{' '}
							</h2>
							<h2 className="max-w-2xl mt-1  text-6xl 2xl:text-8xl text-zinc font-bold font-heading text-slate-600">
								By Creating{' '}
							</h2>
							<h2 className="max-w-2xl mt-1  text-6xl 2xl:text-8xl text-zinc font-bold font-heading text-slate-600">
								a Post{' '}
							</h2>
						</div>
						<div className="w-full lg:w-1/2 px-4 ">
							<img src={poster} alt={poster} />
						</div>
					</div>
					<div className="bg-slate-100 bg-center">
						<p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-slate-700 text-center font-semibold">
							Your Posts must be free from Racism and Unhealthy
							words
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default HomePage;