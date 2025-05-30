import fs from 'fs';
import path from 'path';
import { Router } from 'express';

type HTTPMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export default class Routes {
    private router: Router;
    private routerPath = path.resolve(__dirname, '');
    private prefix = 'api';

    constructor() {
        this.router = Router();
    }

    getRoutes(): Router {
        fs.readdirSync(this.routerPath).forEach((file) => {
            const ext = path.extname(file);
            if (ext === '.ts' && file !== 'index.ts') {
                const serviceModule = require(path.join(this.routerPath, file));
                const RouteClass = serviceModule.default || serviceModule;
                const routeInstance = new RouteClass();

                const route = path.basename(file, ext);
                const name = route.replace(/Router$/, '');



                const routes = routeInstance.getRoutes?.();
                if (!routes) return;

                (routes as [HTTPMethod, string, ...Array<any>][]).forEach((route) => {
                    const method = route[0];
                    const fullPath = `/${this.prefix}/${name}${route[1]}`;
                    const handlers = route.slice(2);

                    console.log(method, `/${this.prefix}/${name}${route[1]}`, handlers);


                    if (typeof (this.router as any)[method] === 'function') {
                        (this.router as any)[method](fullPath, ...handlers);
                    } else {
                        console.warn(`Método HTTP inválido: ${method}`);
                    }
                });
            }
        });

        return this.router;
    }
}
