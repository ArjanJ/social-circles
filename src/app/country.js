const Country = (name, networks) => {
	const getName = () => name;
	const getNetwork = (network) => networks[network];

	return {
		getName,
		getNetwork
	};
};

export default Country;
