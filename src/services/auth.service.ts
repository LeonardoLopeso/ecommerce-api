import { FirebaseError } from "firebase/app";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { User } from "../models/use.model";
import { FirebaseAuthError, getAuth, UserRecord } from "firebase-admin/auth";
import { getAuth as getFirebaseAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

export class AuthService {

  async create(user: User): Promise<UserRecord> {
    return getAuth().createUser({
      email: user.email,
      password: user.password,
      displayName: user.name,
    }).catch(err => {
      if (err instanceof FirebaseAuthError &&err.code === "auth/email-already-exists") {
        throw new EmailAlreadyExistsError();
      }
      throw err;
    })
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
    .catch(err => {
      if (err instanceof FirebaseError && err.code === "auth/invalid-credential") {
        throw new UnauthorizedError();
      }
      throw err;
    })
  }
}