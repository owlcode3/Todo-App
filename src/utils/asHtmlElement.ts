export default function AsHtmlElement<T extends HTMLElement>(el: Element | NodeList | null): T {
   if (el instanceof HTMLElement) {
      return el as T;
   }
   throw new Error("AsHtmlElement function can only accept HTMLElement as an argument.");
}
