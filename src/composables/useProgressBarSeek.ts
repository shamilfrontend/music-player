import { ref } from 'vue';

interface UseProgressBarSeekOptions {
  getDuration: () => number;
  seekToSeconds: (seconds: number) => void;
  canSeek: () => boolean;
}

function ratioFromPointer(el: HTMLElement, clientX: number): number {
  const rect = el.getBoundingClientRect();

  if (rect.width <= 0) return 0;

  return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
}

function useProgressBarSeek(options: UseProgressBarSeekOptions) {
  const isDragging = ref(false);

  function applySeek(el: HTMLElement, clientX: number): void {
    if (!options.canSeek()) return;

    const duration = options.getDuration();

    if (!duration) return;

    options.seekToSeconds(ratioFromPointer(el, clientX) * duration);
  }

  function onPointerDown(event: PointerEvent): void {
    if (!options.canSeek()) return;

    const el = event.currentTarget as HTMLElement;

    el.setPointerCapture(event.pointerId);
    isDragging.value = true;
    applySeek(el, event.clientX);
  }

  function onPointerMove(event: PointerEvent): void {
    if (!isDragging.value) return;

    const el = event.currentTarget as HTMLElement;

    if (!el.hasPointerCapture(event.pointerId)) return;

    applySeek(el, event.clientX);
  }

  function finishPointer(event: PointerEvent): void {
    if (!isDragging.value) return;

    const el = event.currentTarget as HTMLElement;

    isDragging.value = false;

    try {
      el.releasePointerCapture(event.pointerId);
    } catch {
      // уже снят
    }
  }

  return {
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp: finishPointer,
    onPointerCancel: finishPointer
  };
}

export { useProgressBarSeek };
export type { UseProgressBarSeekOptions };
