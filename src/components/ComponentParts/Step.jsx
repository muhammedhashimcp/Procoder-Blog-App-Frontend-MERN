import React from 'react'

const Step = () => {
  return (
		<div>
			<ul class="stepper" data-mdb-stepper="stepper">
				<li class="stepper-step stepper-active">
					<div class="stepper-head">
						<span class="stepper-head-icon"> 1 </span>
						<span class="stepper-head-text"> step1 </span>
					</div>
					<div class="stepper-content">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua.
					</div>
				</li>
				<li class="stepper-step">
					<div class="stepper-head">
						<span class="stepper-head-icon"> 2 </span>
						<span class="stepper-head-text"> step2 </span>
					</div>
					<div class="stepper-content">
						Ut enim ad minim veniam, quis nostrud exercitation
						ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</div>
				</li>
				<li class="stepper-step">
					<div class="stepper-head">
						<span class="stepper-head-icon"> 3 </span>
						<span class="stepper-head-text"> step3 </span>
					</div>
					<div class="stepper-content">
						Duis aute irure dolor in reprehenderit in voluptate
						velit esse cillum dolore eu fugiat nulla pariatur.
					</div>
				</li>
			</ul>
		</div>
  );
}

export default Step
