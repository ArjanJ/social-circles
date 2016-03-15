if (module.hot) {
	module.hot.accept();
}

// Load CSS
import './assets/css/index.scss';

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

	const buttonClick = (button) => {
		const network = button.getAttribute('data-network');
		setState({ network });
		animateCountry();
	};

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
		state.countries.map((country, i) =>
			countries[i].style.transform = `scale(
				${country.getNetwork(state.network).totalUsers / 100000000}
			)`);
	};

	const render = () =>
		`<div>
			<div class="earth">
				<div class="earth__circle"></div>
				<div class="earth__map">
					<div class="countries">
						${state.countries.map((country) =>
							`<div
								id="${country.getName().replace(/\ /g, '-')}"
								class="country"
								style="transform: scale(${country.getNetwork(state.network).totalUsers / 100000000})">
							</div>`).join('')}
					</div>
				</div>
			</div>
			<div class="controls">
				<button class="controls__button" type="button" data-network="facebook">Facebook</button>
				<button class="controls__button" type="button" data-network="instagram">Instgram</button>
				<button class="controls__button" type="button" data-network="twitter">Twitter</button>
			</div>
		</div>`;

	const mount = () => {
		document
			.querySelector('.app')
			.innerHTML = render();
	};

	const getData = () =>
		new Promise((resolve, reject) => {
			Api()
				.getData()
				.then((response) => {
					state.countries = response.data.map(item => Country(item.name, item.networks));
					resolve(state.countries);
				})
				.catch(error => console.error(error));
		});

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
