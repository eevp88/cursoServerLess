const url = 'https://us-central1-rest-api-60c8a.cloudfunctions.net/api/pets';

const fetchPets = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const pets = await response.json();
        return pets;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};

const darDeBaja = async (id) => {
    try {
        const response = await fetch(`${url}/${id}/daralta`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const btn = document.getElementById(id);
        btn.parentElement.parentElement.remove();
    } catch (error) {
        console.error('There has been a problem with your delete operation:', error);
    }
};
    
const tableTemplate = ({_id, name,type, description }) => {
    return `<tr>
        <td>${name}</td>
        <td>${type}</td>
        <td>${description}</td>
        <td>
            <button class="btn btn-primary" id="${_id}" onclick="darDeBaja('${_id}')" >Dar de Baja</button> 
        </td>
    </tr>
    `; 
};  

const handlerSubmit = async (e) => {
    e.preventDefault();
    const { name, type, description } = e.target.elements;
    const pet = {
        name: name.value,
        type: type.value,
        description: description.value
    };
    try {
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pet)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const { _id } = await response.json();
        const newPet = { 
            ...pet,
            _id: _id,
        }
        const tbody = document.getElementById('list_pets')
        tbody.insertAdjacentHTML('beforeend', tableTemplate(newPet));
        e.target.reset(); // Reset the form fields
    } catch (error) {
        console.error('There has been a problem with your post operation:', error);
    }
}

window.onload = async () => { 
    const petForm = document.getElementById('form_pet');
    petForm.onsubmit = handlerSubmit;
    const pets = await fetchPets()
    const td = pets.reduce((acc, pet) => {
        return acc + tableTemplate(pet);
    }, '');

    document.getElementById('list_pets').innerHTML = td;

}
