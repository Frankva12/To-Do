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
const filter = document.querySelector("#filter")

let order = [];

class Note {
    constructor(name, description, date, priority, comments, photo, filter) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.comments = comments;
        this.photo = photo;
        this.filter = filter;
    }
}


const addNote = (div, notes) => {
    div.innerHTML = null;
    notes.forEach(note => {
        div.innerHTML += `
    <div class="rounded overflow-hidden shadow-lg">
        <img class="w-full" src="${note.photo}" alt="Mountain">
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">${note.name}</div>
             <div class="text-gray-400 text-l mb-2">${note.date}</div>
            <p class= "text-gray-300 text-sm">${note.comments}</p>
            <p class="text-gray-700 text-base">${note.description}
            
        </div>
        <div class="px-6 pt-4 pb-2">
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Prioridad: ${note.priority}</span>
        </div>
    </div>
    `;
    });

};


const clearInput = () => {
    const inputs = document.querySelectorAll("input[type=text]");
    inputs.forEach((item) => (item.value = null));
    description.value = "";
    comments.value = "";
    date.value = "";
    for (let i = 0; i < priority.length; i++) {
        priority[i].checked = false
    }
    alert("Su nota ha sido exitosamente agregada")
};

function RadioInfo(radios) {
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            importance = radios[i].value;
            return importance;
        }
    }
}

function FilterImportance(text) {
    const number = {
        "Alta": 1,
        "Media": 2,
        "Baja": 3,
    };
    return number[text]
}

const validate = (name, description, date, comments, photo) => {
    return name.trim() && description.trim() && date.trim() && comments.trim() && photo.trim();
};

enviar.addEventListener("click", (e) => {
    e.preventDefault();
    if (validate(name.value, description.value, date.value, comments.value, photo.value)) {
        importance = RadioInfo(priority);
        numero = FilterImportance(importance)
        const note = new Note(
            name.value,
            description.value,
            date.value,
            priority.value = importance,
            comments.value,
            photo.value,
            filter.value = numero
        );
        order.push(note);
        order.sort(function (a, b) {
            return (new Date(a.date) - new Date(b.date))
        })
        filterNotes(filter.value);
        clearInput();
    } else {
        name.className = "border-b-2 border-gray-400 w-6/12 outline-none focus:border-blue-500 flex-1 py-2 focus:text-blue-600 border-red-500";
        description.className = "border-b-2 border-gray-400 outline-none focus:border-blue-500 flex-1 py-2 focus:text-blue-600 border-red-500";
        date.className = "border-b-2 border-gray-400 outline-none focus:border-blue-500 flex-1 py-2 focus:text-blue-600 border-red-500";
        comments.className = "border-b-2 border-gray-400 outline-none focus:border-blue-500 flex-1 py-2 focus:text-blue-600 border-red-500";
        photo.className = "border-b-2 border-gray-400 w-6/12 outline-none focus:border-blue-500 flex-1 py-2 focus:text-blue-600 border-red-500";
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

function filterNotes(valor) {

    let opcion = {
        "0": () => {
            let orderImportance = [];
            order.forEach(note => {
                if (note.priority == "Alta") {
                    orderImportance.push(note);
                }
            });
            addNote(divNotes, orderImportance)
        },
        "1": () => {
            let orderImportance = [];
            order.forEach(note => {
                if (note.priority == "Media") {
                    orderImportance.push(note);
                }
            });
            addNote(divNotes, orderImportance)
        },
        "2": () => {
            let orderImportance = [];
            order.forEach(note => {
                if (note.priority == "Baja") {
                    orderImportance.push(note);
                }
            });
            addNote(divNotes, orderImportance)
        },
        "3": () => {
            order.sort(function (a, b) {
                return (a.filter - b.filter)

            })
            addNote(divNotes, order)
        },
        "4": () => {
            order.sort(function (a, b) {
                return (b.filter - a.filter)
            })
            addNote(divNotes, order)
        }
    }

    opcion[valor]();
}

filter.addEventListener("change", (e) => {
    let valor = filter.value
    filterNotes(valor)


})