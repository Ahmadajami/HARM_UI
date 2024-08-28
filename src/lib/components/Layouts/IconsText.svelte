<script lang="ts">
	export let text: string;
	export let prefix: string = '';
	export let points: boolean = true;
</script>

<div class="flex">
	<span class=" px-1">{prefix}</span>
	<span><slot /> </span>
	<span class="font-normal"> {points ? ':' : ''} {text}</span>
</div>
