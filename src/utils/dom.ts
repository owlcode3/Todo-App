export const mapElements = (
   element: string | HTMLElement,
   object: { [Key: string]: string | HTMLElement | NodeList }
) => {
   if (element instanceof HTMLElement) {
      element = element;
   } else {
      element = document.querySelector(element) as HTMLElement;
   }

   const elements: { [Key: string]: Element | NodeList | null } = {};

   Object.keys(object).forEach(key => {
      const entry: any = object[key];

      if (entry instanceof HTMLElement) {
         elements[key] = entry as HTMLElement;
      } else if (entry instanceof NodeList || Array.isArray(entry)) {
         elements[key] = entry as NodeList;
      } else if (typeof entry === "string") {
         elements[key] = (element as HTMLElement).querySelectorAll(entry);

         if ((elements[key] as NodeList).length === 0) {
            elements[key] = null;
         } else if ((elements[key] as NodeList).length === 1) {
            elements[key] = (element as HTMLElement).querySelector(entry);
         } else {
            elements[key] = (element as HTMLElement).querySelectorAll(entry);
         }
      }
   });

   return elements;
};
