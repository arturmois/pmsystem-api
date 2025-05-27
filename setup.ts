const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const vscodeDir = path.join(__dirname, '.vscode');
const settingsPath = path.join(vscodeDir, 'settings.json');

// Cria a pasta .vscode se não existir
if (!fs.existsSync(vscodeDir)) {
    fs.mkdirSync(vscodeDir);

    // Conteúdo do settings.json
    const settings = {
        "editor.codeActionsOnSave": {
            "source.fixAll": true,
            "source.fixAll.eslint": true
        },
        "editor.formatOnSave": true,
        "eslint.validate": ["javascript", "javascriptreact", "typescript"],
        "eslint.alwaysShowStatus": true
    };

    // Escreve o arquivo settings.json formatado
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

execSync('npm i');
execSync('npx prisma generate')

console.log('sucesso!');