<script lang="ts">
import Modal from '$lib/components/modal.svelte';
import Input from '$lib/components/input.svelte';
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
// let description = data.activity.description;
let members = data.activity.members;

let showModal = false;

let selectedUsers = members.map(member => member.id);
let isAllSelected = selectedUsers.length === data.users.length;

function toggleEditMode() {
    editMode.update((mode) => !mode);
}

</script>

<h1>Aktivitetssida</h1>

{#if $editMode}
    <form action="" method="POST" >
        <Input label="Namn på aktivitet" id="name" type="text" name="name" value={form?.name || activityName} />
            
        <!-- <label for="kind">{activityKind}</label>
        <input id="kind" type="checkbox" name="kind" value={activityKind} checked={activityKind}> -->

        <Input label="Antal hål" id="holes" type="number" name="holes" value={form?.holes || holes } />

        <!-- <Input
		label="Beskrivning"
		id="description_input"
		name="description"
		value={form?.description || ''}
        /> -->

        <fieldset>
            <legend>Lägg till deltagare</legend>
            <span>
                <input type="checkbox" id="selected" bind:checked={isAllSelected} on:change={() => {
                    selectedUsers = isAllSelected ? data.users.map(user => user.id) : [data.activity.admin];
                }}/>
                <label for="selected">Välj alla</label>
            </span>
            {#each data.users as user}
                <span>
                    <input type="checkbox" bind:group={selectedUsers} name="users" value={user.id} id={user.id} checked={members.some(member => member.id === user.id)} />
                    <label for={user.id}>{user.firstName} {user.lastName}</label>
                </span>
            {/each}
        </fieldset>
        <button type="submit" >Spara</button>
    </form>

    {#if form?.error}
        <p class="error">{form.error}</p>
    {/if}
    {:else}
        <p>{activityName}</p>
        <p>Aktivitet: {activityKind}</p>
        <p>Antal hål: {holes}</p>
        <!-- <p>Beskrivning: {description}</p>   -->
{/if}


{#if isAdmin && !$editMode}
	<button on:click={toggleEditMode}>Redigera</button>
{/if}


<button>Gå med i tävling</button>
<button on:click={() => showModal = true}>Lägg till fler deltagare</button>
<Modal bind:show={showModal}>

    {#each data.users as user}
    <span>
        <input type="checkbox" name="users" value={user.id} id={user.id} checked={members.some(member => member.id === user.id)} />
        <label for={user.id}>{user.firstName} {user.lastName}</label>
    </span>
{/each}

<button>Lägg till</button>
</Modal>
<style lang="scss">
	h1 {
		@include text-lg;
		margin: $m-lg;
	}

	form {
		display: grid;
		gap: 1rem;
	}

	fieldset {
		display: flex;
		flex-direction: column;
	}

	input {
		padding: 0.5rem;
	}

  button {
    flex: 1;
    min-width: 0;
  }
</style>