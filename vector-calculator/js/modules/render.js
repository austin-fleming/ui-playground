/* ADDING VECTORS */

import { VectorSet } from "./model.js";

const createNewTableVector = (vectorModel) => `
<div id="${vectorModel.id}" class="calcTable__row calcTable__row--vector">
	<div class="calcTable__item calcTable__item--title"></div>
	<input class="calcTable__item calcTable__item--input calcTable__item--x"></input>
	<input class="calcTable__item calcTable__item--input calcTable__item--y"></input>
	<output class="calcTable__item calcTable__item--input calcTable__item--magnitude"></output>
	<output class="calcTable__item calcTable__item--input calcTable__item--angle"></output>
	<button class="calcTable__item calcTable__item--delete">delete</button>
</div>
`;

const appendNewVectorHTML = (parentNode) => {
	const vectorNodes = getVectorNodes(parentNode);

	const maxVectorQuantity = 10;
	if (vectorNodes.length > maxVectorQuantity) return false;

	parentNode.innerHTML += createNewTableVector();

	return parentNode;
};

/* REMOVE VECTORS */

const removeVector = (nodeToRemove) => {
	nodeToRemove.remove();
};

export class ViewEngine {
	constructor() {
		this.calculatorNode = document.querySelector(`.calculator-wrapper`);
		this.tableNode = this.calculatorNode.querySelector(
			".calculatorPanel__calcTable"
		);
		this.vectorsNode = this.tableNode.querySelector(
			".calcTable__vectorList"
		);
	}

	createNewVectorHTML(vectorModel) {
		const vectorHTML = `
        <div id="${vectorModel.id}" class="calcTable__row calcTable__row--vector">
            <div class="calcTable__item calcTable__item--title">${vectorModel.name}</div>
            <input class="calcTable__item calcTable__item--input calcTable__item--x" type="text" value="${vectorModel.x}"></input>
            <input class="calcTable__item calcTable__item--input calcTable__item--y" type="text" value="${vectorModel.y}"></input>
            <output class="calcTable__item calcTable__item--output calcTable__item--magnitude">${vectorModel.magnitude}</output>
            <output class="calcTable__item calcTable__item--output calcTable__item--angle">${vectorModel.angle}</output>
            <button class="calcTable__item calcTable__item--delete">delete</button>
        </div>`;

		return vectorHTML;
	}

	buildVectorEntries(vectorSet) {
		const entriesReducer = (accumulator, currentVector) =>
			accumulator + this.createNewVectorHTML(currentVector);
		const vectorEntriesHTML = vectorSet.vectors.reduce(entriesReducer, "");
		return vectorEntriesHTML;
	}

	buildResultingVector(vectorModel) {
		const vectorHTML = `
        <div class="calcTable__row calcTable__row--vector">
            <div class="calcTable__item calcTable__item--title">${"Result"}</div>
            <output class="calcTable__item calcTable__item--output calcTable__item--x" type="text">${
				vectorModel.x
			}</output>
            <output class="calcTable__item calcTable__item--output calcTable__item--y" type="text">${
				vectorModel.y
			}</output>
            <output class="calcTable__item calcTable__item--output calcTable__item--magnitude">${
				vectorModel.magnitude
			}</output>
            <output class="calcTable__item calcTable__item--output calcTable__item--angle">${
				vectorModel.angle
			}<div></div>
        </div>`;
		return vectorHTML;
	}

	renderVectorTable(vectorSet) {
		this.vectorsNode.innerHTML = this.buildVectorEntries(vectorSet);
		this.vectorsNode.innerHTML += this.buildResultingVector(
			vectorSet.resultingVector
		);
	}
}
