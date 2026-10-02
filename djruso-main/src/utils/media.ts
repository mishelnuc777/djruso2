// Utilidades para enlaces de YouTube: acepta watch, youtu.be, shorts, embed y live.

export interface YouTubeInfo {
  id: string;
  isShort: boolean;
  start: number; // segundo de inicio (0 si no hay)
}

const YT_ID = /^[\w-]{11}$/;

function parseStart(value: string | null): number {
  if (!value) return 0;
  if (/^\d+$/.test(value)) return parseInt(value, 10);
  const m = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!m) return 0;
  return (parseInt(m[1] || '0', 10) * 3600) + (parseInt(m[2] || '0', 10) * 60) + parseInt(m[3] || '0', 10);
}

export function parseYouTube(url?: string): YouTubeInfo | null {
  if (!url) return null;
  const raw = url.trim();
  if (!raw.startsWith('http')) return null;

  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }

  const host = u.hostname.replace(/^(www\.|m\.|music\.)/, '');
  let id: string | null = null;
  let isShort = false;

  if (host === 'youtu.be') {
    id = u.pathname.split('/').filter(Boolean)[0] ?? null;
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts[0] === 'watch') {
      id = u.searchParams.get('v');
    } else if (['embed', 'v', 'live', 'shorts'].includes(parts[0])) {
      id = parts[1] ?? null;
      isShort = parts[0] === 'shorts';
    }
  }

  if (!id || !YT_ID.test(id)) return null;
  return { id, isShort, start: parseStart(u.searchParams.get('t') || u.searchParams.get('start')) };
}

export function isYouTubeUrl(url?: string): boolean {
  return parseYouTube(url) !== null;
}

interface EmbedOptions {
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export function youTubeEmbedUrl(info: YouTubeInfo, opts: EmbedOptions = {}): string {
  const { autoplay = false, muted = false, loop = false, controls = true } = opts;
  const params = new URLSearchParams({
    rel: '0',
    playsinline: '1',
    modestbranding: '1',
    autoplay: autoplay ? '1' : '0',
    mute: muted ? '1' : '0',
    controls: controls ? '1' : '0',
  });
  if (loop) {
    params.set('loop', '1');
    params.set('playlist', info.id); // necesario para que YouTube repita el video
  }
  if (info.start > 0) params.set('start', String(info.start));
  return `https://www.youtube-nocookie.com/embed/${info.id}?${params.toString()}`;
}

export function youTubeThumbnail(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
