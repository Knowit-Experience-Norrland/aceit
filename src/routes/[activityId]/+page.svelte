<script lang="ts">
import Modal from '$lib/components/modal.svelte';
import type { ActionData, PageServerData } from './$types';
import { getContext } from 'svelte';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
export let data: PageServerData;
export let form: ActionData;

const user = getContext<Writable<App.User>>('user');
const isAdmin = data.activity.admin === $user?.id;
const editMode = writable(false);

let activityName = data.activity.name;
let activityKind = data.activity.kind;
let holes = data.activity.holes.length;
let members = data.activity.members;

let showModal = false;

function toggleEditMode() {
    editMode.update((mode) => !mode);
}

</script>

<h1>Tävlingssida</h1>

    {#if $editMode}
        <form action="" method="POST" >
            <label for="name">Name:</label>
            <input id="name" type="text" name="name" value={form?.name || activityName}>
            
            <!-- <label for="kind">{activityKind}</label>
            <input id="kind" type="checkbox" name="kind" value={activityKind} checked={activityKind}> -->

            <label for="holes">Antal hål:</label>
            <input id="holes" type="number" name="holes" value={form?.holes || holes }>

            {#each data.users as user}
            <label for={user.id}>{user.firstName} {user.lastName}</label>
            <input type="checkbox" name="users" value={user.id} id={user.id} checked={members.some(member => member.id === user.id)} />
        {/each}
            <button type="submit" >Spara</button>
        </form>

        {#if form?.error}
            <p class="error">{form.error}</p>
        {/if}
    {:else}
        <p>{activityName}</p>
        <p>Aktivitet: {activityKind}</p>
        <p>Antal hål: {holes}</p>
        <p>Beskrivning:</p>  
    {/if}


    {#if isAdmin && !$editMode}
		<button on:click={toggleEditMode}>Redigera</button>
	{/if}


<button>Gå med i tävling</button>
<button on:click={() => showModal = true}>Lägg till fler deltagare</button>
<Modal bind:show={showModal}/>
