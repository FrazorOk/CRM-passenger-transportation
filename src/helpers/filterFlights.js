export let filterFlights = (arr, filters) => {
	let { from, to, date, time, seats } = filters;

	let newArr = [];

	if (arr) {
		newArr = arr;
	}

	if (from) {
		newArr = newArr.filter((fliter) => fliter.place.from.toLowerCase().slice(0, [from.length]) === from.toLowerCase());
	}
	if (to) {
		newArr = newArr.filter((fliter) => fliter.place.to.toLowerCase().slice(0, [to.length]) === to.toLowerCase());
	}
	if (date) {
		newArr = newArr.filter((fliter) => fliter.date === date);
	}
	if (time) {
		newArr = newArr.filter((fliter) => fliter.timeFrom === time);
	}
	if (seats) {
		newArr = newArr.filter((fliter) => fliter.seats.seats < fliter.seats.maxSeats);
	}

	return newArr;
};

export let sortingFlights = (arr, sortOptions) => {
	if (sortOptions === 1) {
		return arr.sort((a, b) => {
			if (a.cost <= b.cost) {
				return 1;
			}
			if (a.cost > b.cost) {
				return -1;
			}
		});
	}
	if (sortOptions === 2) {
		return arr.sort((a, b) => {
			if (a.cost >= b.cost) {
				return 1;
			}
			if (a.cost < b.cost) {
				return -1;
			}
		});
	}
	if (sortOptions === 3) {
		return arr.sort((a, b) => {
			return new Date(a.date) - new Date(b.date);
		});
	}
};
