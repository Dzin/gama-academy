import React, { useEffect, useState } from 'react';

import { Container } from './styles';

interface Repos {
    id: number,
    name: string,
    full_name: string
}

const Home: React.FC = () => {
    const [search, setSearch] = useState<string>('')
    const [repos, setRepos] = useState<Repos[]>([])

    useEffect(() => {

        const username = 'Dzin';

        fetch(`https://api.github.com/users/${username}/repos`)
        .then(resp => {
            resp.json()
                .then(data => {
                    setRepos(data)
                });
        })
        .catch(err => {
            console.log(`Erro: ${err}`);
        })
    }, [])

    const filteredRepos = search.length > 0 ? repos.filter(repo => repo.name.includes(search)) : repos

    return (
        <Container>
            <div className="page-content">
                <h1 className="title">GitHub - Dzin</h1>
                <p className="description">Utilize o campo abaixo para filtrar a lista de repositórios por nome:</p>
                <input className="search" type="text" onChange={e => setSearch(e.target.value)} value={search} />
                <table className="repos-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Nome Completo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRepos.map(repo => (
                            <tr key={repo.id}>
                                <td>{repo.id}</td>
                                <td>{repo.name}</td>
                                <td>{repo.full_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    )
}

export default Home;