import { useState } from 'react';

const AnimatedSidebar = () => {
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<>
	

			<div
				
				className={`top-15 left-5 w-[35vw] bg-blue-600 p-10 pl-20 text-white fixed h-full z-30  ease-in-out duration-300 ${
					showSidebar ? '-translate-x-full ' : '-translate-x-5'
				}`}
			>
						<svg
				onClick={() => setShowSidebar(!showSidebar)}
				className="fixed  z-40 flex text-slate-900 items-center cursor-pointer right-0 top-5"
				
				viewBox="0 0 100 80"
				width="30"
				height="30"
			>
				<rect width="100" height="10"></rect>
				<rect y="30" width="100" height="10"></rect>
				<rect y="60" width="100" height="10"></rect>
			</svg>
				<h3 className="mt-20 text-4xl font-semibold text-white">
					I am a sidebar
				</h3>
			</div>
		</>
	);
};

export default AnimatedSidebar;
