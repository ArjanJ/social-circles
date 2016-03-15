if (module.hot) {
	module.hot.accept();
}

// Load CSS
import './assets/css/index.scss';

// Load data file
import dataJSON from 'file!./data/data.json';

const Api = () => {
	function getData() {
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
	}

	return {
		getData
	};
};

