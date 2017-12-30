var ViewComponent = require('@earthtone/view-class');
var html = require('bel');

window.addEventListener('load', async function(){
	var container = document.querySelector('.container');

	var list = new ViewComponent({
		parentNode: container.querySelector('aside'),
		data: ['red', 'cyan', 'yellow']
	});

	list.render = function(){
		return html`<ul id="item-list">
			${this.data.map(item => html`<li class="list-item">${item}</li>`)}
		</ul>`;
	};
	
	let req = await fetch('https://api.giphy.com/v1/gifs/random?api_key=eGglyHG8VvqHaTAgAiIONyThi1A542z2');
	let res = await req.json();
	
	var img = container.querySelector('img');
	img.src = res.data.image_original_url;

	list.mount();
});