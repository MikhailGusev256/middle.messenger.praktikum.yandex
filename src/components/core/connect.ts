import store from '../../store/store.ts';
import type { Indexed } from '../../utils/indexed.ts';
import isEqual from '../../utils/isEqual.ts';
import type { BlockOwnProps, ComponentClass } from './block.ts';

export function connect<TProps extends BlockOwnProps>(
  Component: ComponentClass<TProps>,
  mapStateToProps: (state: Indexed) => Partial<TProps>,
) {
  // используем class expression
  return class extends Component {
    private unsubscribe: () => void;
    constructor(props: TProps = {} as TProps) {
      let state = mapStateToProps(store.getState());

      super({ ...props, ...state });

      // подписываемся на событие
      this.unsubscribe = store.subscribe(() => {
        const newState = mapStateToProps(store.getState());
        if (!isEqual(state, newState)) {
          // вызываем обновление компонента, передав данные из хранилища
          state = newState;
          this.setProps({ ...mapStateToProps(store.getState()) });
        }
      });
    }

    override destroy() {
      this.unsubscribe();
      super.destroy();
    }
  };
}
