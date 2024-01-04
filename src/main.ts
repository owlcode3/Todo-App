import { mapElements } from "./dom";

class TodoApp {
   element: string | HTMLElement;

   elements: {
      [K in keyof ReturnType<typeof mapElements>]: Element | NodeList | null;
   };

   constructor(element: any) {
      this.element = element;
      this.elements = mapElements(this.element, {
         inputOverlay: ".input",
         taskList: ".task__list",
         textArea: "#textArea",
         cancelBtn: ".cancel",
         showOverlayBtn: ".task__add-btn",
         addTodoBtn: "#addTodo",
         coverImage: "[data-cover]"
      });

      this.hideOverlay();
   }

   hideOverlay() {
      (this.elements.cancelBtn as HTMLElement).addEventListener("click", () => {
         (this.elements.inputOverlay as HTMLElement).style.display = "none"; // Hide
      });
   }
}

new TodoApp("body");
