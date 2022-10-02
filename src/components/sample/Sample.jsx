import React from 'react'
			import { GoogleLogin } from '@react-oauth/google';


const Sample = () => {
  return (
	  <div>
		  <h1>hello</h1>
			<GoogleLogin
				onSuccess={(credentialResponse) => {
					console.log(credentialResponse);
				}}
				onError={() => {
					console.log('Login Failed');
				}}
			/>
			;
		</div>
  );
}

export default Sample
