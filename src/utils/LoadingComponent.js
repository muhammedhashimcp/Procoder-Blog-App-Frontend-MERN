import React from 'react'
import { css } from '@emotion/react'
import RiseLoader from 'react-spinners/CircleLoader'


// css
const override = css`
display:black;
margin:0 auto;
border-color:red;
`;
const LoadingComponent = () => {
	return (
		<div className="mx-auto">
			<RiseLoader color="red" loading={true} css={override} />
		</div>
	);
}

export default LoadingComponent