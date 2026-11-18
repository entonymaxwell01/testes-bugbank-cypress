# Automação de Testes Web — BugBank

![Cypress](https://img.shields.io/badge/Cypress-14.4.1-17202C?logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)

Projeto pessoal de automação de testes da aplicação web [BugBank](https://bugbank.netlify.app/), desenvolvido utilizando Cypress e JavaScript.

O objetivo é aplicar boas práticas de automação de testes funcionais, estruturando cenários automatizados para validação do fluxo de cadastro de usuários e suas principais regras de negócio.

O projeto também contempla integração contínua com GitHub Actions e geração de relatórios automatizados utilizando Mochawesome e Allure Report.

## Tecnologias e ferramentas

| Tecnologia              | Aplicação                                                 |
| ----------------------- | --------------------------------------------------------- |
| Cypress 14              | Automação de testes de interface (UI)                     |
| JavaScript              | Desenvolvimento dos scripts de automação                  |
| Page Object Model (POM) | Organização e reutilização das interações com a aplicação |
| Faker.js                | Geração dinâmica de dados de teste                        |
| Cypress Grep            | Organização e seleção de cenários por tags                |
| Mochawesome             | Geração de relatórios de execução                         |
| Allure Report           | Visualização e análise dos resultados                     |
| GitHub Actions          | Integração contínua e execução automatizada               |

## Escopo dos testes

Atualmente, a automação contempla a funcionalidade de cadastro de usuários da aplicação BugBank.

### Cenários automatizados

| Cenário                           | Descrição                                           |
| --------------------------------- | --------------------------------------------------- |
| Cadastro com sucesso              | Validação do fluxo de criação de uma nova conta     |
| Cadastro sem e-mail               | Validação de campo obrigatório                      |
| Cadastro sem nome                 | Validação de campo obrigatório                      |
| Cadastro sem senha                | Validação de campo obrigatório                      |
| Cadastro sem confirmação de senha | Validação de campo obrigatório                      |
| Senhas divergentes                | Validação da consistência entre senha e confirmação |

**Observação:** o cenário de cadastro com e-mail previamente cadastrado também está implementado, mas atualmente permanece desabilitado (`it.skip`) e não faz parte da execução da suíte.

## Arquitetura do projeto

A automação utiliza uma organização baseada no padrão Page Object Model (POM), separando os cenários de teste, interações com a página, seletores e dados utilizados durante as execuções.

```text
cypress/
│
├── e2e/
│   └── cadastro/
│       └── cadastro.cy.js
│
├── elements/
│   ├── CadastroPage.elements.js
│   └── Notificacao.elements.js
│
├── fixtures/
│   └── usuario.json
│
├── pages/
│   └── CadastroPage.js
│
└── support/
    ├── commands.js
    └── e2e.js
```

### Organização das responsabilidades

- **e2e:** contém os cenários de teste automatizados.
- **pages:** concentra as ações e validações relacionadas às páginas da aplicação.
- **elements:** centraliza os seletores utilizados nas interações com os elementos da interface.
- **fixtures:** armazena dados de teste utilizados nos cenários.
- **support:** configurações globais, registro de plugins e comandos personalizados do Cypress.

O projeto também utiliza comandos personalizados para reutilização de fluxos de interação com a aplicação.

## Configuração do ambiente

### Pré-requisitos

- Node.js em versão compatível com Cypress 14.
- npm.
- Google Chrome instalado para a execução pelo comando padrão.
- Allure Commandline para geração e visualização local dos relatórios Allure.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/entonymaxwell01/testes-bugbank-cypress.git
```

Acesse o diretório:

```bash
cd testes-bugbank-cypress
```

Instale as dependências:

```bash
npm install
```

## Executando os testes

### Execução pelo terminal

Para executar os testes automatizados utilizando Google Chrome:

```bash
npm test
```

### Execução pela interface do Cypress

Para abrir o Test Runner:

```bash
npx cypress open
```

### Execução com Allure

Para executar os testes e gerar os resultados utilizados pelo Allure:

```bash
npm run allure:run
```

Para gerar o relatório:

```bash
npm run allure:report
```

Para visualizar o relatório:

```bash
npm run allure:open
```

O projeto também disponibiliza um comando para executar todas as etapas localmente:

```bash
npm run allure:test
```

Esse comando realiza a limpeza dos resultados anteriores, executa os testes, gera o relatório e abre sua visualização.

## Relatórios de testes

O projeto utiliza duas ferramentas para apresentação dos resultados:

### Mochawesome

Configurado como reporter do Cypress, permite gerar relatórios das execuções com:

- Resultados dos testes.
- Gráficos de execução.
- Capturas de tela incorporadas aos relatórios.

### Allure Report

Utilizado para apresentar os resultados das execuções de forma estruturada, permitindo:

- Visualização dos cenários executados.
- Detalhamento das etapas dos testes.
- Identificação de testes aprovados e reprovados.
- Histórico de execuções disponibilizado pelo pipeline.

## Integração contínua (CI/CD)

O projeto utiliza GitHub Actions para automatizar a execução dos testes e a publicação dos relatórios.

O workflow é acionado nos seguintes eventos:

- Push na branch `main`.
- Pull Requests direcionados à branch `main`.
- Execução manual pelo GitHub Actions.

### Etapas do pipeline

1. Checkout do repositório.
2. Configuração do ambiente Node.js.
3. Instalação das dependências.
4. Execução dos testes automatizados com Cypress.
5. Recuperação do histórico dos relatórios anteriores.
6. Geração do relatório Allure.
7. Publicação dos relatórios na branch `gh-pages`.

Os relatórios publicados podem ser acessados pelo GitHub Pages, conforme a configuração de publicação do repositório.

## Objetivos de aprendizado

Este projeto faz parte do meu portfólio de Quality Assurance e busca aprofundar conhecimentos em:

- Automação de testes funcionais de interface.
- Aplicação do padrão Page Object Model (POM).
- Organização e reutilização de componentes de automação.
- Geração e análise de relatórios de testes.
- Integração contínua de testes automatizados.
- Aplicação de boas práticas de qualidade de software.

## Autor

**Entony Maxwell**

- [LinkedIn](https://www.linkedin.com/in/entony-maxwell/)
- [GitHub](https://github.com/entonymaxwell01)
