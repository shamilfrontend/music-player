import { onUnmounted, watch, type Ref } from 'vue';

const COVER_SELECTOR = '.player-screen__cover';
const MIN_DISTANCE_PX = 64;
const AXIS_RATIO = 1.25;

type GestureKind = 'horizontal' | 'vertical' | null;

interface UsePlayerScreenGesturesOptions {
  bodyRef: Ref<HTMLElement | null>;
  enabled: Ref<boolean>;
  onSwipeDownClose: () => void;
  onHorizontalSwipe: (direction: 'left' | 'right') => void;
}

interface GestureState {
  pointerId: number;
  startX: number;
  startY: number;
  scrollTopStart: number;
  fromCover: boolean;
  lockedKind: GestureKind;
}

function usePlayerScreenGestures(options: UsePlayerScreenGesturesOptions): void {
  const { bodyRef, enabled, onSwipeDownClose, onHorizontalSwipe } = options;

  let state: GestureState | null = null;

  function isFromCover(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) return false;

    return Boolean(target.closest(COVER_SELECTOR));
  }

  function shouldIgnoreGestureTarget(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) return true;

    return Boolean(
      target.closest('button, input, textarea, select, progress, label')
    );
  }

  function onPointerDown(event: PointerEvent): void {
    if (!enabled.value || !bodyRef.value) return;

    const { target } = event;

    if (shouldIgnoreGestureTarget(target)) return;

    state = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollTopStart: bodyRef.value.scrollTop,
      fromCover: isFromCover(target),
      lockedKind: null
    };

    bodyRef.value.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent): void {
    if (!state || event.pointerId !== state.pointerId || !bodyRef.value) return;

    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;

    if (!state.lockedKind) {
      if (
        state.fromCover
        && Math.abs(dx) >= MIN_DISTANCE_PX * 0.35
        && Math.abs(dx) >= Math.abs(dy) * AXIS_RATIO
      ) {
        state.lockedKind = 'horizontal';
      } else if (
        state.scrollTopStart === 0
        && dy >= MIN_DISTANCE_PX * 0.35
        && Math.abs(dy) >= Math.abs(dx) * AXIS_RATIO
      ) {
        state.lockedKind = 'vertical';
      }
    }

    if (state.lockedKind === 'horizontal' && state.fromCover) {
      event.preventDefault();
    }

    if (state.lockedKind === 'vertical' && state.scrollTopStart === 0) {
      event.preventDefault();
    }
  }

  function finishPointer(event: PointerEvent): void {
    if (!state || event.pointerId !== state.pointerId || !bodyRef.value) return;

    try {
      bodyRef.value.releasePointerCapture(event.pointerId);
    } catch {
      // уже снят
    }

    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;

    const { lockedKind, fromCover, scrollTopStart } = state;

    state = null;

    let kind: GestureKind = lockedKind;

    if (!kind && fromCover) {
      if (
        Math.abs(dx) >= MIN_DISTANCE_PX
        && Math.abs(dx) >= Math.abs(dy) * AXIS_RATIO
      ) {
        kind = 'horizontal';
      }
    }

    if (!kind && scrollTopStart === 0) {
      if (
        dy >= MIN_DISTANCE_PX
        && Math.abs(dy) >= Math.abs(dx) * AXIS_RATIO
      ) {
        kind = 'vertical';
      }
    }

    if (kind === 'horizontal' && fromCover) {
      if (dx < 0) {
        onHorizontalSwipe('left');
      } else {
        onHorizontalSwipe('right');
      }

      return;
    }

    if (kind === 'vertical' && scrollTopStart === 0) {
      onSwipeDownClose();
    }
  }

  const pointerMoveOptions = { passive: false };

  function attach(el: HTMLElement): void {
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove, pointerMoveOptions);
    el.addEventListener('pointerup', finishPointer);
    el.addEventListener('pointercancel', finishPointer);
  }

  function detach(el: HTMLElement): void {
    el.removeEventListener('pointerdown', onPointerDown);
    el.removeEventListener('pointermove', onPointerMove, pointerMoveOptions);
    el.removeEventListener('pointerup', finishPointer);
    el.removeEventListener('pointercancel', finishPointer);
  }

  let attachedEl: HTMLElement | null = null;

  watch(
    [bodyRef, enabled],
    () => {
      if (attachedEl) {
        detach(attachedEl);
        attachedEl = null;
      }

      const el = bodyRef.value;

      if (!el || !enabled.value) return;

      attach(el);
      attachedEl = el;
    },
    { immediate: true }
  );

  onUnmounted(() => {
    if (attachedEl) {
      detach(attachedEl);
      attachedEl = null;
    }
  });
}

export { usePlayerScreenGestures };
export type { UsePlayerScreenGesturesOptions };
