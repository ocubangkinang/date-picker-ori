<template>
	<div class="calendar">
		<div class="calendar-header">
			<div class="calendar-navigation text-left"> <button @click="decreaseMonth()">{{ '<' }}</button> </div>
			<div class="calendar-header-text">{{ months[month].name }} {{ year }}</div>
			<div class="calendar-navigation text-right"> <button @click="increaseMonth()">{{ '>' }}</button> </div>
		</div>
		<table>
			<thead>
				<tr>
					<th v-for="day in days">{{ day.shortName }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="weeks in getWeeks(months[month])">
					<td v-for="date in weeks">
						<span class="date-button" @click="emitDateSelected(date)" v-if="date">{{ date }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			month: 0,
			year: 2017,
			months: [
				{
					name: 'January',
					totalDay: 31,
					index: 10
				},
				{
					name: 'February',
					totalDay: 28,
					index: 11
				},
				{
					name: 'March',
					totalDay: 31,
					index: 0
				},
				{
					name: 'April',
					totalDay: 30,
					index: 1
				},
				{
					name: 'May',
					totalDay: 31,
					index: 2
				},
				{
					name: 'June',
					totalDay: 30,
					index: 3
				},
				{
					name: 'July',
					totalDay: 31,
					index: 4
				},
				{
					name: 'August',
					totalDay: 31,
					index: 5
				},
				{
					name: 'September',
					totalDay: 30,
					index: 6
				},
				{
					name: 'October',
					totalDay: 31,
					index: 7
				},
				{
					name: 'November',
					totalDay: 30,
					index: 8
				},
				{
					name: 'December',
					totalDay: 31,
					index: 9
				},
			],
			days: [
				{
					name: 'Sunday',
					shortName: 'Su'
				},
				{
					name: 'Moday',
					shortName: 'Mo'
				},
				{
					name: 'Tuesday',
					shortName: 'Tu'
				},
				{
					name: 'Wednesday',
					shortName: 'We'
				},
				{
					name: 'Thursday',
					shortName: 'Th'
				},
				{
					name: 'Friday',
					shortName: 'Fr'
				},
				{
					name: 'Saturday',
					shortName: 'Sa'
				}
			]
		}
	},

	methods: {
		getWeeks(month) {
			var dates = [];

			if(month.index == 11) {
				if(this.isLeapYear(this.year)) {
					month.totalDay = 29;
				} else {
					month.totalDay = 28;
				}
			}

			var startDay = this.getDayOfTheWeek(1, month, this.year);

			for(var i=1; i<=month.totalDay; i++) {
				dates[i+startDay-1] = i;
			}

			var weeks = [];

			while(true) {
				var week = dates.splice(0, 7);

				if(week.length == 0)
					break;

				weeks.push(week);
			}

			return weeks;
		},

		isLeapYear(year) {
			var isLeap = false;

			if(year % 4 == 0)
				isLeap = true;

			if(year % 100 == 0)
				isLeap = false;

			if(year % 400 == 0 && year % 4 == 0)
				isLeap = true;

			return isLeap;
		},

		getDayOfTheWeek(day, month, year) {
			var k = day;
			var m = month.index + 1;
			var C = (year - (year % 100)) / 100;
			var Y = year % 100;

			if(month.index == 10 || month.index == 11) {
				Y = Y - 1;
			}

			var d = (((k + Math.floor(2.6*m - 0.2) + Math.floor(Y/4) + Math.floor(C/4) + Y - 2*C) % 7) + 7) % 7;

			console.log('k: ' + k + '\nm: ' + m + '\nC: ' + C + '\nY: ' + Y + '\nresult: ' + d);

			return d;
		},

		increaseMonth() {
			if(this.month + 1 == 12) {
				this.month = 0;
				this.year++;
			} else {
				this.month++;
			}
		},

		decreaseMonth() {
			if(this.month - 1 == -1) {
				this.month = 11;
				this.year--;
			} else {
				this.month--;
			}
		},

		emitDateSelected(selectedDate) {
			var date = {
				day: selectedDate,
				month: this.month + 1,
				year: this.year,

				toString: function() {
					return this.month + '/' + this.day + '/' + this.year;
				}
			}

			this.$emit('date-selected', date);
		}
	}
}
</script>

<style>
	.calendar {
		border-style: groove;
		border-width: thin;
		width: 338px;
	}

	.calendar th {
		padding: 3px;
		text-align: center;
	}

	.calendar td {
		text-align: right;
		padding-top: 8px;
		padding-bottom: 8px;
	}

	.calendar td:hover {
		background-color: #eee;
		border-width: 1px;
		padding-top: 6px;
		padding-bottom: 6px;
	}

	.date-button {
		width: 100%;
		padding: 16px;
	}
	
	.calendar-header {
		background-color: #eee;
		margin-left: 0;
		margin-right: 0;
		padding: 0;
		padding-top: 5px;
		padding-bottom: 5px;
	}

	.calendar-header-text {
		text-align: center;
		font-weight: bold;
		display: inline-block;
		width: 77%;
	}

	.calendar-navigation {
		display: inline-block;
		width: 10%;
	}

	.text-left {
		text-align: center;
	}

	.text-right {
		text-align: center;
	}
</style>