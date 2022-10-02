import React from 'react';

import { ExclamationIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { accVerificationSendTokenAction } from '../../../redux/slices/accountVerification/accVerificationSlices';

export default function AccountVerificationAlertWarning() {
	const dispatch = useDispatch();

	return (
		<div className="container px-4 mx-auto">
			<div className="bg-red-500 border-l-4 border-yellow-400 p-2">
				<div className="flex">
					<div className="flex-shrink-0">
						<ExclamationIcon
							className="h-5 w-5 text-yellow-500"
							aria-hidden="true"
						/>
					</div>
					<div className="ml-3">
						<p className="text-sm text-yellow-200">
							Your account is not verified.{' '}
							<button
								onClick={() =>
									dispatch(accVerificationSendTokenAction())
								}
								className="font-medium underline text-green-200 hover:text-yellow-600"
							>
								Click this link to verify
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
