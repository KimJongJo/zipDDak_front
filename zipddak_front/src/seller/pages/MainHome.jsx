import "../css/mainHome.css";
import usePageTitle from "../js/usePageTitle.jsx";

import { FormGroup, Input, Label } from "reactstrap";
import Tippy from "@tippyjs/react";

import StatCard from "../component/StatCard.jsx";
import StatCard2 from "../component/StatCard2.jsx";
import BarChart from "../component/BarChart.jsx";
import LineChart from "../component/LineChart.jsx";
import DonutChart from "../component/DonutChart.jsx";

export default function MainHome() {
    const pageTitle = usePageTitle("Home");

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main>
                <div className="main_column1">
                    <StatCard />
                    <StatCard />
                    <StatCard />
                    <StatCard />
                </div>

                <div className="main_column2">
                    <StatCard2 />
                </div>

                <div className="main_column3">
                    <div className="more_stats">
                        <span className="pointer"> 통계 더보기 →</span>
                    </div>
                    <div className="graph_body">
                        <div className="cumulative_statistics">
                            <div>
                                <p className="graph_title">올해 카테고리별 누적 판매 통계</p>
                                <div className="graph_change ">
                                    <FormGroup check inline>
                                        <Label check style={{ display: "flex", alignItems: "flex-start" }}>
                                            <Input type="radio" name="radio2" />
                                            판매 수량
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Label check style={{ display: "flex", alignItems: "flex-start" }}>
                                            <Input type="radio" name="radio2" />
                                            매출액
                                        </Label>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="graph">
                                <BarChart />
                                {/* <LineChart /> */}
                            </div>
                        </div>

                        <div className="etc_statistics">
                            <p className="graph_title">카테고리별 매출 비중</p>
                            <div className="graph">
                                <DonutChart />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
