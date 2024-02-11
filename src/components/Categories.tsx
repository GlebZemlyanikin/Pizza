import React, { memo } from 'react';

type CategoriesProps = {
	value: number;
	onChangeCategory: (index: number) => void;
};
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Острые', 'Гриль', 'Закрытые'];

export const Categories: React.FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, i) => (
					<li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
});