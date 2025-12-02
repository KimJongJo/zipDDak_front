export default function StatCard() {
    return (
        <>
            <div className="stat_card">
                <div className="card_main">
                    <div className="stat_change">
                        <i className="bi bi-three-dots"></i>
                    </div>

                    <div className="card_body">
                        <div className="icon_part">
                            <img src="/orderBasket_icon.svg" />
                        </div>
                        <div>
                            <div className="card_title">
                                <span>오늘 주문건</span>
                            </div>
                            <div className="card_count">
                                <span>80</span>건
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card_footer">
                    <span>어제보다</span>
                    <span>+ 11</span>건<span> &nbsp; ( 6.8% ↑)</span>
                </div>
            </div>
        </>
    );
}
