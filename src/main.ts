import { mapElements } from "./dom";

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
      (this.elements.cancelBtn as HTMLElement).addEventListener("click", () => {
         (this.elements.overlay as HTMLElement).style.display = "none";
         (this.elements.task as HTMLElement).appendChild(
            this.elements.showOverlayBtn as HTMLElement
         );
      });
   }

   showOverlay() {
      (this.elements.showOverlayBtn as HTMLElement).addEventListener("click", () => {
         (this.elements.overlay as HTMLElement).style.display = "flex";
         (this.elements.task as HTMLElement).removeChild(
            this.elements.showOverlayBtn as HTMLElement
         );
      });
   }
}

new TodoApp("body");
