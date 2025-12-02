import { Header1 } from "../component/Header"
import { Button } from 'reactstrap'
import { ArrowRight } from 'lucide-react'
import {Product} from '../component/Product'

export default function Best() {
    return (
        <>
            <div className='Main-container'>
                <Header1 />

                <div className='card-box'>
                    <div className='top'>
                        <div className='title-box'>
                            <div className='title-main'>
                                <span>자재 베스트</span>
                                <span className="s-count">100</span>
                            </div>
                            <div className='more'>
                                <Button>
                                    <div className="moreBtn">
                                    <span>마켓 둘러보기</span>
                                    <ArrowRight size={15}/>
                                    </div>   
                                </Button>
                            </div>
                        </div>

                    </div>

                    <div className='Best-cards'>
                        <Product />
                        <Product />
                        <Product />
                    </div>

                    <div className='cards'>
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                    </div>
                </div>
            </div>
        </>
    )
}