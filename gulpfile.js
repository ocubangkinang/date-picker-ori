const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

elixir((mix) => {
	mix.webpack('app.js')
		.sass('app.scss');
});