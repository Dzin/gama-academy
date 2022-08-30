// Global variables
const cepInput = document.querySelector('#cep');
const table = document.querySelector('#table');
const error = document.querySelector('#error');

// Mask CEP input 00000-000
cepInput.onkeyup = (e) => {
    error.style.display = 'none';

    if (String(cepInput.value.length) >= 9) {
        e.preventDefault();
    } else {
        cepInput.value = cepInput.value.replace(/[^0-9\.]+/g, ''); // Remove all non-numeric data
        cepInput.value = cepInput.value.replace(/^(\d{5})(\d)/, '$1-$2') // CEP mask 00000-000
    }
};

// Add data into the table
const getInfo = async () => {
    error.style.display = 'none';

    let cep = cepInput.value;

    if (checkIfExists(cep)) {
        showError('O CEP já existe na tabela!');
    } else {
        // Get data from ViaCEP API
        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }

        cepInput.disabled = true;

        let formattedCep = cep.replace(/[^0-9\.]+/g, ''); // Remove all non-numeric data

        await fetch(`https://viacep.com.br/ws/${formattedCep}/json/`, options)
            .then(resp => {
                resp.json()
                    .then(data => addToTable(data));
            })
            .catch(err => {
                showError(`O CEP é Inválido!`);
            })
            .finally(() => {
                cepInput.disabled = false;
            });   
    }
}

// Check if row already exists
const checkIfExists = (cep) => {
    return table.querySelector('tbody').querySelector(`#cep${cep}`) ? true : false;
}

// Show error message
const showError = (message) => {
    error.innerHTML = message;
    error.style.display = 'block';
}

// Add address data into the table
const addToTable = (data) => {
    let row = table.querySelector('tbody').insertRow();
    row.id = `cep${data['cep']}`; // Add id to row based on CEP value
    row.className = 'align-middle';

    let btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Remover';
    btn.onclick = () => removeFromTable(`cep${data['cep']}`); // Remove row based on id
    
    let cell = row.insertCell();
    cell.className = 'text-nowrap';
    cell.appendChild(btn);

    for (i in data) {
        cell = row.insertCell();
        cell.className = 'text-nowrap';
        cell.innerHTML = data[i] || '-';
    }
}

// Remove row from table
const removeFromTable = (id) => {
    error.style.display = 'none';
    document.querySelector(`#${id}`).remove();
}

// Clear rows from table
const clearTable = () => {
    error.style.display = 'none';
    table.querySelector('tbody').innerHTML = '';
}