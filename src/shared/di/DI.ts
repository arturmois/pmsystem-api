export class Registry {
  private dependencies: Map<string, any>;

  private static instance: Registry;

  private constructor() {
    this.dependencies = new Map();
  }

  public static getInstance(): Registry {
    if (!Registry.instance) {
      Registry.instance = new Registry();
    }
    return Registry.instance;
  }

  public provide(serviceName: string, service: any) {
    this.dependencies.set(serviceName, service);
  }

  public get(serviceName: string) {
    return this.dependencies.get(serviceName);
  }
}

export function inject(serviceName: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return Registry.getInstance().get(serviceName);
      },
      enumerable: true,
      configurable: true
    });
  };
}