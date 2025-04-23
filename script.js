 const games = []; // Essa variável será preenchida com os dados JSON

    const searchInput = document.getElementById('searchInput');
    const platformFilter = document.getElementById('platformFilter');
    const genreFilter = document.getElementById('genreFilter');
    const sourceFilter = document.getElementById('sourceFilter');
    const gamesContainer = document.getElementById('gamesContainer');

    function renderFilters(games) {
      const platforms = new Set();
      const genres = new Set();
      const sources = new Set();

      games.forEach(game => {
        game.Platforms?.forEach(p => platforms.add(p.Name));
        game.Genres?.forEach(g => genres.add(g.Name));
        if (game.Source?.Name) sources.add(game.Source.Name);
      });

      platforms.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        platformFilter.appendChild(opt);
      });

      genres.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g;
        opt.textContent = g;
        genreFilter.appendChild(opt);
      });

      sources.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        sourceFilter.appendChild(opt);
      });
    }

    function renderGames() {
      const searchTerm = searchInput.value.toLowerCase();
      const platformTerm = platformFilter.value;
      const genreTerm = genreFilter.value;
      const sourceTerm = sourceFilter.value;

      gamesContainer.innerHTML = '';

      games
        .filter(game => game.Name.toLowerCase().includes(searchTerm))
        .filter(game => !platformTerm || (game.Platforms && game.Platforms.some(p => p.Name === platformTerm)))
        .filter(game => !genreTerm || (game.Genres && game.Genres.some(g => g.Name === genreTerm)))
        .filter(game => !sourceTerm || (game.Source && game.Source.Name === sourceTerm))
        .forEach(game => {
          const gameDiv = document.createElement('div');
          gameDiv.className = 'game';
          const img = document.createElement('img');
          img.src = `./images/${game.CoverImage?.split('\\').pop() || 'placeholder.jpg'}`;
          img.alt = game.Name;
          const info = document.createElement('div');
          info.innerHTML = `
            <div class="game-title">${game.Name}</div>
            <div class="game-meta">
              ${game.Platforms?.map(p => p.Name).join(', ') || 'Plataforma desconhecida'}<br>
              ${game.Genres?.map(g => g.Name).join(', ') || 'Gênero desconhecido'}<br>
              Fonte: ${game.Source?.Name || 'Desconhecida'}
            </div>
          `;
          gameDiv.appendChild(img);
          gameDiv.appendChild(info);
          gamesContainer.appendChild(gameDiv);
        });
    }

    searchInput.addEventListener('input', renderGames);
    platformFilter.addEventListener('change', renderGames);
    genreFilter.addEventListener('change', renderGames);
    sourceFilter.addEventListener('change', renderGames);

    fetch('games.json')
      .then(res => res.json())
      .then(data => {
        games.push(...data);
        renderFilters(games);
        renderGames();
      });
