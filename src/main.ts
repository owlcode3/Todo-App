import AsHtmlElement from "./utils/asHtmlElement";
import { mapElements } from "./utils/dom";

interface Todo {
   id: string;
   text: string;
   completed: boolean;
}

class TodoApp {
   element: string | HTMLElement;

   elements: {
      [K in keyof ReturnType<typeof mapElements>]: Element | NodeList | null;
   } = {};

   todos: Todo[] = [];

   constructor(element: any) {
      this.element = element;
      this.elements = mapElements(this.element, {
         overlay: ".overlay",
         taskLists: ".task__lists",
         textArea: "#textArea",
         cancelBtn: ".cancel",
         showOverlayBtn: ".task__add-btn",
         addTodoBtn: "#addTodo",
         task: ".task",
         errorEl: ".error-message"
         // removeTodoBtn: ".remove-btn"
      });

      this.retrieveStorage();
      this.render();
      this.showOverlay();
      this.hideOverlay();
      this.storeTodos();
      this.deleteTodo();
   }

   hideOverlay() {
      AsHtmlElement(this.elements.cancelBtn).addEventListener("click", () => {
         AsHtmlElement(this.elements.overlay).style.display = "none";
         AsHtmlElement(this.elements.task).appendChild(AsHtmlElement(this.elements.showOverlayBtn));
      });
   }

   showOverlay() {
      AsHtmlElement(this.elements.showOverlayBtn).addEventListener("click", () => {
         AsHtmlElement(this.elements.overlay).style.display = "flex";
         AsHtmlElement(this.elements.task).removeChild(AsHtmlElement(this.elements.showOverlayBtn));
         AsHtmlElement<HTMLTextAreaElement>(this.elements.textArea).focus();
      });
   }

   storeTodos() {
      AsHtmlElement(this.elements.addTodoBtn).addEventListener("click", _ => {
         if (AsHtmlElement<HTMLTextAreaElement>(this.elements.textArea).value.trim() === "") {
            AsHtmlElement(this.elements.errorEl).style.display = "block";
            return;
         } else {
            AsHtmlElement(this.elements.errorEl).style.display = "none";
            AsHtmlElement(this.elements.overlay).style.display = "none";
            AsHtmlElement(this.elements.task).appendChild(
               AsHtmlElement(this.elements.showOverlayBtn)
            );

            this.todos = this.todos.concat({
               id: window.crypto.randomUUID(),
               text: AsHtmlElement<HTMLTextAreaElement>(this.elements.textArea).value,
               completed: false
            });
         }

         AsHtmlElement<HTMLTextAreaElement>(this.elements.textArea).value = "";

         this.populateStorage();
         this.render();
      });
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

   populateStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
   }

   retrieveStorage() {
      if (!localStorage.getItem("todos")) {
         return;
      }

      this.todos = this.todos.concat(JSON.parse(localStorage.getItem("todos")!));
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
                <button data-id="${id}" class="remove-btn">Remove</button>
              </div>
            </div>
          </li>`;

      const todos = this.todos.map(({ text, id }) => listEl(text, id, day, month, year)).join("");

      AsHtmlElement(this.elements.taskLists).innerHTML = todos;
   }
}

new TodoApp("body");
