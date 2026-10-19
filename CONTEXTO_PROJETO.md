# Contexto do projeto Bico Já

Este documento reúne regras fundamentais do produto e do desenvolvimento. Consulte-o antes de implementar ou alterar funcionalidades, conteúdo, interface ou fluxo de branches.

## Produto

Bico Já conecta profissionais operacionais da construção civil a contratantes, facilitando a descoberta de oportunidades e de mão de obra na região.

## Identidade visual e interação

- Use a paleta do projeto: laranja como cor de destaque, branco para superfícies e cinzento para fundos e textos secundários.
- Preserve contraste, legibilidade, acessibilidade e uma apresentação limpa e consistente entre telas.
- Não inclua áudio na interface: sem botões de voz, reprodução, gravação ou indicações de áudio.
- Mantenha a navegação textual e visual, com ações claramente identificadas.

## Modelo de orçamento

- O preço do serviço é definido após visita técnica ao local e elaboração de orçamento presencial.
- Não apresente nem invente valores fixos, preços estimados ou pagamento por diária em telas, cartões, descrições, mocks ou dados da API.
- Use linguagem coerente, como: “O preço será definido pelo profissional após visita e orçamento no local.”
- A seção “O que está incluído” deve conter somente benefícios reais fornecidos para a vaga, por exemplo, “Almoço no local”.
- Não coloque porte da obra nessa seção. Se o porte fizer parte dos requisitos de uma funcionalidade futura, deve ser apresentado em campo ou seção próprios.
- Ferramentas e materiais pertencem à seção específica de ferramentas e materiais; não duplique esses itens em benefícios.

## Git Flow

- `main` contém a linha estável de produção.
- `develop` é a branch de integração para o próximo ciclo de desenvolvimento.
- Crie branches de funcionalidade e correção a partir de `develop` e integre-as de volta em `develop` por pull request.
- Use branches `release/*` para preparar releases; após validação, integre a release em `main` e sincronize o resultado de volta em `develop`.
- Crie branches `hotfix/*` a partir de `main` para correções urgentes; após validação, integre-as em `main` e em `develop`.
- Evite commits diretos em `main` e `develop`; preserve mudanças existentes ao trocar de branch ou integrar trabalho.
