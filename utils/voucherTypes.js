export const getVoucherTypes = () =>  {
    return {
        "phone": {
            label: translate('vouchers.list.phone_no'),
            value: "phone",

        },
        "room": {
            label: translate('vouchers.list.room_no'),
            value: "room",
        }
    }
}