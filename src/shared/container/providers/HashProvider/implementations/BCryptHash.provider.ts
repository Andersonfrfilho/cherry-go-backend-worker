import { hash, compare } from "bcryptjs";

import { HashProviderInterface } from "@shared/container/providers/HashProvider/Hash.provider.interface";

export class BCryptHashProvider implements HashProviderInterface {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
