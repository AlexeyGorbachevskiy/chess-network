import React, {useState} from 'react';
import obj from './Paginator.module.css';


type PaginatorPropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    totalUsersCount: number
    portionSize: number
}

function Paginator(props: PaginatorPropsType) {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize);
    // for next/prev buttons disabling
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;

    return (
        <>
            {
                portionNumber > 1
                &&
                <button className={obj.back_btn}
                        onClick={() => setPortionNumber(portionNumber - 1)}
                >
                    <i className="fa fa-angle-double-left" aria-hidden="true"/>
                    &nbsp; Back
                </button>
            }

            <span className={obj.pages_wrapper}>
            {
                pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((pageNumber: number) => {
                            return (
                                <span
                                    className={props.currentPage === pageNumber ? `${obj.page} ${obj.current_page_is_active}` : obj.page}
                                    key={pageNumber} onClick={() => props.onPageChanged(pageNumber)}
                                >
                                    {pageNumber}
                                </span>
                            )
                        }
                    )
            }
            </span>

            {
                portionCount > portionNumber
                &&
                <button className={obj.next_btn}
                        onClick={() => setPortionNumber(portionNumber + 1)}
                > Next &nbsp;
                    <i className="fa fa-angle-double-right" aria-hidden="true"/>
                </button>
            }
        </>

    )
}


export default Paginator;