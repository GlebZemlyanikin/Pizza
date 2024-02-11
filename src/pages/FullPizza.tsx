import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function FullPizza() {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get('https://659a9e6f652b843dea53cc6b.mockapi.io/items/' + id);
				setPizza(data);
			} catch (error) {
				alert('Ошибка');
				navigate('/');
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return (
			<>
				<p>Загрузка...</p>
			</>
		);
	}

	return (
		<div className='container pizza-block'>
			<img className='pizza-block__image' src={pizza.imageUrl} alt='pizza' />
			<h4 className='pizza-block__title'>{pizza.title}</h4>
			<div className='pizza-block__price'>{pizza.price} ₽</div>
			<Link to='/' className='button button--black'>
				<span>Вернуться назад</span>
			</Link>
		</div>
	);
}

export default FullPizza;
