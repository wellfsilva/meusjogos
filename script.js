fetch('games.json')
  .then(response => response.json())
  .then(games => {
    const container = document.getElementById('games-container');

    games.forEach(game => {
      const gameDiv = document.createElement('div');
      gameDiv.className = 'game';

      const title = document.createElement('h3');
      title.textContent = game.Name;

      const img = document.createElement('img');
      if (game.CoverImage) {
        img.src = game.CoverImage;
        img.alt = game.Name;
      } else {
        img.src = 'https://via.placeholder.com/160x220?text=Sem+Capa';
        img.alt = 'Capa não disponível';
      }

      gameDiv.appendChild(img);
      gameDiv.appendChild(title);
      container.appendChild(gameDiv);
    });
  })
  .catch(err => {
    console.error('Erro ao carregar o JSON:', err);
  });
