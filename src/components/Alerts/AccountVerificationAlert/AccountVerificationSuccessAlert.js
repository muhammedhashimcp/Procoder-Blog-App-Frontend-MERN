/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
export default function AccountVerificationSuccessAlert({ setClose }) {
	return (
		<div className="rounded-md bg-green-300 p-4 mx-4 my-1">
			<div className="flex">
				<div className="flex-shrink-0">
					<CheckCircleIcon
						className="h-5 w-5 text-400"
						aria-hidden="true"
					/>
				</div>
				<div className="ml-3">
					<p className="text-sm font-medium text-green-800">
						Email is successfully sent to your Email
					</p>
				</div>
				<button
					className="text-xl ml-auto "
					onClick={() => setClose(true)}
				>
					X
				</button>
			</div>
		</div>
	);
}
