import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding: 50px 20px;
    display: flex;
    align-content: center;
    justify-content: center;

    .page-content {
        width: 100%;
        max-width: 700px;

        .title {
            color: #8c52e5;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .description {
            color: #000000;
            font-size: 15px;
            font-weight: normal;
            margin-bottom: 10px;
        }

        .search {
            display: block;
            width: 100%;
            max-width: 250px;
            margin-bottom: 30px;
            height: 40px;
            padding: 5px 10px;
            font-size: 16px;
            border: 1px solid #dddddd;
            border-radius: 0;

            :focus-visible {
                outline: 0;
            }
        }

        .repos-list {
            border-collapse: collapse;
            width: 100%;

            th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: left;
                background-color: #8c52e5;
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
            }

            th,
            td {
                border: 1px solid #dddddd;
                padding: 8px;
            }

            tr {
                :nth-child(even) {
                    background-color: #f2f2f2;
                }

                :hover {
                    background-color: #dddddd;
                    cursor: pointer;
                }
            }

            td {
                color: #000000;
                font-size: 15px;
                font-weight: normal;
            }
        }
    }    
`