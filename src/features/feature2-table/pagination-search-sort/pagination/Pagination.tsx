import React from 'react'
import { useDispatch } from 'react-redux'
import s from './Pagination.module.css'

    //При запросе колоды мы получаем
    const cardsCount = 25 // количество карт useSelector<AppStoreType, number[]>(state => state.some.cardsCount)
    const cardPacksTotalCount = 14 //количество колод
    const maxCardsCount = 4
    const minCardsCount = 0
    const page = 1 //выбранная страница useSelector<AppStoreType, number>(state => state.some.page)
    const pageCount = 4 //количество элементов на странице useSelector<AppStoreType, number[]>(state => state.some.pageCount)


export const Pagination = () => {
    const cardPacksTotalCount = 14
    const cardsTotalCount = 3
    const pageCount = 4
    const page = 1

    let totalCount = cardPacksTotalCount | cardsTotalCount
    const pagesCount = Math.ceil(totalCount / pageCount)
    const pages: number[] = []
    makePages(pages, pagesCount, page)

    function makePages(pages: number[], pagesCount: number, page: number) {
        if(pagesCount > 10) {
            if(page > 5) {
                for (let i = page-4; i <= page+5; i++) {
                    pages.push(i)
                    if(i == pagesCount) break
                }
            }
            else {
                for (let i = 1; i <= 10; i++) {
                    pages.push(i)
                    if(i == pagesCount) break
                }
            }
        }  else {
            for (let i = 1; i <= pagesCount; i++) {
                pages.push(i)
            }
        }
    }

    const dispatch = useDispatch()
    const setPage = (value: number) => {
        //@ts-ignore
        dispatch(setPageAC(value)) // нужно делать action creator
    }

    return (
        <div>
            <div className={s.pages}>
                {pages.map((el, index) =>
                    <span
                        key={index}
                        className={page === el ? s.currentPage : s.page}
                        onClick={() => setPage(el)}
                    >
                        {el}
                        </span>)}
            </div>
        </div>
    )
}
