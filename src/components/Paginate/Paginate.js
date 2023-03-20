import { useState, useEffect } from 'react'
import './Paginate.css'

export default function Paginate({pagenatedItems, numPerPage, setDisplayed}) {
    const [selectedPage, setSelectedPage] = useState(1)
    const numOfPages = Math.ceil(pagenatedItems.length / numPerPage)

    let pagesArray = []
    if(numOfPages <= 5) {
        for(let i = 1; i < numOfPages + 1; i++) {
            pagesArray.push(i)
        }
    }
    else if(selectedPage < 4) {
        pagesArray = [1,2,3,4,5]
    }
    else if(selectedPage > numOfPages - 2) {
        for(let i = numOfPages - 4; i < numOfPages + 1; i++) {
            pagesArray.push(i)
        }
    } else {
        for(let i = selectedPage - 2; i < selectedPage + 3; i++) {
            pagesArray.push(i)
        }
    }

    function getPreviousPage() {
        if(selectedPage === 1) {
            return
        }
        const startingIndex = numPerPage * (selectedPage - 2)
        setSelectedPage(prev => prev - 1)
        setDisplayed(pagenatedItems.slice(startingIndex, startingIndex + numPerPage))
        window.scrollTo(0, 0)
    }

    function getNextPage() {
        if(selectedPage === numOfPages) {
            return
        }
        const startingIndex = numPerPage * (selectedPage)
        setSelectedPage(prev => prev + 1)
        setDisplayed(pagenatedItems.slice(startingIndex, startingIndex + numPerPage))
        window.scrollTo(0, 0)
    }

    function getSpecificPage(page) {
        setSelectedPage(page)
        const startingIndex = numPerPage * (page - 1)
        setDisplayed(pagenatedItems.slice(startingIndex, startingIndex + numPerPage))
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        setSelectedPage(1)
    }, [pagenatedItems])

  return (
    <div className='paginate-container'>
        {numOfPages > 5 ? <span onClick={() => getSpecificPage(1)}>first</span> : ''}
        <span onClick={getPreviousPage}>previous</span>
        {pagesArray.map((page, index) => (
            <span 
                className={selectedPage === page ? 'selected-page' : ''} 
                key={index}
                onClick={() => getSpecificPage(page)}
            >
                {page}
            </span>
        ))}
        <span onClick={getNextPage}>next</span>
        {numOfPages > 5 ? <span onClick={() => getSpecificPage(numOfPages)}>last</span> : ''}
    </div>  
  )
}