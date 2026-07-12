import merge from '../utils/merge.ts';
import set from '../utils/set.ts';
import type { Indexed } from './indexed.ts';
import type { Listener } from './listener.ts';

class Store {
  private state: Indexed = {};
  private listeners: Set<Listener> = new Set();

  public getState() {
    return this.state;
  }

  public setState(path: string, value: unknown) {
    // Создаем новый объект состояния вместо изменения существующего
    this.state = merge(this.state, set({}, path, value));

    // Уведомляем всех подписчиков об изменении
    this.emit();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);

    // Возвращаем функцию для отписки
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    this.listeners.forEach((listener) => listener());
  }
}

export default new Store();
