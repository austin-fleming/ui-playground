import { Vector2D } from "./vector2D.js";

class VectorModel {
	constructor() {
		this._id = this.generateRandomId();
		this._name = null;
		this._isResult = false;
		this._isHighlighted = false;

		this.vector = new Vector2D();

		this.magnitude = this.vector.length;
		this.angle = this.vector.angle;

		this.isNeedingUpdate = false;
	}

	set x(x) {
		this.vector.x = x;
		this.isNeedingUpdate = true;
	}

	set y(y) {
		this.vector.y = y;
		this.isNeedingUpdate = true;
	}

	set name(name) {
		this._name = `Vector ${name}`;
	}

	set isResult(isResult) {
		this._isResult = isResult;
	}

	set isHighlighted(isHighlighted) {
		this._isHighlighted = isHighlighted;
	}

	get x() {
		return this.vector.x;
	}

	get y() {
		return this.vector.y;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get isResult() {
		return this._isResult;
	}

	get isHighlighted() {
		return this._isHighlighted;
	}

	update() {
		if (this.isNeedingUpdate) {
			this.magnitude = this.vector.length;
			this.angle = this.vector.angle;

			this.isNeedingUpdate = false;
		}
	}

	generateRandomId() {
		return "_" + Math.random().toString(36).substr(2, 9);
	}
}

export class VectorSet {
	constructor(startingVectorQuantity = 2) {
		this._vectors = [];
		this._resultingVector = new VectorModel();
		this._vectorNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		this.isNeedingUpdate = false;

		this.addEmptyVectorsByQuantity(startingVectorQuantity);
	}

	addEmptyVector() {
		this._vectors.push(new VectorModel());
		this.isNeedingUpdate = true;
	}

	addEmptyVectorsByQuantity(quantity) {
		const startingVectors = [...Array(quantity)].map(
			(vector) => new VectorModel()
		);
		this._vectors = [...startingVectors];
	}

	removeVectorById(vectorId) {
		const vectorsWithoutMatchingId = this._vectors.filter(
			(vector) => vector.id != vectorId
		);
		this._vectors = vectorsWithoutMatchingId;
		this.isNeedingUpdate = true;
	}

	updateVectorX(vectorId, newX) {
		this._vectors = this._vectors.map((vector) => {
			if (vector.id === vectorId) {
				vector.x = newX;
			}

			return vector;
		});

		this.isNeedingUpdate = true;
	}

	updateVectorY(vectorId, newY) {
		console.log(`${vectorId} | ${newY}`);
		this._vectors = this._vectors.map((vector) => {
			console.log(vector.id, vectorId);
			if (vector.id === vectorId) {
				vector.y = newY;
			}

			return vector;
		});

		this.isNeedingUpdate = true;
	}

	getVectorById(vectorId) {
		return this._vectors.filter((vector) => vector.id === vectorId);
	}

	get vectors() {
		return this._vectors;
	}

	get resultingVector() {
		return this._resultingVector;
	}

	updateResult() {
		const xReducer = (accumulator, vector) => accumulator + vector.x;
		const yReducer = (accumulator, vector) => accumulator + vector.y;
		this._resultingVector.x = this._vectors.reduce(xReducer, 0);
		this._resultingVector.y = this._vectors.reduce(yReducer, 0);
		this._resultingVector.update();
		console.log(this._resultingVector);
	}

	updateVectors() {
		this._vectors.forEach((vector, index) => {
			vector.update();
			vector.name = this._vectorNames[index];
			console.log(vector.name);
		});
		this.updateResult();
	}
}
