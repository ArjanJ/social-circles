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
const App = (() => {
	const state = {
		countries: [],
		network: '',
		totalUsers: 0
	};

	/**
	 * setState() updates the state object
	 *
	 * @param {Object} newState the object holding the updated state
	 */
	const setState = (newState) => {
		Object.assign(state, newState);
	};

	/**
	 * getData() promise that gets the country data from the API
	 * adds the response data to the state object
	 */
	const getData = () =>
		Api()
			.getData()
			.then((response) => {
				const countries = response.data.map(item => Country(item.name, item.networks));
				const network = 'facebook';
				const totalUsers = countries.reduce((sum, country) =>
					sum + country.getNetwork(network).totalUsers, 0);
				setState({ countries, network, totalUsers });
			})
			.catch(error => console.error(error));

	/**
	 * scaleValue() returns the transform scale value for the DOM element
	 *
	 * @param {Object} x the country object of the DOM element you want to update
	 * @return {String} the transform scale value
	 */
	const scaleValue = x => `scale(${x.getNetwork(state.network).totalUsers / 100000000})`;

	/**
	 * updateCountries() updates the country DOM elements
	 * adds and removes the neccessary class names from DOM elements
	 */
	const updateCountries = () => {
		const countries = Array.from(document.querySelectorAll('.country'));
		state.countries.forEach((country, i) => {
			countries[i].style.transform = scaleValue(country);
			countries[i].classList.remove('facebook', 'instagram', 'twitter');
			countries[i].classList.add(state.network);
		});
	};

	const updateButtons = (button) => {
		const buttons = Array.from(document.querySelectorAll('.controls__button'));
		buttons.map(x => x.classList.remove('facebook', 'instagram', 'twitter'));
		button.classList.add('controls__button--active', state.network);
	};

	const updateInfoText = () => {
		const networkName = document.querySelector('[data-active-network]');
		const networkNumber = document.querySelector('[data-active-network-number]');
		networkName.innerHTML = state.network;
		networkNumber.innerHTML = state.totalUsers;
	};

	/**
	 * buttonClick() updates the state of the app
	 *
	 * @param {Element} button the button element that was clicked
	 */
	const buttonClick = (button) => {
		const network = button.getAttribute('data-network');
		const totalUsers = state.countries.reduce((sum, country) =>
			sum + country.getNetwork(network).totalUsers, 0);

		setState({ network, totalUsers });

		updateCountries();
		updateButtons(button);
		updateInfoText();
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
				<button class="controls__button facebook" type="button"
					data-network="facebook">Facebook</button>
				<button class="controls__button" type="button" data-network="instagram">Instagram</button>
				<button class="controls__button" type="button" data-network="twitter">Twitter</button>
			</div>
			<div class="example-size">100 Million<br>People</div>
			<footer class="footer">
				<p class="info">
					<span data-active-network>${state.network}</span> has over
					<span data-active-network-number>${state.totalUsers}</span> users!
				</p>
				<a href="https://www.arjanjassal.me/">Designed &amp; Developed by Arjan Jassal</a>
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
})();

document.addEventListener('DOMContentLoaded', () => {
	App.init();
});
