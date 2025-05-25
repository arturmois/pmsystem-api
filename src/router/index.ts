import fs from 'fs';
import path from 'path';

const routerPath = path.resolve(__dirname, '');

interface ServiceMap {
    [key: string]: any;
}

const services: ServiceMap = {};

fs.readdirSync(routerPath).forEach((file) => {
    const ext = path.extname(file);
    if (ext === '.ts') {
        const name = path.basename(file, ext);
        const serviceModule = require(path.join(routerPath, file));

        services[name] = serviceModule.default || serviceModule;
    }
});

export default services;