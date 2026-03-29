const fs = require('fs');

// Dados para editais
const editals = [
    {
        id: 1,
        title: "Programa de Apoio a Mulheres Empreendedoras 2026",
        organization: "BNDES",
        description: "Financiamento de até R$ 300 mil para microempreendedoras",
        amount: 300000,
        targetTypes: ['tech', 'fashion', 'food', 'beauty', 'consulting'],
        minRevenue: 0,
        maxRevenue: 1000000,
        deadline: "2026-06-30",
        status: "open",
        requirements: "Empresa formalizada, mulher proprietária"
    },
    {
        id: 2,
        title: "Edital de Inovação Feminina",
        organization: "FINEP",
        description: "Apoio a projetos inovadores liderados por mulheres",
        amount: 500000,
        targetTypes: ['tech'],
        minRevenue: 0,
        maxRevenue: 5000000,
        deadline: "2026-05-15",
        status: "closing",
        requirements: "Projeto com inovação significativa"
    },
    {
        id: 3,
        title: "StartUp Brasil Feminino",
        organization: "SEBRAE",
        description: "Mentoría e recursos para startups de mulheres",
        amount: 100000,
        targetTypes: ['tech', 'consulting'],
        minRevenue: 0,
        maxRevenue: 500000,
        deadline: "2026-07-20",
        status: "open",
        requirements: "Startup em estágio pré-seed ou seed"
    }
];

// Dados para cursos
const courses = [
    {
        id: 1,
        title: "Gestão Financeira para Pequenos Negócios",
        instructor: "Dra. Carolina Silva",
        description: "Aprenda a gerenciar finanças e fluxo de caixa",
        level: "beginner",
        category: "finance",
        duration: "4 semanas",
        price: 0,
        students: 2500,
        rating: 4.8,
        icon: "💰",
        tags: ["Financeiro", "Gestão"],
        modules: 12
    },
    {
        id: 2,
        title: "Marketing Digital para Empreendedoras",
        instructor: "Ana Paula Santos",
        description: "Estratégias de marketing digital e redes sociais",
        level: "intermediate",
        category: "marketing",
        duration: "6 semanas",
        price: 199,
        students: 3200,
        rating: 4.9,
        icon: "📱",
        tags: ["Marketing", "Digital"],
        modules: 18
    }
];

// Dados para mentorias
const mentors = [
    {
        id: 1,
        name: "Sandra Costa",
        expertise: "Tecnologia e Inovação",
        background: "20 anos em startups tech, CEO em 3 empresas",
        availability: "Disponível",
        specialty: "tech"
    },
    {
        id: 2,
        name: "Patricia Oliveira",
        expertise: "Marketing e Vendas",
        background: "Fundadora de agência digital, 500+ clientes atendidos",
        availability: "Disponível",
        specialty: "marketing"
    },
    {
        id: 3,
        name: "Juliana Silva",
        expertise: "Finanças e Crescimento",
        background: "CFO em empresas Fortune 500, MBA Stanford",
        availability: "Disponível",
        specialty: "finance"
    }
];

// Escrever arquivos
const filesToCreate = [
    { name: './editals.json', data: editals },
    { name: './courses.json', data: courses },
    { name: './mentors.json', data: mentors }
];

filesToCreate.forEach(file => {
    fs.writeFileSync(file.name, JSON.stringify(file.data, null, 2));
    console.log(`✅ Arquivo ${file.name} criado com sucesso!`);
});

console.log('🎉 Dados inicializados com sucesso!');
