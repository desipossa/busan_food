import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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

const Store = ({ foodList }) => {
    const { id } = useParams();
    //일치하는 상점을 구함
    const r = foodList.find(it => it.UC_SEQ == id);
    const [store, getStore] = useState({});
    useEffect(() => {
        getStore(r)
    }, [r]);

    const { kakao } = window;

    const KakaoMapScript = () => {
        const container = document.getElementById('Map');
        const options = {
            center: new kakao.maps.LatLng(store.LAT, store.LNG),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);

        // 마커가 표시될 위치입니다 
        const markerPosition = new kakao.maps.LatLng(store.LAT, store.LNG);

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

    }


    useEffect(() => {
        store && KakaoMapScript();
    }, [store])


    console.log(store)
    return (

        <>{
            store && <>
                <figure>
                    <BOX><img src={store.MAIN_IMG_NORMAL} alt="" /></BOX>
                </figure>
                <BBOX>{store.TITLE}</BBOX>
                <BOX>{store.GUGUN_NM}</BOX>
                <PBOX>{store.ITEMCNTNTS}</PBOX>
                <div id="Map" style={{
                    height: '500px',
                    background: 'tomato'
                }}>

                </div>
                <BOX>{store.USAGE_DAY_WEEK_AND_TIME}</BOX>
            </>
        }
        </>


    )
}

export default Store