import React, { useCallback, useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Categories } from '../components/Categories';
import { Sort, sortList } from '../components/Sort';
import { SkeletonPizza } from '../components/PizzaBlock/SkeletonPizza';
import { PizzaBlock } from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncAction';
import { SearchPizzaParams } from '../redux/pizza/types';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isMounted = useRef(false);

	const { items, status } = useSelector(selectPizzaData);
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

	const onChangeCategory = useCallback((index: number) => {
		dispatch(setCategoryId(index));
	}, []);

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				category,
				sortBy,
				order,
				search,
				currentPage: String(currentPage),
			}),
		);

		window.scrollTo(0, 0);
	};

	useEffect(() => {
		if (isMounted.current) {
			const params = {
				categoryId: categoryId > 0 ? categoryId : null,
				sortProperty: sort.sortProperty,
				currentPage,
			};

			const queryString = qs.stringify(params, { skipNulls: true });

			navigate(`/?${queryString}`);
		}

		if (!window.location.search) {
			dispatch(fetchPizzas({} as SearchPizzaParams));
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	useEffect(() => {
		getPizzas();
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
			const sort = sortList.find(obj => obj.sortProperty === params.sortBy);
			dispatch(
				setFilters({
					searchValue: params.search,
					categoryId: Number(params.category),
					currentPage: Number(params.currentPage),
					sort: sort || sortList[0],
				}),
			);
		}
		isMounted.current = true;
	}, []);

	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(4)].map((_, index) => <SkeletonPizza key={index} />);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort value={sort} />
			</div>
			<h2 className='content__title'>Пицца</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>Что-то пошло не так...</h2>
					<p>Не удалось получить пиццы. Попробуйте через 5 минут.</p>
				</div>
			) : (
				<div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
