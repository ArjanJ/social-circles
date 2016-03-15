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
		countries: []
	};

	const render = () =>
		`<div>
			<div class="earth">
				<div class="earth__circle"></div>
				<div class="earth__map"></div>
			</div>
			<div class="countries">
				${state.countries.map((country) => {
					return `<div id=${country.getName()} class="country"></div>`;
				}).join('')}
			</div>
		</div>`;

	const mount = () => {
		document.querySelector('.app').innerHTML = render();
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
