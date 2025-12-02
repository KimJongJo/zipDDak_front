import { useState } from "react";

// 천단위 콤마
const formatNumber = (num) => {
    if (num === "" || num === null) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 콤마 제거 후 숫자 변환
const toNumber = (v) => Number(v.toString().replace(/,/g, "")) || 0;

// 판매가 -> 할인율 변환
const calcDiscountRate = (price, salePrice) => {
    if (price <= 0 || salePrice <= 0) return "";
    return Math.round((1 - salePrice / price) * 100);
};

// 할인율 -> 판매가 변환
const calcSalePrice = (price, discountRate) => {
    if (price <= 0 || discountRate < 0) return "";
    return Math.round(price * (1 - discountRate / 100));
};

export default function usePriceCalc() {
    const [price, setPrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [discountRate, setDiscountRate] = useState("");

    // 가격 입력
    const handlePrice = (value) => {
        const raw = value.replace(/[^0-9]/g, "");
        const formatted = formatNumber(raw);

        setPrice(formatted);

        const p = toNumber(raw);
        const sp = toNumber(salePrice);
        const discount = calcDiscountRate(p, sp);

        setDiscountRate(discount !== "" ? discount : "");
    };

    // 판매가 입력
    const handleSalePrice = (value) => {
        const raw = value.replace(/[^0-9]/g, "");
        const formatted = formatNumber(raw);

        setSalePrice(formatted);

        const p = toNumber(price);
        const sp = toNumber(raw);
        const discount = calcDiscountRate(p, sp);

        setDiscountRate(discount !== "" ? discount : "");
    };

    // 할인율 입력
    const handleDiscountRate = (value) => {
        const raw = value.replace(/[^0-9]/g, "");
        setDiscountRate(raw);

        const p = toNumber(price);
        const d = toNumber(raw);

        const sp = calcSalePrice(p, d);
        setSalePrice(sp !== "" ? formatNumber(sp) : "");
    };

    return {
        price,
        salePrice,
        discountRate,
        handlePrice,
        handleSalePrice,
        handleDiscountRate,
    };
}
