<template>
  <div :style="containerStyle">
    <table
      align="center"
      width="100%"
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      :style="tableStyle"
    >
      <tbody>
        <tr style="width: 100%">
          <td>
            <ReaderBlock
              v-for="childId in childrenIds"
              :key="childId"
              :document="document"
              :id="childId"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ReaderBlock from '../../Reader/ReaderBlock.vue';
import type { EmailLayoutProps } from './EmailLayoutPropsSchema';

const props = defineProps<EmailLayoutProps>();

function getFontFamily(fontFamily: EmailLayoutProps['fontFamily']) {
  const f = fontFamily ?? 'MODERN_SANS';
  switch (f) {
    case 'MODERN_SANS':
      return '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif';
    case 'BOOK_SANS':
      return 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif';
    case 'ORGANIC_SANS':
      return 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif';
    case 'GEOMETRIC_SANS':
      return 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif';
    case 'HEAVY_SANS':
      return 'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif';
    case 'ROUNDED_SANS':
      return 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif';
    case 'MODERN_SERIF':
      return 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';
    case 'BOOK_SERIF':
      return '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif';
    case 'MONOSPACE':
      return '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace';
  }
}

function getBorder({ borderColor }: EmailLayoutProps) {
  if (!borderColor) {
    return undefined;
  }
  return `1px solid ${borderColor}`;
}

const containerStyle = computed(() => ({
  backgroundColor: props.backdropColor ?? '#F5F5F5',
  color: props.textColor ?? '#262626',
  fontFamily: getFontFamily(props.fontFamily),
  fontSize: '16px',
  fontWeight: '400',
  letterSpacing: '0.15008px',
  lineHeight: '1.5',
  margin: '0',
  padding: '32px 0',
  minHeight: '100%',
  width: '100%',
}));

const tableStyle = computed(() => ({
  margin: '0 auto',
  maxWidth: '600px',
  backgroundColor: props.canvasColor ?? '#FFFFFF',
  borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
  border: getBorder(props),
}));

const childrenIds = computed(() => props.childrenIds ?? []);
</script>
