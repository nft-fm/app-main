module.exports =
	function limit_nbr (n, min_value, max_value) {
		const min = min_value || 0;
		const max = max_value || Number.MAX_SAFE_INTEGER;

		if (n > max)
			return max;
		if (n < min)
			return min;
		else
			return Math.round(n * 10) / 10;
	}