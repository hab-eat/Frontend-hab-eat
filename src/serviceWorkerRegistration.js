// 서비스 워커 등록 코드
export function register(config) {
    if ('serviceWorker' in navigator) {
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        return;
      }
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
        navigator.serviceWorker.register(swUrl).then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        });
      });
    }
  }
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister();
      });
    }
  }
  