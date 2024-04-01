window.addEventListener("DOMContentLoaded", () => {
	// tabs start
	const tabs = document.querySelectorAll(".tabheader__items .tabheader__item ");
	const tabsContent = document.querySelectorAll(".tabcontainer .tabcontent");
	const tabsParent = document.querySelector(".tabheader__items");
	let animate = true;


	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add("hide");
			item.classList.remove("show", `${animate ? "fade" : null}`);
		});

		tabs.forEach(item => {
			item.classList.remove("tabheader__item_active");
		});

	}
	function showTabContent(item = 0) {
		tabsContent[item].classList.remove("hide");
		tabsContent[item].classList.add("show", `${animate ? "fade" : null}`);
		tabs[item].classList.add("tabheader__item_active");
	}
	hideTabContent();
	showTabContent()

	tabsParent.addEventListener("click", (e) => {
		if (e.target && e.target.matches(".tabheader__item")) {
			tabs.forEach((item, index) => {
				if (e.target === item) {
					hideTabContent();
					showTabContent(index);
				}
			});
		}
	});
	//tabs end


	//************************************************************************/

	//timer start



	const deadline = "2024-06-28";

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		total = Date.parse(endtime) - Date.parse(new Date());

		if (total <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;


			//alternative variant 
			// document.querySelector(".timer").innerHTML = `

			// <h4
			// style="
			// text-align:center;
			// color:red;
			// width:100%;
			// text-transform: uppercase;
			// font-size:35px;
			// "
			// >
			// sale is out !!!
			// </h4>
			// `;

		} else {
			days = Math.floor(total / (1000 * 60 * 60 * 24));
			hours = Math.floor(total / (1000 * 60 * 60) % 24);
			minutes = Math.floor((total / 1000 / 60) % 60);
			seconds = Math.floor((total / 1000) % 60);

		}


		return { total, days, hours, minutes, seconds };
	}

	function setZero(n) {
		return n >= 0 && n < 10 ? `0${n}` : n;
	};

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const daysElements = timer.querySelector("#days");
		const hoursElements = timer.querySelector("#hours");
		const minutesElements = timer.querySelector("#minutes");
		const secondsElements = timer.querySelector("#seconds");
		const intervalID = setInterval(updateClock, 1000);

		updateClock();
		function updateClock() {
			const { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);

			daysElements.innerHTML = setZero(days);
			hoursElements.innerHTML = setZero(hours);
			minutesElements.innerHTML = setZero(minutes);
			secondsElements.innerHTML = setZero(seconds);

			if (total <= 0) {
				clearInterval(intervalID);
			}
		}
	}
	setClock(".timer", deadline);


	//timer end

	// modal start

	const openModalBtn = document.querySelectorAll("[data-open-modal]");
	const modal = document.querySelector("[data-modal]");
	const closeModalBtn = document.querySelector("[data-close-modal]");

	function openModal(){
		modal.classList.add("show");
		document.body.style.overflow = "hidden"
		modal.dataset.isOpen = true;
		clearTimeout(modalTimerId);
	}

	function closeModal(){
		modal.classList.remove("show");
		document.body.style.overflow = "";
		modal.dataset.isOpen = false;
	}

	function closeModalAnotherVariants(event){
		if(event.target === modal || event.code === "Escape"){
			if(modal.matches(".show")){
			closeModal();
			}
		}
	}


openModalBtn.forEach(btn => btn.addEventListener("click", openModal));
closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => closeModalAnotherVariants (e));
document.addEventListener('keydown', (e) => closeModalAnotherVariants(e));


const modalTimerId = setTimeout(openModal, 30000);



function showModalByScroll(){
	if(
		window.scrollY + document.documentElement.clientHeight 
		>= 
		document.documentElement.scrollHeight - 1
		&& 
		modal.dataset.isOpen === "false"
		) {
		openModal();
		window.removeEventListener("scroll", showModalByScroll)
	}
}

window.addEventListener("scroll", showModalByScroll)
// modal end
});

