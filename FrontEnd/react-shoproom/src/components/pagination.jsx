import React from 'react';
const _ = require('lodash');

const Pagination = ({ items, pageSize, currentPage, handleChange }) => {

    const pagesCount = Math.ceil(items/pageSize);
    const pages = _.range(1, pagesCount + 1);

    return (
        <div className='pages'>
            <ul className="pagination">
                {currentPage > 1 ? <li className="page-item"><a className="page-link" href="#" onClick={() => handleChange(currentPage - 1)}>&laquo;</a></li> : null}
                {pages.map(page => {
                    return <li className="page-item" key={page}><a className={`page-link${currentPage === page ? '-active' : ''}`} href="#" onClick={() => handleChange(page)}>{page}</a></li>
                })}                
                {currentPage < pagesCount ? <li className="page-item"><a className="page-link" href="#" onClick={() => handleChange(currentPage + 1)}>&raquo;</a></li> : null}
            </ul>
        </div>
    )
}

export default Pagination;