export async function askAI(question) {

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },

        body: JSON.stringify({

          model: "openrouter/auto",

          messages: [
            {
              role: "user",
              content: question,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    return (
      data?.choices?.[0]?.message?.content ||
      "Sem resposta da IA 🤖"
    );

  } catch (error) {

    console.log(error);

    return "Erro ao conectar à Zola IA 🤖";
  }
}