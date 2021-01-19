import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Icon, Col, Card, Row, } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0); // db에서 몇번째 부터 가져올지 설정
    const [Limit, setLimit] = useState(8); // db에서 가져올 데이터 제한 수
    // 가져온 포스트 수가 limit보다 작은 경우(더 가져올 자료가 없다)에
    // 더보기를 안보이게 조건을 건다
    const [PostSize, setPostSize] = useState(0);

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body);
    }, []);

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    // 더보기를 눌렀을 때 조건
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo]);
                    } else {
                        setProducts(response.data.productInfo);
                    }
                    // 가져온 포스트 개수
                    setPostSize(response.data.postSize);
                } else {
                    alert('상품들을 가져오는데 실패했습니다.');
                }
            });
    }

    const loadMoreHandler = () => {

        let skip = Skip + Limit; // 더보기를 눌렀을 때, skip 값 변경(처음 값 + limit값)

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body);
        setSkip(skip);
    }

    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<ImageSlider images={product.images} />}>
                <Meta
                    title={product.title}
                    description={`${product.price}`}
                />
            </Card>
        </Col>

    });



    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type="roket" /></h2>
            </div>

            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>
            <br />


            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }



        </div>
    )
}

export default LandingPage
