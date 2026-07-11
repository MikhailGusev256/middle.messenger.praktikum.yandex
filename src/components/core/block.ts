import Handlebars from 'handlebars';

export interface BlockOwnProps {
  __children?: Array<{
    component: Block<object>;
    embed(node: DocumentFragment): void;
  }>;
  __refs?: Record<string, Element>;
}

export type EventListType = Partial<
  Record<keyof HTMLElementEventMap, (e: Event) => void>
>;

export interface ComponentClass {
  new (props?: object): Block;
  componentName: string;
}

export default abstract class Block<T extends BlockOwnProps = BlockOwnProps> {
  protected children: Block<object>[] = [];

  private domElement: Element | null = null;

  protected events: EventListType = {};

  protected props = {} as T;

  protected refs: Record<string, Element> = {};

  protected template: string = '';

  constructor(props: T = {} as T) {
    this.props = props;
  }

  private attachListeners() {
    if (!this.domElement) {
      return;
    }
    for (const [eventName, eventCallback] of Object.entries(this.events)) {
      if (typeof eventCallback == 'function') {
        this.domElement.addEventListener(eventName, eventCallback);
      }
    }
  }

  private compile(): Element {
    // this.props становится data.root внутри хелперов
    const html = Handlebars.compile(this.template)(this.props);
    const templateElement = document.createElement('template');
    templateElement.innerHTML = html;
    const fragment = templateElement.content;

    if (this.props.__children) {
      this.children = this.props.__children.map((child) => child.component);

      this.props.__children.forEach((child) => {
        child.embed(fragment);
      });
    }

    const defaultRefs = this.props?.__refs ?? {};
    this.refs = Array.from(fragment.querySelectorAll('[ref]')).reduce(
      (list, element) => {
        const key = element.getAttribute('ref') as string;
        list[key] = element as HTMLElement;
        element.removeAttribute('ref');
        return list;
      },
      defaultRefs,
    );

    const result = templateElement.content.firstElementChild;
    if (!result) {
      throw new Error('Cannot create an element');
    }
    return result;
  }

  protected componentDidMount() {}

  protected componentWillUnmount() {}

  public element(): Element {
    if (!this.domElement) {
      this.domElement = this.render();
    }
    return this.domElement;
  }

  private mountComponent() {
    this.attachListeners();
    this.componentDidMount();
  }

  private removeListeners() {
    if (!this.domElement) {
      return;
    }
    for (const [eventName, eventCallback] of Object.entries(this.events)) {
      if (typeof eventCallback === 'function') {
        this.domElement.removeEventListener(eventName, eventCallback);
      }
    }
  }

  private render(): Element {
    this.unmountComponent();
    const fragment = this.compile();
    if (this.domElement) {
      this.domElement.replaceWith(fragment);
    }
    this.domElement = fragment;
    this.mountComponent();
    return fragment;
  }

  public setProps(props: Partial<T>) {
    this.props = {
      ...this.props,
      ...props,
      __children: [],
      __refs: {},
    } as T;
    this.render();
  }

  private unmountComponent() {
    if (this.domElement) {
      this.children.reverse().forEach((child) => child.unmountComponent());

      this.componentWillUnmount();
      this.removeListeners();
    }
  }

  public destroy() {
    this.unmountComponent();
    this.domElement?.remove();
    this.domElement = null;
  }
}
