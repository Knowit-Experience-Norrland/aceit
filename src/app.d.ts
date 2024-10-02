// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
    interface Claims {
      id: string
    }

    interface User {
      email: string
      firstName: string
      lastName: string
    }
		// interface Error {}
		interface Locals {
      claims?: Claims
    }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
