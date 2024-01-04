export default function AsHtmlElement(el: Element | NodeList | null) {
   if (el instanceof HTMLElement) {
      return el as HTMLElement;
   }
   throw new Error("AsHtmlElement function can only accept HTMLElement as an argument.");
}
