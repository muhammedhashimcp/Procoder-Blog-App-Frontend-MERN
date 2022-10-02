import React from 'react';
import poster from '../../img/bgi.jpg';
import BlogAppPoster from '../../img/blog-app.jpg';

const HomePage = () => {
	return (
		<>
			<section className=" min-h-screen  relative 2xl:py-20 pt-5 px-14 bg-white ">
				<div className=" container px-auto mx-auto ">
					<div className="flex  flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
						<div className="w-full relative lg:w-1/2 px-4 mb-16 lg:mb-0 opacity-80">
							<span className="text-2xl font-bold text-black ">
								<span className="text-red-600">
									Create Blogs
								</span>
								= to <span className="text-yellow-400">(</span>
								<span className="text-blue-600"> Educate </span>
								<span className="text-yellow-400">) </span>
								<span>&#61;&#62;</span>{' '}
								<span className="text-blue-600">&#123;</span>
							</span>

							<h4 className="max-w-2xl mt-2  text-4xl 2xl:text-6xl text-zinc font-bold font-heading text-slate-600">
								Pen down your
								<span className="text-green-600">
									{' '}
									Ideas
								</span>{' '}
								By
							</h4>
							<h4 className="max-w-2xl text-4xl 2xl:text-6xl text-zinc font-bold font-heading text-slate-600 ">
								{' '}
								<span className="text-red-600">
									Creating{' '}
								</span>{' '}
								a <span className="text-red-600">Blog</span>{' '}
								<span className="text-yellow-400 font-light">
									(
								</span>
								<span className="text-green-600">Idea</span>
								<span className="text-yellow-400 font-light">
									){' '}
								</span>
							</h4>
							<h4 className="text-blue-600  mt-1  text-2xl font-bold ">
								&#125;
							</h4>
						</div>

						<div className="w-full lg:w-1/2 px-4 ">
							<img src={BlogAppPoster} alt={poster} />
						</div>
					</div>
					<div className="flex justify-center lg:justify-start">
						<a
							className=" inline-block mb-4 px-12 py-4 text-lg text-white font-bold bg-black hover:bg-blue-600 rounded-full transition duration-200"
							href="/posts"
						>
							Read Blogs
						</a>
					</div>
					<div className="bg-slate-200 bg-center">
						<p className=" text-xl mb-16 lg:mb-10 2xl:mb-15 text-slate-700 text-center font-semibold">
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
