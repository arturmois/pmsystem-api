# pmsystem-api

🔄 Git Flow – Organização de Branches
Vamos seguir o Git Flow para manter organização e controle de versões.
📌 Fluxo de Branches
• main → versão de produção (sempre estável)
• develop → versão em desenvolvimento (integração das features)
• feature/nome-da-tarefa → para cada nova funcionalidade
• fix/nome-do-bug → para correções
• release/x.x.x → para preparar uma nova entrega
• hotfix/x.x.x → correções rápidas em produção
📦 Comandos Git recomendados
# Criar uma nova feature
git checkout develop
git checkout -b feature/login-tela

# Subir alterações
git add .
git commit -m "feat: tela de login criada"
git push origin feature/login-tela
📚 Tarefa para Todos
Estudar Git Flow antes de começar!
Sugestão: https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow
