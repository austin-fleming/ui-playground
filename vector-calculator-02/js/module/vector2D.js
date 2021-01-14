class Point2D {
	constructor(x = 0, y = 0) {
		this._x = x;
		this._y = y;
	}

	get x() {
		return this._x;
	}

	set x(x) {
		this._x = x;
	}

	get y() {
		return this._y;
	}

	set y(y) {
		this._y = y;
	}
}

export class Vector2D {
	constructor(x = 0, y = 0) {
		this._x = x;
		this._y = y;
	}

	get x() {
		return this._x;
	}

	set x(x) {
		this._x = x;
	}

	get y() {
		return this._y;
	}

	set y(y) {
		this._y = y;
	}

	get magnitude() {
		const getVectorMagnitude = (vector) =>
			Math.sqrt(vector._x * vector._x + vector._y * vector._y);
		return getVectorMagnitude(this);
	}

	get angle() {
		const convertRadiansToDegrees = (radians) => radians * (180 / Math.PI);

		const angleInRadians = Math.atan2(this._y, this._x);
		return convertRadiansToDegrees(angleInRadians);
	}

	matchVector(vector) {
		this._x = vector.x;
		this._y = vector.y;
	}

	clone() {
		return new Vector2D(this.x, this.y);
	}

	add(vector) {
		this._x += vector.x;
		this._y += vector.y;
		return this;
	}

	subtract(vector) {
		this._x -= vector.x;
		this._y -= vector.y;
		return this;
	}

	multiply(scalar) {
		this._x *= scalar;
		this._y *= scalar;
		return this;
	}
}

/* HELPERS */
const round = (number, decimalPlaces) => {
	const factorOfTen = Math.pow(10, decimalPlaces);
	return Math.round(number * factorOfTen) / factorOfTen;
};
