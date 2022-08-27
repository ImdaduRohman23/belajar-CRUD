import React from "react";


export default function ListContacts({data, handleDel, handleEdit}) {
    // console.log(data)

    return (
        <div className="list-group">
            {data.map((con) => (
                <div className="list-group-item list-group-item-action" >
                    <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{con.name}</h5>
                    <div>
                        <button
                        className="btn btn-sm btn-link"
                        onClick={() => handleEdit(con.id)}>
                        Edit
                        </button>
                        <button
                        className="btn btn-sm btn-link"
                        onClick={() => handleDel(con.id)}>
                        Del
                        </button>
                    </div>
                    </div>
                    <p className="mb-1">{con.telp}</p>
                </div>
            ))}

            
        </div>
    );
}
