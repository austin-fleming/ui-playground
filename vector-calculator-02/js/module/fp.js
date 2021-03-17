const pipeAll = (...functionList) => (input) =>
	functionList.reduce(
		(accumulator, currentFunction) => currentFunction(accumulator),
		input
	);

const stringToNumber = (stringValue) => +stringValue;

const cloneArray = (inputArray) => [...inputArray];

const returnTrueIfNull = (input) => input ?? true;

const returnTrueIfNullOrEmpty = (input) => input || true;

const exampleObject = Object.freeze({ a: 0, b: 1, c: 2 });

const { a, b, c } = exampleObject;

const callFunctionIfTrue = (maybeTrue, funcToCall) => maybeTrue && funcToCall();

const callFunctionIfFalse = (maybeTrue, funcToCall) =>
	maybeTrue || funcToCall();

const returnTrueIfArrayContainsItem = (inputArray, item) =>
	~inputArray.indexOf(item);
