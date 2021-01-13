const canvas = document.querySelector(".calcFigure__simulation");
const ctx = canvas.getContext("2d");

const useResultLineStyles = (context) => {
	context.strokeStyle = "rgba(255,0,0,0.5)";
	context.lineWidth = 2;
};

const useStandardLineStyles = (context) => {
	context.strokeStyle = "rgba(0,0,0,1)";
	context.lineWidth = 1;
};

const useHighlightedLineStyles = (context) => {
	context.strokeStyle = "rgba(0,255,0,1)";
	context.lineWidth = 3;
};

const createLineModel = (originX, originY, endX, endY, isResult = false) =>
	Object({
		originX: originX,
		originY: originY,
		endX: endX,
		endY: endY,
		isHighlighted: false,
		isResult: isResult,
	});

const createResultLine = (resultVector, startingOrigin) => {
	const isResult = true;
	const resultLine = createLineModel(
		startingOrigin.x,
		startingOrigin.y,
		startingOrigin.x + resultVector.x,
		startingOrigin.y + resultVector.y,
		isResult
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
	if (line.isHighlighted) {
		useHighlightedLineStyles(context);
	} else {
		if (line.isResult === true) {
			useResultLineStyles(context);
		} else {
			useStandardLineStyles(context);
		}
	}

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
