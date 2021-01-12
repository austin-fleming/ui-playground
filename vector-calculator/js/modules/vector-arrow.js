// https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag

/* function canvas_arrow(context, fromx, fromy, tox, toy, r) {
	var x_center = tox;
	var y_center = toy;

	var angle;
	var x;
	var y;

	context.beginPath();

	angle = Math.atan2(toy - fromy, tox - fromx);
	x = r * Math.cos(angle) + x_center;
	y = r * Math.sin(angle) + y_center;

	context.moveTo(x, y);

	angle += (1 / 3) * (2 * Math.PI);
	x = r * Math.cos(angle) + x_center;
	y = r * Math.sin(angle) + y_center;

	context.lineTo(x, y);

	angle += (1 / 3) * (2 * Math.PI);
	x = r * Math.cos(angle) + x_center;
	y = r * Math.sin(angle) + y_center;

	context.lineTo(x, y);

	context.closePath();

	context.fill();
} */

const findArrowPoint = (angle, center, radius) =>
	Object({
		x: radius * Math.cos(angle) + center.x,
		y: radius * Math.sin(angle) + center.y,
	});

const findNextEquilateralTriangleAngle = (previousAngle) =>
	previousAngle + (1 / 3) * (2 * Math.PI);

const drawFilledTriangle = (ctx, pt1, pt2, pt3) => {
	ctx.beginPath();
	ctx.moveTo(pt1.x, pt1.y);
	ctx.lineTo(pt2.x, pt2.y);
	ctx.lineTo(pt3.x, pt3.y);
	ctx.closePath();
	ctx.fill();
};

const arrow = (ctx, start, end, radius) => {
	const center = {
		x: end.x,
		y: end.y,
	};

	const angle1 = Math.atan2(end.y - start.y, end.x - start.x);
	const angle2 = findNextEquilateralTriangleAngle(angle1);
	const angle3 = findNextEquilateralTriangleAngle(angle2);

	const arrowPoint1 = findArrowPoint(angle1, center, radius);
	const arrowPoint2 = findArrowPoint(angle2, center, radius);
	const arrowPoint3 = findArrowPoint(angle3, center, radius);

	drawFilledTriangle(ctx, arrowPoint1, arrowPoint2, arrowPoint3);
};
