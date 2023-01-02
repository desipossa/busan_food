import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const BBOX = styled.div`
font-size: 23px;
font-weight: 700;
margin: 0 0 20px 0;
&::after {
    content:"";
    display: block;
    width: 60px;
    height:1px;
    background: tomato;
    margin: 20px 0;
}
`
const PBOX = styled.div`
font-size: 15px;
margin: 0 0 20px 0;
word-break: keep-all;
min-height: 150px;
`

const UL = styled.ul`
display: grid;
grid-template-columns : repeat(5, 1fr);
gap:30px;
white-space: pre-line;
padding: 50px;
`;

const BOX = styled.div`
margin: 0 0 20px 0;
`

const List = ({ foodList, guList }) => {
    const { id } = useParams();
    const [gList, setGlist] = useState([]);
    const gu = foodList.filter(it => it.GUGUN_NM === id);
    useEffect(() => {
        setGlist(gu)
    }, [id]);

    console.log(id, gu, gList)

    return (
        <div>
            <UL>
                {
                    gList.map((it, idx) => {
                        return (
                            <li>
                                <figure>
                                    <BOX><img src={it.MAIN_IMG_NORMAL} alt="" /></BOX>
                                </figure>
                                <BBOX>{it.TITLE}</BBOX>
                                <BOX>{it.GUGUN_NM}</BOX>
                                <PBOX>{it.ITEMCNTNTS}</PBOX>
                                <BOX>{it.USAGE_DAY_WEEK_AND_TIME}</BOX>

                            </li>
                        )
                    })
                }
            </UL>
        </div>
    )
}

export default List