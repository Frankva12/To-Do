const agregarNotas = document.querySelector("#addNotes");
const notas = document.querySelector("#Notes");
const agregarNotaSeccion = document.querySelector("#AddNoteSeccion");
const notasSeccion = document.querySelector("#noteViews");
const name = document.querySelector("#name");
const description = document.querySelector("#description");
const date = document.querySelector("#date");
const priority = document.getElementsByName("priority");
const comments = document.querySelector("#comments");
const photo = document.querySelector("#photo");
const enviar = document.querySelector("#submit");
const divNotes = document.querySelector("#divNotes");



class Note {
    constructor(name, description, date, priority, comments, photo) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.comments = comments;
        this.photo = photo;
    }
}




const addNote = (div, {
    name,
    description,
    date,
    priority,
    comments,
    photo
}) => {
    div.innerHTML += `
    
    <div class="rounded overflow-hidden shadow-lg">
        <img class="w-full" src="${photo}" alt="Mountain">
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">${name}</div>
             <div class="text-gray-400 text-l mb-2">${date}</div>


            <p class= "text-gray-300 text-sm">${comments}</p>
            <p class="text-gray-700 text-base">${description}
            
        </div>
        <div class="px-6 pt-4 pb-2">
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Priority: ${priority}</span>
        </div>
    </div>
    `;
};


const clearInput = () => {
    const inputs = document.querySelectorAll("input[type=text]");
    inputs.forEach((item) => (item.value = null));
    description.value = "";
    comments.value = "";
    priority.checked = false;
    date.value = "";
};

function RadioInfo(radio) {
    for (let i = 0; i < radio.length; i++) {
        if (priority[i].checked) {
            importance = priority[i].value;
            return importance
        } else{
            return "no se ha seleccionado prioridad";
        }
    }
}


const validate = (name, description, date, comments, photo) => {
    return name.trim() && description.trim() && date.trim() && comments.trim() && photo.trim();
};


enviar.addEventListener("click", (e) => {
    e.preventDefault();
    if (validate(name.value, description.value, date.value, comments.value, photo.value)) {
        importance = RadioInfo(priority);
        const note = new Note(
            name.value,
            description.value,
            date.value,
            priority.value = importance,
            comments.value,
            photo.value
        );
        addNote(divNotes, note);
        clearInput();
    } else {
        alert("Ingrese el valor que falta");
    }
});

notasSeccion.classList.add("hide");

function mostrarNotas(btn) {
    if (btn == 1) {
        agregarNotaSeccion.classList.remove("hide");
        notasSeccion.classList.add("hide");
    } else if (btn == 2) {
        notasSeccion.classList.remove("hide");
        agregarNotaSeccion.classList.add("hide");
    }
}

agregarNotas.addEventListener("click", (e) => {
    mostrarNotas(1);
    e.preventDefault();
})


notas.addEventListener("click", (e) => {
    mostrarNotas(2);
    e.preventDefault();
})