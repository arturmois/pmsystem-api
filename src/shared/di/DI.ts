export class Registry {
  private dependencies: { [name: string]: any };
  private static instance: Registry;

  private constructor() {
    this.dependencies = {};
  }

  provide(name: string, dependency: any) {
    this.dependencies[name] = dependency;
  }

  inject(name: string) {
    const dependency = this.dependencies[name];
    return dependency;
  }

  static getInstance() {
    if (!Registry.instance) {
      Registry.instance = new Registry();
    }
    return Registry.instance;
  }
}

// decorator
export function inject(name: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get() {
        const dependency = Registry.getInstance().inject(name);
        if (!dependency) {
          throw new Error(`Dependency ${name} not found for ${propertyKey}`);
        }
        return dependency;
      },
      enumerable: true,
      configurable: true
    });
  }
}