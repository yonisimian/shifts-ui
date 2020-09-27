import React, {useState} from 'react';
import Pagination from 'react-bootstrap/Pagination'

function App(props) {
    const {shifts, shiftsPerPage, curPage, setCurPage} = props
    const maxPage = Math.max(0, Math.floor((shifts.length - 1) / shiftsPerPage))
    
    const pagesPerSection = 12
    const [curSection, setCurSection] = useState(0)

    return (
        <Pagination dir="ltr">
            <Pagination.First onClick={() => setCurPage(0)} />
            <Pagination.Prev onClick={() => setCurPage(Math.max(curPage - 1, 0))} />
            {shifts.filter((shift, shiftID) => shiftID % shiftsPerPage == 0)
                    //.filter((shift, page) => page < pagesPerSection * (curSection + 1) && page >= pagesPerSection * curSection)
                    .map((shift, index) =>
                <Pagination.Item
                    key={index}
                    active={(index) === curPage}
                    onClick={() => setCurPage(index)}>
                        {index + 1}
                </Pagination.Item>
            )}
            {false &&
                <>
                    <Pagination.Ellipsis />
                    <Pagination.Item
                        key={maxPage}
                        active={(maxPage) === curPage}
                        onClick={() => setCurPage(maxPage)}>
                            {maxPage + 1}
                    </Pagination.Item>
                </>
            }
            <Pagination.Next onClick={() => setCurPage(Math.min(curPage+1, maxPage))} />
            <Pagination.Last onClick={() => setCurPage(maxPage)} />
        </Pagination>
    );
}

export default App;
