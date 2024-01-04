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
   };

   todos: Todo[] = [];

   constructor(element: any) {
      this.element = element;
      this.elements = mapElements(this.element, {
         overlay: ".overlay",
         taskList: ".task__list",
         textArea: "#textArea",
         cancelBtn: ".cancel",
         showOverlayBtn: ".task__add-btn",
         addTodoBtn: "#addTodo",
         task: ".task",
         errorEl: ".error-message"
      });

      this.showOverlay();
      this.hideOverlay();
      this.storeTodos();
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
      });
   }

   storeTodos() {
      AsHtmlElement<HTMLTextAreaElement>(this.elements.addTodoBtn).addEventListener("click", _ => {
         if (AsHtmlElement<HTMLTextAreaElement>(this.elements.textArea).value.trim() === "") {
            AsHtmlElement(this.elements.errorEl).style.display = "block";
            return;
         } else {
            AsHtmlElement(this.elements.errorEl).style.display = "none";
            AsHtmlElement(this.elements.overlay).style.display = "none";
            this.todos.push({
               id: window.crypto.randomUUID(),
               text: AsHtmlElement<HTMLTextAreaElement>(this.elements.textArea).value,
               completed: false
            });
         }
      });
   }
}

new TodoApp("body");
