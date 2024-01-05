export const mapElements = (
   element: string | HTMLElement,
   object: { [Key: string]: string | HTMLElement | NodeList }
) => {
   let container: HTMLElement;

   if (element instanceof HTMLElement) {
      container = element;
   } else {
      container = document.querySelector(element)!;
   }

   const elements: { [Key: string]: Element | NodeList | null } = {};

   Object.keys(object).forEach(key => {
      const entry: any = object[key];

      if (entry instanceof HTMLElement) {
         elements[key] = entry as HTMLElement;
      } else if (entry instanceof NodeList || Array.isArray(entry)) {
         elements[key] = entry as NodeList;
      } else if (typeof entry === "string") {
         elements[key] = container.querySelectorAll(entry);

         if ((elements[key] as NodeList).length === 0) {
            elements[key] = null;
         } else if ((elements[key] as NodeList).length === 1) {
            elements[key] = container.querySelector(entry);
         } else {
            elements[key] = container.querySelectorAll(entry);
         }
      }
   });

   return elements;
};
