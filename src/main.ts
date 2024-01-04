import AsHtmlElement from "./utils/asHtmlElement";
import { mapElements } from "./utils/dom";

class TodoApp {
   element: string | HTMLElement;

   elements: {
      [K in keyof ReturnType<typeof mapElements>]: Element | NodeList | null;
   };

   constructor(element: any) {
      this.element = element;
      this.elements = mapElements(this.element, {
         overlay: ".overlay",
         taskList: ".task__list",
         textArea: "#textArea",
         cancelBtn: ".cancel",
         showOverlayBtn: ".task__add-btn",
         addTodoBtn: "#addTodo",
         task: ".task"
      });

      this.showOverlay();
      this.hideOverlay();
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
}

new TodoApp("body");
