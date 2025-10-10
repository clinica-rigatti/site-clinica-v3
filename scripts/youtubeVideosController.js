const S3_JSON_URL = 'https://clinicarigatti.s3.sa-east-1.amazonaws.com/scripts/videos.json';

async function loadYouTubeVideos() {
  try {
    const response = await fetch(S3_JSON_URL);

    if (!response.ok) {
      throw new Error(`Erro ao buscar vídeos do S3: ${response.status}`);
    }

    const data = await response.json();
    console.log("Vídeos carregados do S3:", data);

    if (!data || data.length === 0) {
      console.warn('Nenhum vídeo encontrado no JSON');
      return;
    }

    const videoGrid = document.querySelector('.grid.grid-cols-2');
    
    if (!videoGrid) {
      console.error('Grade de vídeos não encontrada');
      return;
    }

    const mediaItems = videoGrid.querySelectorAll('img');

    data.forEach((video, index) => {
      if (mediaItems[index]) {
        const thumbnail = video.snippet.thumbnails.high.url;
        const videoTitle = video.snippet.title;
        const videoId = video.id.videoId;
        console.log("videoId =>", videoId);
        
        const link = document.createElement('a');
        link.href = `https://www.youtube.com/watch?v=${videoId}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'block';
        link.title = videoTitle;
        
        mediaItems[index].src = thumbnail;
        mediaItems[index].alt = videoTitle;
        
        const parent = mediaItems[index].parentNode;
        parent.insertBefore(link, mediaItems[index]);
        link.appendChild(mediaItems[index]);
        
        console.log(`Vídeo ${index + 1} carregado: ${videoTitle}`);
      }
    });

    console.log(`Total de ${data.length} vídeos carregados com sucesso`);

  } catch (error) {
    console.error('Erro ao carregar vídeos do YouTube:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadYouTubeVideos);
} else {
  loadYouTubeVideos();
}