import React from "react";
import { Button } from "react-bootstrap";
import "./list.css";

export default function ListContacts({ contacs }) {
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
                            <Button>edit</Button>
                            <Button variant="danger">hapus</Button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
