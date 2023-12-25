// Lite Youtube embed (https://codepen.io/labnol/pen/vYXYrOW)
function labnolIframe(div: HTMLElement): void {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', 'https://www.youtube.com/embed/' + div.dataset.id + '?autoplay=1&rel=0');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '1');
  iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
  (div.parentNode as ParentNode).replaceChild(iframe, div);
}

function initYouTubeVideos(): void {
  const playerElements = document.getElementsByClassName('youtube-player');
  for (let n = 0; n < playerElements.length; n++) {
    const videoId = (playerElements[n] as HTMLElement).dataset.embedid;
    const div = document.createElement('div');
    div.setAttribute('data-id', videoId as string);
    const thumbNode = document.createElement('img');
    thumbNode.src = 'https://i.ytimg.com/vi/ID/hqdefault.jpg'.replace('ID', videoId as string);
    div.appendChild(thumbNode);
    const playButton = document.createElement('i');
    playButton.setAttribute('class', 'ri-play-circle-line ri-4x');
    div.appendChild(playButton);
    div.onclick = function (): void {
      labnolIframe(this as HTMLElement);
    };
    playerElements[n].appendChild(div);
  }
}

export { labnolIframe, initYouTubeVideos };
