import { JSX } from 'vue/jsx-runtime';
import type { z } from 'zod';

export type BaseZodDictionary = { [name: string]: z.AnyZodObject };
export type DocumentBlocksDictionary<T extends BaseZodDictionary> = {
  [K in keyof T]: {
    schema: T[K];
    Component: (props: z.infer<T[K]>) => JSX.Element
  };
};

export type BlockConfiguration<T extends BaseZodDictionary> = {
  [TType in keyof T]: {
    type: TType;
    data: z.infer<T[TType]>;
  };
}[keyof T];

export class BlockNotFoundError extends Error {
  blockId: string;
  constructor(blockId: string) {
    super('Could not find a block with the given blockId');
    this.blockId = blockId;
  }
}

