import { DynamicEnvironment } from './environment.dynamic';

class Environment extends DynamicEnvironment {

  production: boolean;

  constructor() {
    super();
    this.production = true;
  }
}

export const environment = new Environment();
