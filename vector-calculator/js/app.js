import { VectorSet } from "./modules/model.js";
import { ViewEngine } from "./modules/render.js";

const getVectorNodes = (parentNode) =>
	parentNode.querySelectorAll(".calcTable__row--vector");

const nameVectors = (vectorList, nameList) => {
	const vectors = [...getVectorNodes(vectorList)];
	vectors.forEach((node, nodeIndex) => {
		node.querySelector(
			".calcTable__item--title"
		).innerHTML = `Vector ${nameList[nodeIndex]}`;
	});
};

/* APP */
export function app() {
	const viewEngine = new ViewEngine();
	const vectorSet = new VectorSet();
	vectorSet.updateVectors();
	viewEngine.renderVectorTable(vectorSet);

	viewEngine.vectorsNode.addEventListener("change", (event) => {
		if (event.target.classList.contains("calcTable__item--input")) {
			if (event.target.classList.contains("calcTable__item--x")) {
				vectorSet.updateVectorX(
					event.target.parentNode.id,
					parseFloat(event.target.value)
				);
			}

			if (event.target.classList.contains("calcTable__item--y")) {
				vectorSet.updateVectorY(
					event.target.parentNode.id,
					parseFloat(event.target.value)
				);
			}

			vectorSet.updateVectors();
			viewEngine.renderVectorTable(vectorSet);
		}
	});

	viewEngine.tableNode.addEventListener("click", (event) => {
		if (event.target.classList.contains("calcTable__item--delete")) {
			const deleteButton = event.target;
			const vectorRowToDelete = deleteButton.parentNode;

			vectorSet.removeVectorById(vectorRowToDelete.id);

			vectorSet.updateVectors();
			viewEngine.renderVectorTable(vectorSet);
		}

		if (event.target.classList.contains("calcTable__item--add")) {
			vectorSet.addEmptyVector();

			vectorSet.updateVectors();
			viewEngine.renderVectorTable(vectorSet);
		}
	});

	/* const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const tableNode = document.querySelector(".calculatorPanel__calcTable");
	const vectorListNode = tableNode.querySelector(".calcTable__vectorList");

	tableNode.addEventListener("click", (event) => {
		console.log(event.target);

		if (event.target.classList.contains("calcTable__item--delete")) {
			const deleteButton = event.target;
			const vectorRowToDelete = deleteButton.parentNode;
			removeVector(vectorRowToDelete);
			nameVectors(vectorListNode, alphabet);
		}

		if (event.target.classList.contains("calcTable__item--add")) {
			appendNewVectorHTML(vectorListNode);
			nameVectors(vectorListNode, alphabet);
		}
	});

	const test = new VectorSet(4);
	test.addEmptyVector();

	console.log(test.vectors); */
}
