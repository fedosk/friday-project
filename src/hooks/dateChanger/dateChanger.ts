export const dateChanger = (date: string) => {
    let changedDate = new Date(Date.parse(date))
    const checkingDate = (d: number) => {
        return d >= 10 ? d : `0${d}`
    }
    let day = checkingDate(changedDate.getDay())
    let month = checkingDate(changedDate.getMonth())
    let year = checkingDate(changedDate.getFullYear())
    let hours = checkingDate(changedDate.getHours())
    let minutes = checkingDate(changedDate.getMinutes())
    return `${day}.${month}.${year} in ${hours}:${minutes}`
}