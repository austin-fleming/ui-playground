const pipeAll = (...functionList) => (input) =>
	functionList.reduce(
		(accumulator, currentFunction) => currentFunction(accumulator),
		input
	);
