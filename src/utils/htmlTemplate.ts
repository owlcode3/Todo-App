export const ListEl = (text: string, id: string, date: Date) => /*html*/ `
 <li class="task__list" data-id="${id}">
   <p class="task__texts">${text}</p>
   <div class="task__added">
     <div class="task__date">
       <span>Added on ${date!.getMinutes()}</span>
       <span>:</span>
       <span>${date!.getDate().toString().padStart(2, "0")}/${(date!.getMonth() + 1)
   .toString()
   .padStart(2, "0")}/${date!.getFullYear()}</span>
     </div>
     <div class="edit-box">
       <button class="edit-btn">Edit</button>
       <button data-id="${id}" class="remove-btn">Delete</button>
     </div>
   </div>
 </li>`;

export const CompletedListEl = (text: string, id: string, date: Date) => /*html*/ `
 <li class="completed-task__list" data-id="${id}">
   <p class="completed-task__texts">${text}</p>
   <div class="task__added">
     <div class="task__date">
       <span>Completed on ${date!.getMinutes()}</span>
       <span>:</span>
       <span>${date!.getDate().toString().padStart(2, "0")}/${(date!.getMonth() + 1)
   .toString()
   .padStart(2, "0")}/${date!.getFullYear()}</span>
     </div>
   </div>
 </li>`;

export const EmptyTodoListsText = () => /*html*/ `
<h2 class="empty-todo">Add todos to see your list of todos here.</h2>`;
