import { ObjectId } from 'mongoose';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {

  interface GlobalUser {
    email: string
    firstName: string
    lastName: string
  }

  interface UserMeta {
    id: string
    name: string
  }

  interface Competition {
    name: string;
    active: boolean
    admin: string
  }

  interface GolfHole {
    hole: number
    par: number
  }

  interface GolfUserMeta extends UserMeta {
    handicap: number
  }

  interface GolfStrokes {
    user: string
    hole: number
    strokes: number
  }

  interface GlobalGolfCompetition extends Competition {
    players: GolfUserMeta[]
    holes: GolfHole[]
    strokes: GolfStrokes[]
  }

  namespace Database {
    interface Entity {
      _id?: ObjectId
    }

    interface User extends GlobalUser, Entity {
      password: string
    }

    interface GolfCompetition extends GlobalGolfCompetition, Entity { }
  }

  namespace App {
    interface Entity {
      id: string
    }

    interface Claims extends Entity { }
    interface User extends GlobalUser, Entity { }
    interface GolfCompetition extends GlobalGolfCompetition, Entity { }

    // interface Error {}
    interface Locals {
      claims?: Claims
      loggedIn?: boolean
      user?: User
      users?: User[]
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
