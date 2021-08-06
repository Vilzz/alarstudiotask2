export const validate = (phone) => {
  var isphone =
    /^(1\s|1|)?((\(\d{3}\))|\d{3})(-|\s)?(\d{3})(-|\s)?(\d{4})$/.test(phone)
  return isphone
}
