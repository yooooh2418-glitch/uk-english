/* Wordle UK Dictionary — Service Worker
   オフライン動作のためのキャッシュ。
   キャッシュ名のバージョンを上げると古いキャッシュが破棄され更新される。 */
const CACHE = 'wordle-uk-v5';

// SW自身の場所を基準にした相対パス（GitHub Pagesのサブパスでも動く）
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png'
];

// インストール時：必要ファイルを事前キャッシュ
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 有効化時：古いバージョンのキャッシュを削除
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// 取得時：キャッシュ優先（オフラインでも動く）、無ければネットワーク
self.addEventListener('fetch', (e) => {
  const req = e.request;
  // GET以外やGoogle Fonts等の外部はネットワークに任せる
  if (req.method !== 'GET') return;

  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          // 同一オリジンの成功レスポンスは動的にキャッシュ追加
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => {
          // オフラインでナビゲーションが失敗したらindexを返す
          if (req.mode === 'navigate') return caches.match('./index.html');
        });
    })
  );
});
