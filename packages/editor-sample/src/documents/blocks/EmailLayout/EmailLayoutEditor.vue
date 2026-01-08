<template>
  <div
    :style="{
      backgroundColor: backdropColor ?? '#F5F5F5',
      color: textColor ?? '#262626',
      fontFamily: getFontFamily(fontFamily),
      fontSize: '16px',
      fontWeight: '400',
      letterSpacing: '0.15008px',
      lineHeight: '1.5',
      margin: '0',
      padding: '32px 0',
      width: '100%',
      minHeight: '100%',
    }"
    @click="handleClick"
  >
    <table
      align="center"
      width="100%"
      :style="{
        margin: '0 auto',
        maxWidth: '600px',
        backgroundColor: canvasColor ?? '#FFFFFF',
        borderRadius: borderRadius ? `${borderRadius}px` : undefined,
        border: (() => {
          const v = borderColor;
          if (!v) return undefined;

          return `1px solid ${v}`;
        })(),
      }"
      role="presentation"
      cellSpacing="0"
      cellPadding="0"
      border="0"
    >
      <tbody>
        <tr :style="{ width: '100%' }">
          <td style="position: relative">
            <EditorChildrenIds
              :children-ids="childrenIds"
              @change="handleChangeChildren"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { getFontFamily, FONT_FAMILY_NAMES } from '@flyhub/email-core';
import { currentBlockIdSymbol } from '../../editor/EditorBlock.vue';
import type { TEditorBlock } from '../../editor/core';
import EditorChildrenIds from '../helpers/EditorChildrenIds.vue';
import { inject } from 'vue';

import { useInspectorDrawer } from '../../editor/editor.store';

type Props = {
    backdropColor?: string | null;
    borderColor?: string | null;
    borderRadius?: number | null;
    canvasColor?: string | null;
    textColor?: string | null;
    fontFamily?: typeof FONT_FAMILY_NAMES[number] | null;
    childrenIds?: string[] | null;
}

withDefaults(defineProps<Props>(), {
  childrenIds: () => [],
})

const inspectorDrawer = useInspectorDrawer()

/** Injections */

const currentBlockId = inject(currentBlockIdSymbol)!

/** Functions */

function handleClick() {
  inspectorDrawer.setSelectedBlockId(null);
}

function handleChangeChildren(args: { block: TEditorBlock, blockId: string, childrenIds: string[] }) {
  const { block, blockId, childrenIds } = args;

  const document = inspectorDrawer.document;

  inspectorDrawer.setDocument({
    [blockId]: block,
    [currentBlockId]: {
      type: 'EmailLayout',
      data: {
        ...document[currentBlockId].data,
        childrenIds,
      },
    },
  })

  inspectorDrawer.setSelectedBlockId(blockId);
}

</script>
