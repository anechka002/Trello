type PaginationType = {
  pagesCount: number;
  page: number;
  onPageSelect: (pageNumber: number) => void;
}

export function Pagination({pagesCount, page, onPageSelect}: PaginationType) {

  return (
    <div style={{margin: '10px'}}>
      {[...Array(pagesCount)].map((_, index) => {
        return (
          <button
            key={index}
            style={{
              cursor: 'pointer',
              border: page === index + 1 ? '1px solid red' : 'none',
              margin: '0 5px',
            }}
            onClick={() => {
              if (page !== index + 1) {
                onPageSelect(index + 1);
              }
            }}
          >{index + 1}
          </button>
        )
      })}
    </div>
  )
}