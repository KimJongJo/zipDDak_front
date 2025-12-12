import { useState } from "react";

export default function useSelectCheckbox() {
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState(new Set());

    // 전체 선택
    const handleAllCheck = (items, checked) => {
        setAllChecked(checked);
        if (checked) {
            setCheckedItems(new Set(items)); // 모든 ID 추가
        } else {
            setCheckedItems(new Set()); // 전체 해제
        }
    };

    // 개별 선택
    const handleItemCheck = (id, isChecked, totalCount) => {
        setCheckedItems((prev) => {
            const set = new Set(prev);
            if (isChecked) set.add(id);
            else set.delete(id);

            // 전체 체크 여부 업데이트
            setAllChecked(set.size === totalCount);

            return set;
        });
    };

    // 선택된 ID 리스트 반환
    const getSelected = () => Array.from(checkedItems);

    // 선택된 항목 필요할 때 (없으면 null)
    const requireSelected = () => {
        if (checkedItems.size === 0) {
            alert("선택된 상품이 없습니다.");
            return null;
        }
        return Array.from(checkedItems);
    };

    //체크박스 초기화
    const resetChecked = () => {
        setAllChecked(false);
        setCheckedItems(new Set());
    };

    return {
        allChecked,
        checkedItems,
        handleAllCheck,
        handleItemCheck,
        getSelected,
        requireSelected,
        resetChecked,
    };
}
