const input = document.querySelector('#filter');
const table = document.querySelector('#table');
let repos = [];

// Get all repositories from GitHub
const getRepos = async () => {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        accept: 'application/vnd.github+json'
    }

    const username = 'Dzin';

    await fetch(`https://api.github.com/users/${username}/repos`, options)
        .then(resp => {
            resp.json()
                .then(data => {
                    repos = data;
                    showRepos(repos);
                });
        })
        .catch(err => {
            console.log(`Erro: ${err}`);
        })
}

getRepos();

// Show repositories in the table
const showRepos = (data) => {
    let tableBody = table.querySelector('tbody');
    tableBody.innerHTML = '';
    if (data.length > 0) {
        let row, cell;
        data.map(repo => {
            row = tableBody.insertRow();
            row.className = 'align-middle';
            
            cell = row.insertCell();
            cell.className = 'text-nowrap';
            cell.innerHTML = repo['id'];

            cell = row.insertCell();
            cell.className = 'text-nowrap';
            cell.innerHTML = repo['name'];

            cell = row.insertCell();
            cell.className = 'text-nowrap';
            cell.innerHTML = repo['full_name'];
        });    
    } else {
        row = tableBody.insertRow();
        row.className = 'align-middle';
        
        cell = row.insertCell();
        cell.className = 'text-nowrap';
        cell.colSpan = '3';
        cell.innerHTML = 'Nenhum dado encontrado!';
    }

}

// Filter repositories on key up
input.onkeyup = (e) => {
    let value = e.target.value;
    showRepos(repos.filter(repo => repo['name'].includes(value)));
}