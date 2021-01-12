export class Vector2D {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	set value(point) {
		this.x = point[0];
		this.y = point[1];
	}

	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	}

	subtract(vector) {
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	}

	multiply(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	divide(scalar) {
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	limitTo(limit) {
		this.divide(this.length);
		this.multiply(limit);
		return this;
	}

	dotProduct(vector) {
		return this.x * vector.x + this.y * vector.y;
	}

	clone() {
		return new Vector2D(this.x, this.y);
	}

	get unitVector() {
		const length = this.length;
		return new Vector2D(this.x / length, this.y / length);
	}

	get length() {
		const magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
		return this.round(magnitude, 6);
	}

	angleFrom(vector) {
		return Math.acos(
			this.dotProduct(vector) /
				(Math.abs(this.length) * Math.abs(vector.length))
		);
	}

	get angle() {
		const radians = Math.atan2(this.y, this.x);
		const degrees = this.radToDeg(radians);
		return this.round(degrees, 6);
	}

	radToDeg(radians) {
		return radians * (180 / Math.PI);
	}

	round(number, decimalPlaces) {
		const factorOfTen = Math.pow(10, decimalPlaces);
		return Math.round(number * factorOfTen) / factorOfTen;
	}
}
