import AsHtmlElement from "./utils/asHtmlElement";
import {
  mapElements
} from "./utils/dom";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

class TodoApp {
  element: string | HTMLElement;

  elements: {
    [K in keyof ReturnType < typeof mapElements > ]: Element | NodeList | null;
  } = {};

  todos: Todo[] = [];

  constructor(element: any) {
    this.element = element;
    this.elements = mapElements(this.element, {
      overlay: ".overlay",
      taskLists: ".task__lists",
      textArea: "#textArea",
      cancelBtn: ".cancel",
      openOverlayBtn: ".task__add-btn",
      addTodoBtn: "#addTodo",
      updateTodoBtn: "#updateTodo",
      task: ".task",
      errorEl: ".error-message"
    });

    this.retrieveStorage();
    this.render();
    this.onClickOpenOverlayBtn();
    this.hideOverlay();
    this.storeTodos();
    this.deleteTodo();
    this.editTodo();
  }

  hideOverlay() {
    AsHtmlElement(this.elements.cancelBtn).addEventListener("click", () => {
      AsHtmlElement(this.elements.overlay).style.display = "none";
      AsHtmlElement(this.elements.task).appendChild(AsHtmlElement(this.elements.openOverlayBtn));
      AsHtmlElement < HTMLTextAreaElement > (this.elements.textArea).value = "";
    });
  }

  openOverlay() {
    AsHtmlElement(this.elements.overlay).style.display = "flex";
    AsHtmlElement(this.elements.task).removeChild(AsHtmlElement(this.elements.openOverlayBtn));
    AsHtmlElement < HTMLTextAreaElement > (this.elements.textArea).focus();
  }

  onClickOpenOverlayBtn() {
    AsHtmlElement(this.elements.openOverlayBtn).addEventListener("click", () => {
      AsHtmlElement < HTMLButtonElement > (this.elements.addTodoBtn).style.display = "flex";
      AsHtmlElement < HTMLButtonElement > (this.elements.updateTodoBtn).style.display = "none";
      this.openOverlay();
    });
  }

  storeTodos() {
    AsHtmlElement(this.elements.addTodoBtn).addEventListener("click", _ => {
      if (AsHtmlElement < HTMLTextAreaElement > (this.elements.textArea).value.trim() === "") {
        AsHtmlElement(this.elements.errorEl).style.display = "block";
        return;
      }
      AsHtmlElement(this.elements.errorEl).style.display = "none";
      AsHtmlElement(this.elements.overlay).style.display = "none";
      AsHtmlElement(this.elements.task).appendChild(AsHtmlElement(this.elements.openOverlayBtn));

      this.todos = this.todos.concat({
        id: window.crypto.randomUUID(),
        text: AsHtmlElement < HTMLTextAreaElement > (this.elements.textArea).value,
        completed: false
      });

      AsHtmlElement < HTMLTextAreaElement > (this.elements.textArea).value = "";

      this.populateStorage();
      this.render();
    });
  }

  storeEditedTodo(updatedText: string, id: string) {
    if (updatedText.trim() === "") {
      AsHtmlElement(this.elements.errorEl).style.display = "block";
      return;
    }

    AsHtmlElement(this.elements.errorEl).style.display = "none";
    AsHtmlElement(this.elements.overlay).style.display = "none";
    AsHtmlElement(this.elements.task).appendChild(AsHtmlElement(this.elements.openOverlayBtn));

    this.todos = this.todos.map(todo => {
      return todo.id === id ?
        {
          ...todo,
          text: updatedText
        } :
        todo;
    });

    AsHtmlElement < HTMLTextAreaElement > (this.elements.textArea).value = "";

    this.populateStorage();
    this.render();
  }

  deleteTodo() {
    document.addEventListener("click", event => {
      const target = event.target as HTMLElement;

      if (target.closest && target.closest(".task__lists")) {
        if (target.classList.contains("remove-btn")) {
          const id = target.dataset.id!;
          this.todos = this.todos.filter(todo => todo.id !== id);

          this.populateStorage();
          this.render();
        }
      }
    });
  }

  editTodo() {
    AsHtmlElement(this.elements.taskLists).addEventListener("click", event => {
      const target = event.target as HTMLElement;

      if (target.classList.contains("edit-btn")) {
        const nextBtnEl = target.nextElementSibling as HTMLButtonElement;
        const id = nextBtnEl.dataset.id!;
        const todo = this.todos.find(todo => todo.id === id);

        if (todo?.text) {
          AsHtmlElement < HTMLButtonElement > (this.elements.updateTodoBtn).style.display = "flex";
          AsHtmlElement < HTMLButtonElement > (this.elements.addTodoBtn).style.display = "none";
          this.openOverlay();
          AsHtmlElement < HTMLTextAreaElement > (this.elements.textArea).value = todo?.text!;
        }

        AsHtmlElement < HTMLTextAreaElement > (this.elements.updateTodoBtn).addEventListener(
          "click",
          () => {
            this.storeEditedTodo(
              AsHtmlElement < HTMLTextAreaElement > (this.elements.textArea).value,
              id
            );
          }
        );
      }
    });
  }

  populateStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  retrieveStorage() {
    if (!localStorage.getItem("todos")) {
      return;
    }

    this.todos = this.todos.concat(JSON.parse(localStorage.getItem("todos") !));
  }

  render() {
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();

    if (this.todos.length === 0) {
      const el = /*html*/ `
                                  <h2 class="empty-todo">
                                    Add todos to see your list of todos here.
                                  </h2>
                                  `;

      AsHtmlElement(this.elements.taskLists).innerHTML = el;
      return;
    }

    const listEl = (
      text: string,
      id: string,
      day: string,
      month: string,
      year: number
    ) => /*html*/ `
                            <li class="task__list">
                              <p class="task__texts">${text}</p>
                              <div class="task__added">
                                <div class="task__date">
                                  <span>Added on</span>
                                  <span>:</span>
                                  <span>${day}/${month}/${year}</span>
                                </div>
                                <div class="edit-box">
                                  <button class="edit-btn">Edit</button>
                                  <button data-id="${id}" class="remove-btn">Delete</button>
                                </div>
                              </div>
                            </li>`;

    const todos = this.todos.map(({
      text,
      id
    }) => listEl(text, id, day, month, year)).join("");

    AsHtmlElement(this.elements.taskLists).innerHTML = todos;
  }
}

new TodoApp("body");