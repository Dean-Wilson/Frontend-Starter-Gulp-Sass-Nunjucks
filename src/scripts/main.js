$(document).ready(function () {
		console.log('Dev mode - if this is the production environment then you fogot to run gulp build!');
		/**
		 * Smooth scroll component
		 *
		 * Usage example:
			<a href="#target" class="trigger" data-scroll-to>Scroll to target</a>
			<button data-scroll-to="#target">Go to target</button>
			...
			<div id="target"></div>
		 */
		$('[data-scroll-to]').each(function () {
			var trigger = $(this);
			var $target = $(trigger.attr('href') || trigger.data('scrollTo'));

			if (!$target.length) {
				return;
				
			}

			trigger.on('click', function (e) {
				e.preventDefault();
				$('html, body').stop().animate({
					scrollTop: $target.offset().top
				}, 600);
			});
		});
});
