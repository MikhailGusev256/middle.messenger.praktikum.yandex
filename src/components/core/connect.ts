import store from '../../store/store.ts';
import type { Indexed } from '../../utils/indexed.ts';
import isEqual from '../../utils/isEqual.ts';
import type Block from './block.ts';
import type { BlockOwnProps } from './block.ts';

export function connect(
  Component: typeof Block,
  mapStateToProps: (state: Indexed) => Indexed,
) {
  // используем class expression
  return class extends Component {
    constructor(props: BlockOwnProps) {
      let state = mapStateToProps(store.getState());

      super({ ...props, ...state });

      // подписываемся на событие
      store.subscribe(() => {
        const newState = mapStateToProps(store.getState());
        if (!isEqual(state, newState)) {
          // вызываем обновление компонента, передав данные из хранилища
          state = newState;
          this.setProps({ ...mapStateToProps(store.getState()) });
        }
      });
    }
  };
}

export function connectFn(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return connect(Component, mapStateToProps);
  };
}
