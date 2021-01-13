const canvas = document.querySelector(".calcFigure__simulation");
const ctx = canvas.getContext("2d");

/* CANVAS */
const getCanvasCenter = (canvas) =>
	Object.freeze({
		x: canvas.width / 2,
		y: canvas.height / 2,
	});

const sizeContext = (canvas) => {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
};

/* VARIABLES */
const LINE_STYLE_SETTERS = Object.freeze({
	default: (context) => {
		context.strokeStyle = "rgba(0,0,0,1)";
		context.lineWidth = 1;
	},
	result: (context) => {
		context.strokeStyle = "rgba(255,0,0,0.5)";
		context.lineWidth = 2;
	},
	highlight: (context) => {
		context.strokeStyle = "rgba(0,255,0,1)";
		context.lineWidth = 3;
	},
});

/* MODEL */
const createLineData = (
	fromX,
	fromY,
	toX,
	toY,
	isResult = false,
	isHighlighted = false
) =>
	Object.freeze({
		fromX: fromX,
		fromY: fromY,
		toX: toX,
		toY: toY,
		isResult: isResult,
		isHighlighted: isHighlighted,
	});

const createLineDataFromVectorModel = (model) =>
	createLineData(0, 0, model.x, model.y, model.isResult, model.isHighlighted);

/* MANIPULATE MODEL */
const invert = (number) => -1 * number;

const invertLineDataY = (lineData) =>
	Object.freeze({
		...lineData,
		fromY: invert(lineData.fromY),
		toY: invert(lineData.toY),
	});

const invertLineDataListY = (lineDataList) => lineDataList.map(invertLineDataY);

const getFactorsFromLineDataList = (lineDataList) =>
	lineDataList.filter((lineData) => !lineData.isResult);

const getResultFromLineDataList = (lineDataList) =>
	lineDataList.filter((lineData) => lineData.isResult);

const getHighlightedFromLineDataList = (lineDataList) =>
	lineDataList.filter((lineData) => lineData.isHighlighted);

const sizeLineDataListToCanvasEdges = (
	canvas,
	lineDataList,
	isInverted = false
) => {
	const measuringList = isInverted
		? invertLineDataListY(lineDataList)
		: lineDataList;

	const originX = canvas.width / 2;
	const originY = canvas.height / 2;

	const shiftedToOrigin = measuringList.map((lineData) =>
		Object.freeze({
			...lineData,
			fromX: lineData.fromX - originX,
			fromY: lineData.fromY - originY,
			toX: lineData.toX - originX,
			toY: lineData.toY - originY,
		})
	);

	let minX = 0;
	let maxX = 0;
	let minY = 0;
	let maxY = 0;

	shiftedToOrigin.forEach((lineData) => {
		minX = lineData.toX - originX < minX ? lineData.toX - originX : minX;
		maxX = lineData.toX - originX > maxX ? maxX : lineData.toX - originX;
		minY = lineData.toY + originY < minY ? lineData.toY + originY : minY;
		maxY = lineData.toY + originY > maxY ? maxY : lineData.toY + originY;
	});

	const maxDistanceFromOrigin = Math.max(
		Math.abs(maxX),
		Math.abs(maxY),
		minX,
		minY
	);

	const maxPercentageOfCanvas = maxDistanceFromOrigin / (canvas.width / 2);
	const scaleFactor = 1 / maxPercentageOfCanvas;

	console.log("p", maxDistanceFromOrigin);
	console.log("z", minX, maxX, minY, maxY);

	return lineDataList.map((lineData) =>
		Object.freeze({
			...lineData,
			fromX: (lineData.fromX - originX) * scaleFactor + originX,
			fromY: (lineData.fromY - originY) * scaleFactor + originY,
			toX: (lineData.toX - originX) * scaleFactor + originX,
			toY: (lineData.toY - originY) * scaleFactor + originY,
		})
	);
};

/* INIT */
const initLineDataList = (modelList) =>
	modelList.map(createLineDataFromVectorModel);

const shiftLineDataListOrigins = (lineDataList, origin = { x: 0, y: 0 }) => {
	let currentX = origin.x;
	let currentY = origin.y;

	return lineDataList.map((lineData, index) => {
		const adjustedFromX = currentX;
		const adjustedFromY = currentY;

		currentX += lineData.toX;
		currentY += lineData.toY;

		return Object.freeze({
			...lineData,
			fromX: adjustedFromX,
			fromY: adjustedFromY,
			toX: currentX,
			toY: currentY,
		});
	});
};
/* RENDER */
const drawLine = (context, lineData) => {
	context.beginPath();
	context.moveTo(lineData.fromX, lineData.fromY);
	context.lineTo(lineData.toX, lineData.toY);
	context.stroke();
};

const renderLineData = (context, lineData) => {
	const renderStyleSetter = lineData.isHighlighted
		? LINE_STYLE_SETTERS.highlight
		: lineData.isResult
		? LINE_STYLE_SETTERS.result
		: LINE_STYLE_SETTERS.default;

	renderStyleSetter(context);
	drawLine(context, lineData);
};

const renderLineDataList = (context, lineDataList) => {
	const ctxBoundRenderLineData = renderLineData.bind(null, context);
	lineDataList.forEach(ctxBoundRenderLineData);
};

/* LOOP */
const buildLinesToRender = (canvas, vectorModelSet) => {
	const origin = getCanvasCenter(canvas);

	const lineDataList = initLineDataList(vectorModelSet.vectors);

	const invertedLineDataList = invertLineDataListY(lineDataList);

	const factors = getFactorsFromLineDataList(invertedLineDataList);
	const results = getResultFromLineDataList(invertedLineDataList);

	const factorsShifted = shiftLineDataListOrigins(factors, origin);
	const resultsShifted = shiftLineDataListOrigins(results, origin);

	const builtLineList = [...factorsShifted, ...resultsShifted];

	const resizedLineList = sizeLineDataListToCanvasEdges(
		canvas,
		builtLineList,
		true
	);

	return resizedLineList;
};

export const simulation = (vectorModelSet) => {
	sizeContext(canvas);

	const lineSet = buildLinesToRender(canvas, vectorModelSet);

	console.log(lineSet);
	renderLineDataList(ctx, lineSet);
};
