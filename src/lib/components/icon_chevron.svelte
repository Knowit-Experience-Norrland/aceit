<script lang="ts">
	export let width: string = '32';
	export let height: string = '32';
	export let fill: string = 'currentColor';
	export let iconClass: string = '';
	export let direction: 'left' | 'right' = 'right';
	
	const rightArrowPath = "M18.2231 16L12.0897 9.86667L13.0334 8.923L20.1104 16L13.0334 23.077L12.0897 22.1333L18.2231 16Z";
	const leftArrowPath = "M13.2231 16L19.0897 22.1333L18.0334 23.077L11.1104 16L18.0334 8.923L19.0897 9.86667L13.2231 16Z";

</script>

<svg
	width={width}
	height={height}
	viewBox="0 0 32 32" 
	xmlns="http://www.w3.org/2000/svg"
	fill={fill}
	class={iconClass}
	aria-label="icon"
>
	<path d={direction === 'left' ? leftArrowPath : rightArrowPath} />
</svg>

