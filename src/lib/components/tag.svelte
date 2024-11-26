<script lang="ts">
    export let label: string = '';
    export let status: 'default' | 'completed' = 'default'
</script>


<div class={status}>
    {label}
</div>

<style lang="scss">
    div {
        display: inline-block;
        border-radius: 9px;
        padding: 0.25rem 0.5rem;
        color: $knowit-background;
        @include text-md;
        text-transform: capitalize;

            &.default{
                background-color: $knowit-green;
            }

            &.completed{
                background-color: $knowit-orange;
            }
    }
</style>