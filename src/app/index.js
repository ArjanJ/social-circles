if (module.hot) {
	module.hot.accept();
}

// Load CSS
import '../assets/css/index.scss';

// Api Module
import Api from './Api';

// Country Model
import Country from './Country';

// App Module
const App = () => {
	const state = {
		countries: [],
		network: 'facebook'
	};

	const setState = (newState) => {
		Object.assign(state, newState);
	};

	const getData = () =>
		new Promise((resolve, reject) => {
			Api()
				.getData()
				.then((response) => {
					const countries = response.data.map(item => Country(item.name, item.networks));
					setState({ countries });
					resolve(state.countries);
				})
				.catch(error => console.error(error));
		});

	const registerEventListeners = () => {
		document
			.querySelector('.app')
			.addEventListener('click', (event) => {
				if (event.target && event.target.matches('button.controls__button')) {
					buttonClick(event.target);
				}
			});
	};

	const animateCountry = () => {
		const countries = Array.from(document.querySelectorAll('.country'));
		state.countries.forEach((country, i) => {
			countries[i].style.transform = scaleValue(country);
			countries[i].classList.remove('facebook', 'instagram', 'twitter');
			countries[i].classList.add(state.network);
		});
	};

	const scaleValue = x => `scale(${x.getNetwork(state.network).totalUsers / 100000000})`;

	const buttonClick = (button) => {
		const network = button.getAttribute('data-network');
		const buttons = Array.from(document.querySelectorAll('.controls__button'));

		setState({ network });

		buttons.map(x => x.classList.remove('facebook', 'instagram', 'twitter'));
		button.classList.add('controls__button--active', state.network);

		animateCountry();
	};

	const render = () =>
		`<h1 class="title">Social Circles</h1>
			<div class="earth">
				<div class="earth__ocean"></div>
				<div class="earth__map">
					<div class="countries">
						${state.countries.map((country) =>
							`<div
								id="${country.getName().replace(/\ /g, '-')}"
								class="country ${state.network}"
								style="transform: ${scaleValue(country)}">
							</div>`).join('')}
					</div>
				</div>
			</div>
			<div class="controls">
				<button class="controls__button facebook" type="button" data-network="facebook">Facebook</button>
				<button class="controls__button" type="button" data-network="instagram">Instagram</button>
				<button class="controls__button" type="button" data-network="twitter">Twitter</button>
			</div>
			<div class="example-size">100 Million<br>People</div>
			<footer class="footer">
				<a href="https://www.arjanjassal.me/">Made by Arjan Jassal</a>
			</footer>`;

	const mount = () => {
		document
			.querySelector('.app')
			.innerHTML = render();
	};

	const init = () => {
		registerEventListeners();
		getData()
			.then(response => mount())
			.catch(error => console.error(error));
	};

	return {
		init
	};
};

document.addEventListener('DOMContentLoaded', () => {
	App().init();
});
