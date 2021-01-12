const canvas = document.querySelector(".calcFigure__simulation");
const ctx = canvas.getContext("2d");

const createLineModel = (originX, originY, endX, endY) =>
	Object({
		originX: originX,
		originY: originY,
		endX: endX,
		endY: endY,
		highlighted: false,
		isResult: false,
	});

const createResultLine = (resultVector, startingOrigin) => {
	const resultLine = createLineModel(
		startingOrigin.x,
		startingOrigin.y,
		startingOrigin.x + resultVector.x,
		startingOrigin.y + resultVector.y
	);

	return resultLine;
};

const createLineList = (vectorModelSet, startingOrigin) => {
	let currentOrigin = {
		x: startingOrigin.x,
		y: startingOrigin.y,
	};

	const newLineList = vectorModelSet.vectors.map((vectorModel) => {
		const newLineModel = createLineModel(
			currentOrigin.x,
			currentOrigin.y,
			currentOrigin.x + vectorModel.x,
			currentOrigin.y + vectorModel.y
		);

		currentOrigin.x += vectorModel.x;
		currentOrigin.y += vectorModel.y;

		return newLineModel;
	});

	return newLineList;
};

const getCanvasCenter = (canvas) =>
	Object({
		x: canvas.width / 2,
		y: canvas.height / 2,
	});

/* Drawing */
const sizeContext = () => {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
};

const renderLine = (context, line) => {
	console.log(line.originX, line.originY, " | ", line.endX, line.endY);
	context.beginPath();
	context.moveTo(line.originX, line.originY);

	context.lineTo(line.endX, line.endY);
	context.stroke();
};

export const simulation = (vectorModelSet) => {
	console.log(canvas);
	sizeContext();
	const startingOrigin = getCanvasCenter(canvas);

	const lineList = createLineList(vectorModelSet, startingOrigin);
	const resultLine = createResultLine(
		vectorModelSet.resultingVector,
		startingOrigin
	);

	const contextBoundRenderLine = renderLine.bind(null, ctx);

	lineList.forEach(contextBoundRenderLine);
	contextBoundRenderLine(resultLine);
};
