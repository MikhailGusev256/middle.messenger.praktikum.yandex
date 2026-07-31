import type { BlockOwnProps } from './block.ts';

export interface PropsWithError extends BlockOwnProps {
  error: string;
}
