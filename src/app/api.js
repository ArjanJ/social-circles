// Include data file
import dataJSON from 'file!../data/data.json';

const Api = () => {
	const getData = () =>
		new Promise((resolve, reject) => {
			// Simulate async
			setTimeout(() => {
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
			}, 200);
		});

	return {
		getData
	};
};

export default Api;
