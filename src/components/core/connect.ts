import store from '../../store/store.ts';
import type { Indexed } from '../../utils/indexed.ts';
import isEqual from '../../utils/isEqual.ts';
import type Block from './block.ts';
import type { BlockOwnProps } from './block.ts';

export function connect<TProps extends BlockOwnProps>(
  Component: new (props?: TProps) => Block<TProps>,
  mapStateToProps: (state: Indexed) => Partial<TProps>,
) {
  // используем class expression
  return class extends Component {
    constructor(props: TProps = {} as TProps) {
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
  return function (Component: new (props?: unknown) => Block) {
    return connect(Component, mapStateToProps);
  };
}
