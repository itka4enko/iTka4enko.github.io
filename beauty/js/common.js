$(document).ready(function(){
	if($(window).width() === 768){
		$('header .header-navigation ul li div').on('click', ()=>{
			$('.header-navigation').css('visibility', 'hidden')
		})
	}

	let setSectionTitleAbout = function () {

		let window_height = $(window).height();

		let as_top = $('#about-section .a-s__top').height();
		let as_bottom = $('#about-section .a-s__bottom').height();

		let as_middle = window_height - (as_top + as_bottom);

		let as_height = $('#about-section .section-title').outerHeight();
		let margin = (as_middle - as_height) / 2;

		if (as_middle < as_height) {
			//$('#about-section').css('height', 'auto');
			return;
		}

		$('.a-s__middle').height(as_middle - margin * 2).css({marginTop: margin, marginBottom: margin});
	}

	let checkSectionHeight = function () {

		$('section').each(function(){

			let s_height = $(this).outerHeight();
			let inner_height = 0;

			$(this).find("> *").each(function(){
				inner_height = inner_height + $(this).outerHeight() - 5;
			});

			let ids = [
				'routine-section',
				'expertise-section',
				'about-section',
			];

			if ($(window).width() > 751 && !ids.some(id=> id === $(this).attr('id'))) {
				if (inner_height > s_height) {
					$(this).css('height', 'auto');
				} else {
					$(this).css('height', '100vh');
				}
			} else {
				$(this).removeAttr('style');
			}
		});
	}

	let toggleMenu = $('.header-toggle').on('click', function() {
		let nav = $('.header-navigation');
		if (nav.css('visibility') === 'visible') {
			nav.css({visibility: 'hidden', opacity: 0.5});
		} else {
			nav.css({visibility: 'visible', opacity: 0.8});
		}
	});

	let changeToggleDisplay = function () {

		let nav = $('.header-navigation');

		if ($(window).width() > 751) {
			nav.css({visibility: 'visible', opacity: 1});
		} else {
			nav.css({visibility: 'hidden', opacity: 0.5});
		}

	}
	
	let manageScroll = function () {
		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();
        var mostUpperVisibleTop = 100000;
		var dscr = "";
		
		$("[data-show-menu]").each(function () {
		    var thisTop = $(this).offset().top;
            var thisBottom = thisTop + $(this).outerHeight();
            var thisIsVisible = thisBottom > viewportTop && thisTop < viewportBottom;
			
			if (thisIsVisible && thisTop < mostUpperVisibleTop) {
				mostUpperVisibleTop = thisTop;
				dscr = $(this).attr("data-scroll");
			}
		});
	}

	var toTop = $('#toTop');
	var hdr = $('#headerId');

	$(window).on('scroll', function() {
		
		var winTop = $(document).scrollTop();

		if(winTop >= 150) {
			toTop.removeAttr("hidden");
		} else {
			toTop.attr("hidden", true);
		}
		
		if(winTop >= 20) {
			hdr.css("background", "#000B14");
		} else {
			hdr.css("background", "");
		}
	})
	
	$('.scroll-top__button').on('click', function(e){
		e.preventDefault();
		$('html, body').animate({
	        scrollTop: $('body').offset().top
	    }, 1000);
	});

	changeToggleDisplay();
	//setSectionTitleAbout();
	checkSectionHeight();

	$(window).resize(function(){

		changeToggleDisplay();
		//setSectionTitleAbout();
		checkSectionHeight();

	});

	const popupLinks = document.querySelectorAll('.js-modal'),
		body = document.querySelector('body'),
		lockPadding = document.querySelectorAll('.lock-padding'), // для фиксированных обьектов
		timeout = 800;

	let unlock = true;

	if (popupLinks.length > 0) {
		popupLinks.forEach(item => {

			item.addEventListener('click', function (e) {

				e.preventDefault();
				const popupName = item.getAttribute('href').replace('#', '');			

				popupOpen(popupName);
				
			});
		});
	}

	const popupCloseIcon = document.querySelectorAll('.js-modal-close');

	if (popupCloseIcon.length > 0) {
		popupCloseIcon.forEach(item => {
			item.addEventListener('click', function (e) {
				popupClose(item.closest('.popup'));
				e.preventDefault();
			});
		});
	}

	$('.form-email-button').on('click', function(e){
		e.preventDefault();
		popupOpen('modal-request');
	});

	$('.w-s__buttons button').on('click', function(e){
		e.preventDefault();
		popupOpen('modal-steps');
	});

	$('.modal-steps__step').on('click', function(e) {
		e.preventDefault();
		$('.modal-steps__step').removeClass('active');
		$(this).addClass('active');
		if ($(this).attr('data-step')) {
			$('.modal-steps__options').find("[data-step]").addClass('hidden');
			$('.modal-steps__options').find("[data-step='"+$(this).attr('data-step')+"']").removeClass('hidden');

			let currStep = $(this).attr('data-step');
			$('.modal-steps__options').attr('data-curr-step', currStep);
			
			if (currStep == "1") {
				$('.previous-step').removeClass('active');
			} else {
				$('.previous-step').addClass('active');
			}
			if (currStep == "5") {
				$('.next-step').removeClass('active');
			} else {
				$('.next-step').addClass('active');
			}
		}
	});
	
	$('.previous-step').on('click', function(e) {
		e.preventDefault();
		let currStep = $('.modal-steps__options').attr('data-curr-step');
		if (currStep == "5") {
			$('.modal-steps__options').find("[data-step]").addClass('hidden');
			$('.modal-steps__options').find('[data-step="4"]').removeClass('hidden');
			$('.modal-steps__options').attr('data-curr-step', "4");
			$('.next-step').addClass('active');
			$('.modal-steps__step').removeClass('active');
			$('.modal-steps__step[data-step="4"]').addClass('active');
		}
		if (currStep == "4") {
			$('.modal-steps__options').find("[data-step]").addClass('hidden');
			$('.modal-steps__options').find('[data-step="3"]').removeClass('hidden');
			$('.modal-steps__options').attr('data-curr-step', "3");
			$('.next-step').addClass('active');
			$('.modal-steps__step').removeClass('active');
			$('.modal-steps__step[data-step="3"]').addClass('active');
		}
		if (currStep == "3") {
			$('.modal-steps__options').find("[data-step]").addClass('hidden');
			$('.modal-steps__options').find('[data-step="2"]').removeClass('hidden');
			$('.modal-steps__options').attr('data-curr-step', "2");
			$('.next-step').addClass('active');
			$('.modal-steps__step').removeClass('active');
			$('.modal-steps__step[data-step="2"]').addClass('active');
		}
		if (currStep == "2") {
			$('.modal-steps__options').find("[data-step]").addClass('hidden');
			$('.modal-steps__options').find('[data-step="1"]').removeClass('hidden');
			$('.modal-steps__options').attr('data-curr-step', "1");
			$('.next-step').addClass('active');
			$(this).removeClass('active');
			$('.modal-steps__step').removeClass('active');
			$('.modal-steps__step[data-step="1"]').addClass('active');
		}
	});
	
	$('.next-step').on('click', function(e) {
		e.preventDefault();
		let currStep = $('.modal-steps__options').attr('data-curr-step');
		if (currStep == "1") {
			$('.modal-steps__options').find("[data-step]").addClass('hidden');
			$('.modal-steps__options').find('[data-step="2"]').removeClass('hidden');
			$('.modal-steps__options').attr('data-curr-step', "2");
			$('.previous-step').addClass('active');
			$('.modal-steps__step').removeClass('active');
			$('.modal-steps__step[data-step="2"]').addClass('active');
		}
		if (currStep == "2") {
			$('.modal-steps__options').find("[data-step]").addClass('hidden');
			$('.modal-steps__options').find('[data-step="3"]').removeClass('hidden');
			$('.modal-steps__options').attr('data-curr-step', "3");
			$('.previous-step').addClass('active');
			$('.modal-steps__step').removeClass('active');
			$('.modal-steps__step[data-step="3"]').addClass('active');
		}
		if (currStep == "3") {
			$('.modal-steps__options').find("[data-step]").addClass('hidden');
			$('.modal-steps__options').find('[data-step="4"]').removeClass('hidden');
			$('.modal-steps__options').attr('data-curr-step', "4");
			$('.previous-step').addClass('active');
			$('.modal-steps__step').removeClass('active');
			$('.modal-steps__step[data-step="4"]').addClass('active');
		}
		if (currStep == "4") {
			$('.modal-steps__options').find("[data-step]").addClass('hidden');
			$('.modal-steps__options').find('[data-step="5"]').removeClass('hidden');
			$('.modal-steps__options').attr('data-curr-step', "5");
			$('.previous-step').addClass('active');
			$(this).removeClass('active');
			$('.modal-steps__step').removeClass('active');
			$('.modal-steps__step[data-step="5"]').addClass('active');
		}
	});

	$('.header-navigation a[href^="#"]').on('click', function (event) {
	    event.preventDefault();

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top - $('header').outerHeight(),
	    }, 1000);
	});

	function popupOpen(popupName) {

		let currentPopup = document.getElementById(popupName);

		if (currentPopup && unlock) {
			const popupActive = document.querySelector('.popup.active');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			currentPopup.classList.add('active');
			/*
			currentPopup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
			*/
		}
	}

	function popupClose(popupActive, doUnLock = true) {

		if (!popupActive.classList) {
			popupActive = document.getElementById(popupActive);
		}

		if (unlock) {
			popupActive.classList.remove('active');
			if (doUnLock) {
				bodyUnLock();
			}
		}
	}

	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('.popup').offsetWidth + 'px';
		if (lockPadding.langth > 0) {
			lockPadding.forEach(item => {
				item.style.paddingRight = lockPaddingValue;
			});
		}
		//body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock'); // в css добавить body.lock overflow: hidden; 

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	function bodyUnLock() {
		setTimeout(function () {
			if (lockPadding.length > 0) {
				lockPadding.forEach(item => {
					item.style.paddingRight = '0px';
				});
			}
			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

});