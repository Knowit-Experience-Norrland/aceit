<header></header>

<main>
    <slot/>
</main>

<footer></footer>

<style lang="scss";>;
	@import '$lib/style/mixins.scss';

    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :global(body) {
        font-family: $font-sans-serif;
        @include text-sm;
        //Media Queries
        @media screen and (min-width: $media-sm) {
           // Add styles for small screens and up
           @include text-base;
        }

        @media screen and (min-width: $media-md) {
             // Add styles for medium screens and up
        }
}

</style>