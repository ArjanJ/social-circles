if (module.hot) {
	module.hot.accept();
}

// Load CSS
import './assets/css/index.scss';

// Load data file
import dataJSON from 'file!./data/data.json';

const Api = () => {
	const getData = () =>
		new Promise((resolve, reject) => {
			fetch(dataJSON)
				.then((response) => {
					if (response.status >= 200 && response.status < 300) {
						return response;
					} else {
						const error = new Error(response.statusText);
						error.response = response;
						throw error;
					}
				})
				.then(response => response.json())
				.then(response => resolve(response))
				.catch(error => console.error(error));
		});

	return {
		getData
	};
};

const Country = (name, networks) => {
	const getName = () => name;
	const getNetwork = (network) => networks[network];

	return {
		getName,
		getNetwork
	};
};

const createDOMNode = (tag, attributes) => {
	const element = document.createElement(tag);
	attributes.forEach((attr) => {
		element.setAttribute(attr.name, attr.value);
	});

	return element;
};

const App = () => {
	const state = {
		countries: []
	};

	const createDOMElements = (callback) => {
		const countryNodes = state.countries.map((country) => {
			return createDOMNode('div', [{
				name: 'id',
				value: country.getName()
			}]);
		});

		callback(countryNodes, '.app');
	};

	const renderDOMElements = (nodes, parent) => {
		const el = document.querySelector(parent);
		nodes.forEach(node => el.appendChild(node));
	};

	const getData = () =>
		new Promise((resolve, reject) => {
			Api()
				.getData()
				.then((response) => {
					const data = response.data;
					data.forEach((item) => {
						state.countries.push(Country(item.name, item.networks));
					});

					resolve(state.countries);
				})
				.catch(error => console.error(error));
		});

	const init = () => {
		getData()
			.then((response) => {
				createDOMElements(renderDOMElements);
			});
	};

	return {
		init
	};
};

App().init();
