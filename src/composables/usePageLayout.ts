import { computed } from 'vue';

interface UsePageLayoutResult {
  pageClassName: ReturnType<typeof computed<string>>;
}

function usePageLayout(pageName: string): UsePageLayoutResult {
  const pageClassName = computed<string>(() => `${pageName} page-shell`);

  return {
    pageClassName
  };
}

export { usePageLayout };
