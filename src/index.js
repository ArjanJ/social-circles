if (module.hot) {
	module.hot.accept();
}

// Load CSS
import './assets/css/index.scss';

// Load data file
import dataJSON from 'file!./data/data.json';

const Api = () => {
	const getData = () => {
		return new Promise((resolve, reject) => {
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
	};

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

const DOMNode = (tag, attributes) => {
	const element = document.createElement(tag);
	attributes.forEach((attr) => {
		element.setAttribute(attr.name, attr.value);
	});

	return element;
};

const renderNodes = (nodes) => {
	const parent = document.querySelector('.app');
	nodes.forEach(node => parent.appendChild(node));
};

const App = () => {
	const state = {
		countries: []
	};

	const DOMStuff = (callback) => {
		const countryNodes = state.countries.map((country) => {
			return DOMNode('div', [{
				name: 'id',
				value: country.getName()
			}]);
		});

		callback(countryNodes);
	};

	// const renderNodes = (nodes) => {
	// 	const parent = document.querySelector('.app');
	// 	nodes.forEach(node => parent.appendChild(node));
	// };

	const init = () => {
		Api()
			.getData()
			.then((response) => {
				const data = response.data;
				data.forEach((item) => {
					state.countries.push(Country(item.name, item.networks));
				});
			});
	};

	return {
		init,
		DOMStuff
	};
};

App().init();
App().DOMStuff(renderNodes);
