import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BBOX = styled.strong`
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
`;

const BOX = styled.div`
margin: 0 0 20px 0;
`

const All = ({ foodList }) => {

    const { kakao } = window;

    const KakaoMapScript = () => {
        var mapContainer = document.getElementById('Map'), // 지도를 표시할 div  
            mapOption = {
                center: new kakao.maps.LatLng(foodList[0]?.LAT, foodList[0]?.LNG), // 지도의 중심좌표
                level: 8 // 지도의 확대 레벨
            };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 마커를 표시할 위치와 title 객체 배열입니다 
        // var positions = [
        //     {
        //         title: '카카오',
        //         latlng: new kakao.maps.LatLng(33.450705, 126.570677)
        //     },
        // ];

        var positions = foodList?.map(it => {
            return {
                title: it.MAIN_TITLE,
                latlng: new kakao.maps.LatLng(it.LAT, it.LNG),
            }

        })

        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (var i = 0; i < positions.length; i++) {

            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage // 마커 이미지 
            });
        }
    }


    useEffect(() => {
        foodList && KakaoMapScript();
    }, [foodList]);



    return (
        <>
            <div id="Map" style={{
                height: '520px',
                marginBottom: '50px'
            }}>

            </div>
            <UL>
                {
                    foodList.map((it, idx) => {
                        return (
                            <li key={idx}>
                                <Link to={`/store/${it.UC_SEQ}`}>
                                    <figure>
                                        <BOX><img src={it.MAIN_IMG_NORMAL} alt="" /></BOX>
                                    </figure>
                                    <BBOX>{it.TITLE}</BBOX>
                                    <BOX>{it.GUGUN_NM}</BOX>
                                    <PBOX>{it.ITEMCNTNTS}</PBOX>
                                    <BOX>{it.USAGE_DAY_WEEK_AND_TIME}</BOX>
                                </Link>
                            </li>
                        )
                    })
                }
            </UL>

        </>

    )
}

export default All;