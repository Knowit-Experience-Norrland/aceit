<script lang="ts">
	// vim:foldmethod=marker

	import { onDestroy, onMount } from 'svelte';
	import { displayMonthAndYear, displayYearMonthAndDay } from '$lib/date';

	const weekdays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

	// props {{{
	export let selectedDates: Date[];
	// }}}

	// states {{{
	let currentMonth = new Date().getMonth();
	let currentYear = new Date().getFullYear();
	let days: Date[] = [];
	let open = false;
	// }}}

	// reactive {{{
	$: startDate = selectedDates.length > 0 && selectedDates[0];
	$: endDate = selectedDates.length > 1 && selectedDates[selectedDates.length - 1];
	// }}}

	// functions {{{
	const getDaysInMonth = (year: number, month: number) => {
		const date = new Date(year, month, 1);
		const days = [];
		while (date.getMonth() === month) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
		return days;
	};

	const generateCalendar = () => {
		const isFirstMonth = currentMonth === 0;
		const isLastMonth = currentMonth === 11;
		const lastMonthDays = getDaysInMonth(
			isFirstMonth ? currentYear - 1 : currentYear,
			isFirstMonth ? 11 : currentMonth - 1
		);
		const nextMonthDays = getDaysInMonth(
			isLastMonth ? currentYear + 1 : currentYear,
			isLastMonth ? 0 : currentMonth + 1
		);
		const daysInMonth = getDaysInMonth(currentYear, currentMonth);
		const monthStartsOnWeekday = daysInMonth[0].getDay() === 0 ? 6 : daysInMonth[0].getDay() - 1;

		days = [
			...lastMonthDays.slice(lastMonthDays.length - monthStartsOnWeekday),
			...daysInMonth,
			...nextMonthDays
		].slice(0, 42);
	};

	const selectDate = (date: Date) => {
		const dates = [...selectedDates];
		const index = selectedDates.findIndex((d) => d.toDateString() === date.toDateString());
		if (index === -1) {
			dates.push(date);
		} else {
			dates.splice(index, 1);
		}

		dates.sort((a, b) => a.getTime() - b.getTime());
		selectedDates = dates;

		return dates;
	};

	const previousMonth = () => {
		currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
		currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
		generateCalendar();
	};

	const nextMonth = () => {
		currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
		currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
		generateCalendar();
	};

	const isCorrectMonth = (day: Date) => {
		return day.getMonth() === currentMonth && day.getFullYear() === currentYear;
	};

	const clickOutside = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target.closest('.overview')) return;

		if (!target.closest('.date-picker')) {
			open = false;
		}
	};
	// }}}

	// lifecycle {{{
	onMount(() => {
		if (typeof document !== 'undefined') {
			document.addEventListener('click', clickOutside);
		}
		generateCalendar();
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('click', clickOutside);
		}
	});
	// }}}
</script>

<div class="container">
	<div
		class="overview"
		role="button"
		on:click={() => (open = !open)}
		on:keypress={() => (open = !open)}
		tabindex="0"
	>
		<span class="date {selectedDates.length > 0 ? 'selected' : ''}">
			{displayYearMonthAndDay(startDate) || 'Start datum'}
		</span>
		<span>{'>'}</span>
		<span class="date {selectedDates.length > 1 ? 'selected' : ''}">
			{displayYearMonthAndDay(endDate) || 'Slut datum'}
		</span>
		<span>{'🗓️'}</span>
	</div>

	{#if open}
		<div class="date-picker">
			<div class="month">
				<button type="button" on:click={previousMonth}>{'<'}</button>
				<span>{displayMonthAndYear(new Date(currentYear, currentMonth))}</span>
				<button type="button" on:click={nextMonth}>{'>'}</button>
			</div>

			<div class="calendar">
				{#each weekdays as weekday}
					<div class="weekday">{weekday}</div>
				{/each}
				{#each days as day}
					<div
						role="checkbox"
						tabindex="0"
						aria-checked={selectedDates.some((d) => d.toDateString() === day.toDateString())}
						aria-label={day.toDateString()}
						on:keypress={() => selectDate(day)}
						class="day {selectedDates.some((d) => d.toDateString() === day.toDateString()) ? 'selected' : ''} {isCorrectMonth(day)
							? ''
							: 'muted'}"
						on:click={() => selectDate(day)}
					>
						{day.getDate()}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		position: relative;
	}
	.overview {
		@include border-radius;
		@include border;
		max-width: 22rem;
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		background: $clr-element-bg;
		color: $clr-text;

		.date {
			cursor: pointer;
			opacity: 0.6;
			&.selected {
				opacity: 1;
			}
		}
	}
	.date-picker {
		@include box;
		max-width: 22rem;
		position: absolute;
		bottom: -26rem;
		background: $clr-text;
		color: $clr-element-bg;
		padding: 1.5rem;
		z-index: 1;
	}
	.calendar {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.75rem;
	}
	.month {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.day {
		display: flex;
		justify-content: center;
		padding: 0.5rem;
		cursor: pointer;

		&.selected {
			background-color: $clr-primary-action;
			color: white;
		}

		&.muted {
			opacity: 0.5;
		}
	}
</style>
