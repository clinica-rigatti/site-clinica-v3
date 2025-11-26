(() => {
  const BLOG_POSTS_JSON_URL = 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/scripts/posts.json';

  async function loadBlogPosts() {
    try {
      const response = await fetch(BLOG_POSTS_JSON_URL);

      if (!response.ok) {
        throw new Error(`Erro ao buscar posts do blog: ${response.status}`);
      }

      const data = await response.json();
      console.log('Posts do blog carregados:', data);

      // O JSON retorna um array diretamente ou um objeto com array
      const posts = Array.isArray(data) ? data : (data.posts || []);

      if (!posts || posts.length === 0) {
        console.warn('Nenhum post encontrado no JSON');
        return;
      }

      const blogPostsGrid = document.getElementById('blogPostsGrid');

      if (!blogPostsGrid) {
        console.error('Grid de posts do blog não encontrado');
        return;
      }

      // Limpa o grid
      blogPostsGrid.innerHTML = '';

      // Pega os 4 primeiros posts
      const latestPosts = posts.slice(0, 4);

      latestPosts.forEach((post) => {
        const card = createBlogPostCard(post);
        blogPostsGrid.appendChild(card);
      });

      console.log(`${latestPosts.length} posts do blog carregados com sucesso`);

    } catch (error) {
      console.error('Erro ao carregar posts do blog:', error);
    }
  }

  function createBlogPostCard(post) {
    const card = document.createElement('a');
    card.href = post.link;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'block relative overflow-hidden group w-full h-[180px] max-md:h-auto max-md:aspect-video transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:z-10 max-md:hover:-translate-y-1 max-md:hover:scale-[1.01]';

    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.title;
    img.className = 'w-full h-full object-cover';
    img.loading = 'lazy';
    img.width = '320';
    img.height = '180';

    const titleContainer = document.createElement('div');
    titleContainer.className = 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3';

    const title = document.createElement('h4');
    title.className = 'text-pearl text-sm font-bold leading-tight line-clamp-2 group-hover:text-sand transition-colors duration-300';
    title.textContent = post.title;

    titleContainer.appendChild(title);
    card.appendChild(img);
    card.appendChild(titleContainer);

    return card;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBlogPosts);
  } else {
    loadBlogPosts();
  }
})();
