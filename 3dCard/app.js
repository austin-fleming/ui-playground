const apply3dTiltEffect = (cardContainer) => {
	const SENSITIVITY_REDUCTION_X = 10;
	const SENSITIVITY_REDUCTION_Y = 20;

	const card = cardContainer.querySelector(".card");
	const cardContainerBounds = cardContainer.getBoundingClientRect();

	function resetElementStyles() {
		[...cardContainer.querySelectorAll("*")].forEach((node) => {
			node.style.transition = `all 0.5s ease`;
			node.style.transform = `translateZ(0) scale(1,1)`;
		});
	}

	function apply3dStyles() {
		const cardImage = card.querySelector(".card__image");
		const cardButton = card.querySelector(".card__button");
		const cardText = card.querySelector(".card__text");

		const cardBorder01 = card.querySelector(".card__border--01");
		const cardBorder02 = card.querySelector(".card__border--02");
		const cardBorder03 = card.querySelector(".card__border--03");

		cardImage.style.transform = `translateZ(${20}px) scale(1.6,1.6)`;
		cardButton.style.transform = `translateZ(${45}px)`;
		cardText.style.transform = `translateZ(${45}px)`;

		cardBorder01.style.transform = `translateZ(${45}px)`;
		cardBorder02.style.transform = `translateZ(${30}px)`;
		cardBorder03.style.transform = `translateZ(${15}px)`;
	}

	function prepare3dStyles() {
		card.style.transition = "none";
		apply3dStyles();
	}

	function applyCardTilt(event) {
		const adjustedMouseX = event.pageX - cardContainerBounds.left;
		const adjustedMouseY = event.pageY - cardContainerBounds.top;

		const cardCenterX = cardContainer.clientWidth / 2;
		const cardCenterY = cardContainer.clientHeight / 2;

		const invert = (number) => number * -1;

		let xAxis = invert(
			(cardCenterX - adjustedMouseX) / SENSITIVITY_REDUCTION_X
		);
		let yAxis = (cardCenterY - adjustedMouseY) / SENSITIVITY_REDUCTION_Y;

		card.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;

		offsetElements();
	}

	resetElementStyles();
	cardContainer.addEventListener("mouseenter", prepare3dStyles);
	cardContainer.addEventListener("mousemove", applyCardTilt);
	cardContainer.addEventListener("mouseleave", resetElementStyles);
};

window.addEventListener("load", () => {
	const cardContainers = document.querySelectorAll(".card__container");
	cardContainers.forEach(apply3dTiltEffect);
});
