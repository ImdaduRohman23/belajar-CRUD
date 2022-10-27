import React from "react";
import { Button } from "react-bootstrap";
import "./list.css";

export default function ListContacts({ contacs, handleEdit, handleDelete }) {
    return (
        <div className="list">
            {
                contacs.map(item => (
                    <div className="listContact" key={item.id}>
                        <div className="listContact__left">
                            <div>
                                <h5>{item.name}</h5>
                                <p>{item.no}</p>
                            </div>
                        </div>
                        <div className="listContact__right">
                            <Button onClick={() => handleEdit(item.id)}>Edit</Button>
                            <Button onClick={() => handleDelete(item.id)} variant="danger">Delete</Button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
