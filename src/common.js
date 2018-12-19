export function isPhoneAvailable(phone) {
    var test = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    if (test.test(phone)) {
        return true
    } else {
        return false
    }
}

export function isEmailAvailable(email) {
    var test = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if (test.test(email)) {
        return true
    } else {
        return false
    }
}