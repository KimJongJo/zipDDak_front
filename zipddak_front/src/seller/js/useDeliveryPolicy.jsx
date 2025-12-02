import { useCallback } from "react";

export const useDeliveryPolicy = (watch, setValue) => {
    const selected = watch("shippingMethod"); // { delivery: boolean, pickup: boolean }

    const toggleDelivery = useCallback(() => {
        setValue("shippingMethod.delivery", !selected.delivery);
    }, [selected, setValue]);

    const togglePickup = useCallback(() => {
        setValue("shippingMethod.pickup", !selected.pickup);
    }, [selected, setValue]);

    return {
        selected,
        toggleDelivery,
        togglePickup,
    };
};
