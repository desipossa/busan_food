import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GU = styled.ul`
padding:100px;
display: flex;
gap:30px;
white-space: pre-line;
`;


const Nav = ({ guList }) => {

    return (
        <>
            <h1>
                <a href="/busan_food">부산맛집 지도</a>
            </h1>
            <GU>
                {
                    guList.map((it, idx) => {
                        return (
                            <li key={idx}>
                                <Link to={`/list/${it}`}>{it}</Link>
                            </li>
                        )
                    })
                }
            </GU>
        </>

    )
}

export default Nav