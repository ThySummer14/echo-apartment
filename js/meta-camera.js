/* meta-camera —— 仅桌面版构建包含（build.mjs target=desktop 时才追加）。
   报告 3.1 meta 恐惧：把玩家本人的脸织进恐怖——
   镜像惊吓时全屏闪现玩家自己的脸（反色高对比，「不像你但又很像你」）。
   摄像头需用户授权：拒绝则静默降级，游戏照常。最多闪两次防脱敏。 */
(function () {
  'use strict';
  let video = null;
  let ready = false;
  let flashes = 0;
  const MAX_FLASHES = 2;

  function init() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 320 }, height: { ideal: 240 } } })
      .then((stream) => {
        video = document.createElement('video');
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.play();
        video.addEventListener('loadeddata', () => { ready = true; });
      })
      .catch(() => { /* 用户拒绝或无摄像头：静默降级 */ });
    // 授权被拒后 stream 停掉也要清理
    window.addEventListener('beforeunload', () => {
      if (video && video.srcObject) video.srcObject.getTracks().forEach((t) => t.stop());
    });
  }

  function flashFace(game) {
    if (!ready || !video || flashes >= MAX_FLASHES) return;
    flashes++;
    try {
      const c = document.createElement('canvas');
      c.width = 256; c.height = 256;
      const ctx = c.getContext('2d');
      // 居中裁方
      const s = Math.min(video.videoWidth || 320, video.videoHeight || 240);
      ctx.drawImage(video, ((video.videoWidth || s) - s) / 2, ((video.videoHeight || s) - s) / 2, s, s, 0, 0, 256, 256);
      // 反色 + 噪点：恐怖谷处理
      const img = ctx.getImageData(0, 0, 256, 256);
      for (let i = 0; i < img.data.length; i += 4) {
        img.data[i] = 255 - img.data[i];
        img.data[i + 1] = 255 - img.data[i + 1];
        img.data[i + 2] = 255 - img.data[i + 2];
      }
      ctx.putImageData(img, 0, 0);

      const overlay = document.createElement('div');
      overlay.style.cssText =
        'position:fixed;inset:0;z-index:70;background:#000;' +
        'display:flex;align-items:center;justify-content:center;';
      const imgEl = document.createElement('img');
      imgEl.src = c.toDataURL();
      imgEl.style.cssText =
        'width:min(78vh,78vw);image-rendering:pixelated;' +
        'filter:contrast(1.4) brightness(1.08);';
      overlay.appendChild(imgEl);
      document.body.appendChild(overlay);
      setTimeout(() => {
        overlay.style.transition = 'opacity .16s';
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 180);
      }, 430);
      if (game && game.audio && game.audio.whisper) game.audio.whisper(0.6, 1.9);
      if (game && game.audio && game.audio.sting) game.audio.sting();
    } catch (e) { /* 静默降级 */ }
  }

  /* 进入游戏几秒后再请求权限，避免和「点击开始」抢焦点 */
  setTimeout(init, 6000);

  window.__meta = { flashFace };
})();
