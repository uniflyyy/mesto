export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  // Отрисовывает все DOM-элементы по данным
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    })
  }

  // Добавляет DOM-элемент в конец контейнера
  addItemToTheEnd(element) {
    this._containerElement.prepend(element);
  }

  // Добавляет DOM-элемент в начало контейнера
  addItemToTheBeginning(element) {
    this._containerElement.append(element);
  }
}
