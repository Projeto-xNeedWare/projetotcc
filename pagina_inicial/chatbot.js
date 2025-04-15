const chatIcon = document.getElementById("chat-trigger");
    const chat = document.getElementById("chat");
    const chatMessages = document.getElementById("chat-messages");
    const input = document.getElementById("user-input");
    const button = document.getElementById("send-button");

    const API_KEY = "sua_api_key_aqui"; // 👈 COLE SUA API KEY AQUI

    chatIcon.addEventListener("click", () => {
      chatIcon.style.display = "none";
      chat.style.display = "flex";
    });

    document.addEventListener("click", (e) => {
      if (!chat.contains(e.target) && !chatIcon.contains(e.target)) {
        chat.style.display = "none";
        chatIcon.style.display = "block";
      }
    });

    async function sendToGPT(userMessage) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userMessage }],
          max_tokens: 100
        })
      });

      const data = await response.json();
      return data.choices[0].message.content.trim();
    }

    async function sendMessage() {
      const userMsg = input.value.trim();
      if (!userMsg) return;

      chatMessages.innerHTML += `<p><strong>Você:</strong> ${userMsg}</p>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
      input.value = "";

      chatMessages.innerHTML += `<p><strong>Bot:</strong> digitando...</p>`;

      try {
        const botMsg = await sendToGPT(userMsg);
        chatMessages.lastElementChild.remove(); // remove "digitando..."
        chatMessages.innerHTML += `<p><strong>Bot:</strong> ${botMsg}</p>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      } catch (error) {
        chatMessages.innerHTML += `<p><strong>Bot:</strong> Ocorreu um erro. 😢</p>`;
      }
    }

    button.addEventListener("click", sendMessage);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });