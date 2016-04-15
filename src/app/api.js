// Import data file
import dataJSON from 'file!../data/data.json';

const Api = () => {
	const getData = () =>
		fetch(dataJSON)
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response;
				} else {
					const error = new Error(response.statusText);
					error.response = response;
					throw error;
				}
			})
			.then(response => response.json())
			.catch(error => console.error(error));

	return {
		getData
	};
};

export default Api;
