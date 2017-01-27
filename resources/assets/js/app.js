window.$ = window.jQuery = require('jquery');

window.Vue = require('vue');

require('bootstrap-sass');

Vue.component('calendar', require('./components/calendar.vue'));
Vue.component('date-picker', require('./components/date-picker.vue'));

const app = new Vue({
	el: '#app',
});