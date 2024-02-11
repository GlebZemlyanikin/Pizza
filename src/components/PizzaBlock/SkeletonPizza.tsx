import React from 'react';
import ContentLoader from 'react-content-loader';

export const SkeletonPizza = () => (
	<ContentLoader
		className='pizza__block'
		speed={1}
		width={280}
		height={520}
		viewBox='0 0 280 465'
		backgroundColor='#f4ecec'
		foregroundColor='#cfc9c9'>
		<circle cx='130' cy='138' r='127' />
		<rect x='0' y='278' rx='10' ry='10' width='280' height='26' />
		<rect x='0' y='316' rx='10' ry='10' width='280' height='87' />
		<rect x='0' y='430' rx='10' ry='10' width='84' height='27' />
		<rect x='134' y='421' rx='20' ry='20' width='145' height='43' />
	</ContentLoader>
);
