module.exports.formatMessageEmail = (data) => {
  return `
  <html>
  <head>
  </head>
  <body style="font-size: 18px;color: #353535;font-family: monospace;display: flex;align-items: center;justify-content: center;flex-direction: column;">
    <div>
      <h2>Temos novidades essa semana no blog das receitinhas 🥘</h2>

      <p>${data.introduction}</p>

      <ul style="list-style:none;display: flex;flex-flow: wrap;">
        ${data.recipes
          .map((item) => {
            return `
          <li style="margin:10px;padding: 8px;width: max-content;background: #F8B400;height: max-content;border-radius: 4px;box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);">
          <p>Nome da receita: ${item.name}</p>
          <p>Tempo da receita: ${item.time}</p>
          <p>Quantidade de ingredientes: ${item.ingredients}</p>
          </li>
          `;
          })
          .join("")}
      </ul>
      <footer> <p>Obrigado por nos acompanhar durante a semana e semana que vem tem mais =)</p> </footer>
    </div>
  </body>
</html>
`;
};
