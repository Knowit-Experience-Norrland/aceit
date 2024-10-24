import { ObjectId } from 'mongoose';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {

  type UserMetaKind = 'golf';
  type ActivityKind = 'golf';

  interface GlobalUser {
    email: string
    firstName: string
    lastName: string
  }

  interface UserMeta {
    kind: UserMetaKind
    id: string
    name: string
  }

  interface Activity {
    kind: ActivityKind
    name: string;
    active: boolean
    start?: Date
    end?: Date
    admin: string
    members: UserMeta[]
  }

  interface GolfHole {
    hole: number
    par: number
  }

  interface GolfUserMeta extends UserMeta {
    kind: "golf",
    handicap: number
    score: GolfStroke[]
  }

  interface GolfStroke {
    hole: number
    strokes: number
  }

  interface GlobalGolfActivity extends Activity {
    kind: "golf"
    members: GolfUserMeta[]
    holes: GolfHole[]
  }

  namespace Database {
    interface Entity {
      _id?: ObjectId
    }

    interface User extends GlobalUser, Entity {
      password: string
    }

    interface GolfActivity extends GlobalGolfActivity, Entity { }
  }

  namespace App {
    interface Entity {
      id: string
    }

    interface Claims extends Entity { }
    interface User extends GlobalUser, Entity { }
    interface GolfActivity extends GlobalGolfActivity, Entity { }

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
