import React from 'react'
			import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';


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
		<button onClick={()=>toast.success('hello ')}>click here</button>
		</div>
  );
}

export default Sample
