const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: "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",
});

export async function getDataFromGPT(acronym: string) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Qual o significado da sigla ${acronym}? Liste os 5 resultados mais relevantes. Sua resposta deve ser no formato JSON. Cada item da lista deve conter as seguintes informações: id único não sequencial, significado e área de interesse.`,
        },
        {
          role: "assistant",
          content:
            'Aqui está a lista de resultados relevantes para a sigla `TI` em formato JSON:\n\n```\n[\n  {\n    "id": 1,\n    "significado": "Tecnologia da Informação",\n    "area_interesse": "Informática"\n  },\n  {\n    "id": 2,\n    "significado": "Título de Investidor",\n    "area_interesse": "Financeiro"\n  },\n  {\n    "id": 3,\n    "significado": "Técnicos de Internalismo",\n    "area_interesse": "Filosofia"\n  },\n  {\n    "id": 4,\n    "significado": "Tropicalia-Instrumento",\n    "area_interesse": "Música"\n  },\n  {\n    "id": 5,\n    "significado": "Time Integral",\n    "area_interesse": "Matemática"\n  }\n]\n```',
        },
        {
          role: "user",
          content:
            "mostre apenas o JSON com a mesma estrutura da resposta anterior",
        },
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 1,
      stop: null,
    });
    const [response] = chatCompletion.choices;

    return response?.message?.content;
  } catch (error) {
    console.log(error);
  }
}
