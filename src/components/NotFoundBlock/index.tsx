import React from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
	return (
		<>
			<div className={styles.root}>
				<h1>
					<span>😔</span>
					<br />
					Ничего нет
				</h1>
				<p className={styles.description}>Данная странича отсутствует</p>
			</div>
		</>
	);
};
