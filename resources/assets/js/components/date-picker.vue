<template>
	<div>
		<input type="text" :value="date" @click="toggleCalendar()">
		<calendar class="date-picker-calendar" v-show="showCalendar" @date-selected="getDate($event)"></calendar>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showCalendar: false,
			date: {
				toString: function(){return '';},
			}
		}
	},

	methods: {
		getDate(date) {
			this.date = date;
			this.toggleCalendar();
		},

		toggleCalendar() {
			this.showCalendar = !this.showCalendar;
		}
	}
}
</script>

<style>
	.date-picker-calendar {
		
	}
</style>