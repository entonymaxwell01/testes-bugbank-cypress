# Automação de Testes Web — BugBank

![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-169b62?style=for-the-badge&logo=cucumber&logoColor=white)
[![Allure](https://img.shields.io/badge/Allure_Report-FF6347?style=for-the-badge&logoColor=white)](https://entonymaxwell01.github.io/testes-bugbank-cypress/)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

Projeto de automação de testes E2E da aplicação web [BugBank](https://bugbank.netlify.app/), desenvolvido utilizando Cypress, TypeScript e BDD com Cucumber.

O projeto tem como objetivo aplicar boas práticas de engenharia de testes, contemplando cenários positivos e negativos, geração dinâmica de massa de dados, arquitetura Page Object Model e integração contínua.

## Tecnologias e ferramentas

| Tecnologia      | Aplicação                            |
| --------------- | ------------------------------------ |
| Cypress         | Automação de testes E2E              |
| TypeScript      | Desenvolvimento com tipagem estática |
| Cucumber        | Integração dos cenários BDD          |
| Gherkin         | Especificação de comportamentos      |
| Faker.js        | Geração dinâmica de dados            |
| Allure Report 3 | Relatórios e evidências              |
| ESLint          | Análise estática de código           |
| Prettier        | Padronização de código               |
| GitHub Actions  | Integração contínua                  |

## Escopo dos testes

Atualmente, a suíte contempla a funcionalidade de cadastro de contas bancárias.

| Cenário                           | Classificação |
| --------------------------------- | ------------- |
| Cadastro com saldo inicial        | Positivo      |
| Cadastro sem saldo inicial        | Positivo      |
| Cadastro sem e-mail               | Negativo      |
| Cadastro sem nome                 | Negativo      |
| Cadastro sem senha                | Negativo      |
| Cadastro sem confirmação de senha | Negativo      |
| Cadastro com senhas divergentes   | Negativo      |
| Login com credenciais válidas     | Positivo      |
| Login sem e-mail                  | Negativo      |
| Login sem senha                   | Negativo      |
| Login com e-mail não cadastrado   | Negativo      |
| Login com senha incorreta         | Negativo      |

## Arquitetura do projeto

```text
cypress/
├── elements/
│   ├── cadastro.elements.ts
│   ├── common.elements.ts
│   ├── login.elements.ts
│   └── index.ts
├── factories/
│   └── usuario.factory.ts
├── features/
│   ├── cadastro.feature
│   └── login.feature
├── helpers/
│   ├── usuario.helpers.ts
│   └── index.ts
├── pages/
│   ├── cadastro.page.ts
│   ├── common.page.ts
│   ├── login.page.ts
│   └── index.ts
├── steps/
│   ├── cadastro.steps.ts
│   └── login.steps.ts
├── support/
│   ├── commands.ts
│   └── e2e.ts
└── types/
    └── usuario.types.ts
```

### Organização das responsabilidades

- **features:** especificações dos comportamentos em Gherkin.
- **steps:** implementação dos passos definidos nas features.
- **pages:** ações e validações relacionadas à interface.
- **elements:** centralização dos seletores.
- **factories:** geração dinâmica de massa de dados.
- **types:** contratos e tipos TypeScript.
- **support:** configurações e comandos globais.
- **helpers:** preparação de dados e reutilização de fluxos auxiliares.

## Práticas de automação

- Behavior-Driven Development (BDD).
- Page Object Model (POM).
- Data-Driven Testing com Scenario Outline.
- Test Data Factory.
- Barrel Files para centralização de exportações.
- Reutilização de métodos comuns.
- Isolamento dos cenários de teste.
- Seleção de testes por tags.
- Integração contínua.

## Configuração do ambiente

### Pré-requisitos

- Node.js 24.
- npm.
- Google Chrome para execução nesse navegador.

### Instalação

```bash
git clone https://github.com/entonymaxwell01/testes-bugbank-cypress.git

cd testes-bugbank-cypress

npm ci
```

## Executando os testes

| Comando                | Descrição                    |
| ---------------------- | ---------------------------- |
| `npm test`             | Executar toda a suíte        |
| `npm run test:open`    | Abrir a interface do Cypress |
| `npm run test:chrome`  | Executar testes no Chrome    |
| `npm run test:smoke`   | Executar testes smoke        |
| `npm run typecheck`    | Validar tipagem TypeScript   |
| `npm run lint`         | Executar análise estática    |
| `npm run lint:fix`     | Corrigir problemas de lint   |
| `npm run format`       | Formatar o código            |
| `npm run format:check` | Verificar formatação         |

## Relatórios de testes

O projeto utiliza Allure Report 3 para visualização dos resultados, análise das execuções e evidências dos testes automatizados.

**[Acessar relatório de testes — Allure Report](https://entonymaxwell01.github.io/testes-bugbank-cypress/)**

O relatório é atualizado automaticamente pela pipeline do GitHub Actions a cada execução da branch `main`.

### Execução local

```bash
npm run allure:clean
npm test
npm run allure:generate
npm run allure:open
```

## Integração contínua

A pipeline do GitHub Actions é acionada em:

- Push na branch `main`.
- Pull Requests direcionados à `main`.
- Execuções manuais.

A pipeline contempla instalação reproduzível de dependências, validação de código, execução automatizada dos testes, geração de relatórios e disponibilização de evidências.

Os relatórios das execuções da branch principal são publicados no GitHub Pages.

## Roadmap

- [x] Migração para TypeScript.
- [x] Implementação de BDD com Cucumber.
- [x] Refatoração da arquitetura POM.
- [x] Automação dos cenários de cadastro.
- [x] Automação dos cenários de login.
- [ ] Automação dos cenários de transferência.
- [ ] Automação dos cenários de saldo e extrato.
- [ ] Automação dos cenários de logout.

## Autor

**Entony Maxwell**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/entony-maxwell/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/entonymaxwell01)
[![Portfólio](https://img.shields.io/badge/Portfólio-6366F1?style=for-the-badge&logo=googlechrome&logoColor=white)](https://entonymaxwell01.github.io/)
