import React from 'react'

function Post({postPerPage,totalPost,paginate}) {

    const pageNumbers =[];
    for(let i =1;i<=Math.ceil(totalPost/postPerPage);i++){
        pageNumbers.push(i);
    }

  return (
    <div>
     <nav aria-label="Page navigation example">
       <div className="pagination">
           {
            pageNumbers.map((pageNumb)=>{
                return(
                    <div key={pageNumb} className="page-item">

                        <button onClick={()=>paginate(pageNumb)}  className="page-btn">
                            {pageNumb}

                        </button>

                        </div>
                )
            })

           }
           {/* <button onClick={()=>paginate(c=>c+1?(c<=Math.ceil(totalPost/postPerPage)):(c=>1))}>&#62;</button> */}

       </div>



        </nav>
    </div>
  )
}

export default Post