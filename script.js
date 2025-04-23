 async function loadGames() {
      const response = await fetch('games.json');
      const games = await response.json();

      const container = document.getElementById('gamesContainer');
      const platformFilter = document.getElementById('platformFilter');
      const genreFilter = document.getElementById('genreFilter');
      const searchInput = document.getElementById('searchInput');

      const allPlatforms = new Set();
      const allGenres = new Set();

      function renderGames() {
        const search = searchInput.value.toLowerCase();
        const selectedPlatform = platformFilter.value;
        const selectedGenre = genreFilter.value;

        container.innerHTML = '';

        games.forEach(game => {
          const name = game.Name || '';
          const platform = game.Platforms?.[0]?.Name || '';
          const genres = game.Genres?.map(g => g.Name).join(', ') || '';
          const source = game.Source?.Name || '';
          const cover = game.CoverImage || '';

          if (
            (!search || name.toLowerCase().includes(search)) &&
            (!selectedPlatform || platform === selectedPlatform) &&
            (!selectedGenre || genres.includes(selectedGenre))
          ) {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
              <img src="${cover}" alt="${name}" onerror="this.src='placeholder.jpg'">
              <h3>${name}</h3>
              <p><strong>Plataforma:</strong> ${platform}</p>
              <p><strong>Gênero:</strong> ${genres}</p>
              <p><strong>Fonte:</strong> ${source}</p>
            `;
            container.appendChild(card);
          }
        });
      }

      games.forEach(game => {
        if (game.Platforms?.length) {
          allPlatforms.add(game.Platforms[0].Name);
        }
        if (game.Genres?.length) {
          game.Genres.forEach(g => allGenres.add(g.Name));
        }
      });

      allPlatforms.forEach(p => {
        const option = document.createElement('option');
        option.value = p;
        option.textContent = p;
        platformFilter.appendChild(option);
      });

      allGenres.forEach(g => {
        const option = document.createElement('option');
        option.value = g;
        option.textContent = g;
        genreFilter.appendChild(option);
      });

      platformFilter.addEventListener('change', renderGames);
      genreFilter.addEventListener('change', renderGames);
      searchInput.addEventListener('input', renderGames);

      renderGames();
    }

    loadGames();
