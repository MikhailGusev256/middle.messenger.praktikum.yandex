import type Block from '../components/core/block.ts';
import type { BlockOwnProps } from '../components/core/block.ts';

export default class Route {
  private _block: Block | null;
  private readonly _blockClass: new () => Block;
  private readonly _props: BlockOwnProps;
  private readonly path: string;

  constructor(path: string, view: new () => Block, props: BlockOwnProps) {
    this.path = path;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  leave() {
    if (this._block) {
      this._block.destroy();
      this._block = null;
    }
  }

  match(name: string) {
    return name === this.path;
  }

  render(rootElement: Element) {
    this.leave();
    this._block = new this._blockClass();
    this._block.setProps(this._props);
    rootElement?.replaceChildren(this._block.element());
  }
}
