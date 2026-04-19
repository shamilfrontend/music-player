<script lang="ts" setup>
import { ref } from 'vue';

import { useTracksStore } from '../../store';
import { usePageLayout } from '../../composables/usePageLayout';
import UiButton from '../../ui/UiButton.vue';
import UiCard from '../../ui/UiCard.vue';

defineOptions({ name: 'AddTrackPage' });

const tracksStore = useTracksStore();
const { pageClassName } = usePageLayout('add-track-page');

const fileInputRef = ref<HTMLInputElement | null>(null);
const lastError = ref<string | null>(null);
const lastSuccess = ref(false);
const isAdding = ref(false);

function openPicker(): void {
  lastError.value = null;
  lastSuccess.value = false;
  fileInputRef.value?.click();
}

async function onFileSelected(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  lastError.value = null;
  lastSuccess.value = false;

  if (!file) {
    return;
  }

  isAdding.value = true;

  try {
    const result = await tracksStore.addUserTrackFromFile(file);

    if (result.ok) {
      lastSuccess.value = true;

      return;
    }

    if (result.reason === 'file_too_large') {
      lastError.value =
        'Файл больше 2,5 МБ. Выберите файл меньшего размера или сожмите аудио.';
    } else if (result.reason === 'read_failed') {
      lastError.value = 'Не удалось прочитать файл.';
    } else {
      lastError.value =
        'Не удалось сохранить в хранилище браузера (квота или ограничения).';
    }
  } finally {
    isAdding.value = false;
    input.value = '';
  }
}
</script>

<template>
  <div :class="pageClassName">
    <div class="page-heading">
      <span class="page-heading__eyebrow">Загрузка</span>
      <h1 class="page-heading__title">Добавление треков</h1>
      <p class="page-heading__description">
        Выберите аудиофайл с устройства — он появится в библиотеке и сохранится
        в этом браузере (до 2,5 МБ на файл).
      </p>
    </div>

    <ui-card
      class="add-track-page__card"
      elevated
    >
      <div class="add-track-page__body">
        <input
          ref="fileInputRef"
          class="add-track-page__input"
          type="file"
          accept="audio/*"
          aria-label="Выбор аудиофайла"
          @change="onFileSelected"
        />

        <p
          v-if="lastSuccess"
          class="add-track-page__hint add-track-page__hint_success"
        >
          Трек добавлен в библиотеку.
        </p>
        <p
          v-else-if="lastError"
          class="add-track-page__hint add-track-page__hint_error"
        >
          {{ lastError }}
        </p>

        <div class="add-track-page__actions">
          <ui-button
            type="button"
            :loading="isAdding"
            @click="openPicker"
          >
            Выбрать аудиофайл
          </ui-button>
        </div>
      </div>
    </ui-card>
  </div>
</template>

<style lang="scss" scoped>
.add-track-page {
  padding-top: var(--space-6);

  &__card {
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-6);
    text-align: center;
    width: 100%;
    box-sizing: border-box;
  }

  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    justify-content: center;
  }

  &__hint {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    max-width: 420px;

    &_success {
      color: var(--color-primary);
    }

    &_error {
      color: var(--color-danger);
    }
  }
}
</style>
