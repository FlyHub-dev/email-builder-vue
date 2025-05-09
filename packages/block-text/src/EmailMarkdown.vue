<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-bind="rest" v-html="data" class="revert-browser-styles" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AllowedTags } from 'insane';
import insane from 'insane';
import { marked, Renderer, Tokens } from 'marked';
import type { CSSProperties } from 'vue';

const ALLOWED_TAGS: AllowedTags[] = [
  'a',
  'article',
  'b',
  'blockquote',
  'br',
  'caption',
  'code',
  'del',
  'details',
  'div',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'i',
  'img',
  'ins',
  'kbd',
  'li',
  'main',
  'ol',
  'p',
  'pre',
  'section',
  'span',
  'strong',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'u',
  'ul',
];
const GENERIC_ALLOWED_ATTRIBUTES = ['style', 'title'];

const props = defineProps<{
  style: CSSProperties,
  markdown: string,
}>()

const data = computed(() => renderMarkdownString(props.markdown))
const rest = computed(() => {
  const { markdown: _, ...rest } = props

  return rest
})

/** Functions */

function renderMarkdownString(str: string): string {
  const html = marked.parse(str, {
    async: false,
    breaks: true,
    gfm: true,
    pedantic: false,
    silent: false,
    renderer: new CustomRenderer(),
  });
  if (typeof html !== 'string') {
    throw new Error('marked.parse did not return a string');
  }
  return sanitizer(html);
}

function sanitizer(html: string): string {
  return insane(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      ...ALLOWED_TAGS.reduce<Record<string, string[]>>((res, tag) => {
        res[tag] = [...GENERIC_ALLOWED_ATTRIBUTES];
        return res;
      }, {}),
      img: ['src', 'srcset', 'alt', 'width', 'height', ...GENERIC_ALLOWED_ATTRIBUTES],
      table: ['width', ...GENERIC_ALLOWED_ATTRIBUTES],
      td: ['align', 'width', ...GENERIC_ALLOWED_ATTRIBUTES],
      th: ['align', 'width', ...GENERIC_ALLOWED_ATTRIBUTES],
      a: ['href', 'target', ...GENERIC_ALLOWED_ATTRIBUTES],
      ol: ['start', ...GENERIC_ALLOWED_ATTRIBUTES],
      ul: ['start', ...GENERIC_ALLOWED_ATTRIBUTES],
    },
  });
}

/** Class */

class CustomRenderer extends Renderer {
  override table(tokens: Tokens.Table) {
    const result = super.table(tokens)

    return result.replace('<table', '<table width="100%"')
  }

  link(tokens: Tokens.Link) {
    const result = super.link(tokens)

    return result.replace('<a', '<a target="_blank"')
  }
}

</script>
