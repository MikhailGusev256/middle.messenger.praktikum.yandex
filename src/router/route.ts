import type Block from '../components/core/block.ts';
import type { BlockOwnProps } from '../components/core/block.ts';
import { RouteVisibility } from './routeVisibility.ts';

export default class Route {
  private _block: Block | null;
  private readonly _blockClass: new () => Block;
  private readonly _props: BlockOwnProps;
  private readonly path: string;
  public readonly visibility: RouteVisibility;

  constructor(
    path: string,
    visibility: RouteVisibility,
    view: new () => Block,
    props: BlockOwnProps,
  ) {
    this.path = path;
    this.visibility = visibility;
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

  match(path: string) {
    return path === this.path;
  }

  render(rootElement: Element) {
    this.leave();
    this._block = new this._blockClass();
    this._block.setProps(this._props);
    rootElement?.replaceChildren(this._block.element());
  }
}
