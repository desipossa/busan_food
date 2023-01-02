import axios from 'axios'
import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import List from './components/List';
import All from './components/All'
import Wrap from './components/Wrap';

const serviceKey = 'nmPIjJ%2Bj0FufPiP6k4BLPlq3n%2B46QZN%2B6hgSINrrxqk3nNwnoHX2ynqX6Dlgr3xFeivGPus2vgmh6Ifx1vdu1g%3D%3D';

const Main = () => {

    const [foodList, setFoodList] = useState([]);
    const [guList, setGuList] = useState([]);
    const getData = async () => {
        const r = await axios.get(`https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${serviceKey}&pageNo=1&numOfRows=150&resultType=json`);
        const d = await r.data.getFoodKr.item;
        const g = d.map(it => it.GUGUN_NM);
        const gu = new Set(g);
        setGuList([...gu].sort());
        console.log(r.data.getFoodKr, d, g, gu);
        setFoodList(d);
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <Wrap>
            <Nav guList={guList} />

            <Routes>
                <Route path='/' element={
                    <All foodList={foodList} />
                }
                />
                <Route path="/list/:id" element={
                    <List foodList={foodList} guList={guList} />
                }
                />

            </Routes>
        </Wrap>
    )
}

export default Main;