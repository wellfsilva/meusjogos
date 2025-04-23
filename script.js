    let allGames = [];

    fetch('games.json')
      .then(r => r.json())
      .then(games => {
        allGames = games;
        popularFiltros(games);
        renderizar(games);
      });

    function renderizar(games) {
      const container = document.getElementById('games-container');
      container.innerHTML = '';
      games.forEach(game => {
        const div = document.createElement('div');
        div.className = 'game';
        div.innerHTML = `
          <img src="${game.CoverImage}" alt="${game.Name}" />
          <h3>${game.Name}</h3>
          <p><strong>Plataforma:</strong> ${game.Platforms || 'N/A'}</p>
          <p><strong>Gênero:</strong> ${game.Genres || 'N/A'}</p>
        `;
        container.appendChild(div);
      });
    }

    function popularFiltros(games) {
      const plataformas = [...new Set(games.map(g => g.Platforms).filter(Boolean))];
      const generos = [...new Set(games.map(g => g.Genres).filter(Boolean))];

      const plataformaSelect = document.getElementById('plataformaSelect');
      const generoSelect = document.getElementById('generoSelect');

      plataformas.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        plataformaSelect.appendChild(opt);
      });

      generos.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g;
        opt.textContent = g;
        generoSelect.appendChild(opt);
      });
    }

    document.getElementById('searchInput').addEventListener('input', filtrar);
    document.getElementById('plataformaSelect').addEventListener('change', filtrar);
    document.getElementById('generoSelect').addEventListener('change', filtrar);

    function filtrar() {
      const busca = document.getElementById('searchInput').value.toLowerCase();
      const plataforma = document.getElementById('plataformaSelect').value;
      const genero = document.getElementById('generoSelect').value;

      const filtrados = allGames.filter(g => {
        const matchNome = g.Name.toLowerCase().includes(busca);
        const matchPlataforma = !plataforma || g.Platforms === plataforma;
        const matchGenero = !genero || g.Genres === genero;
        return matchNome && matchPlataforma && matchGenero;
      });

      renderizar(filtrados);
    }
