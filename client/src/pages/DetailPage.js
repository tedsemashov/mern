import React, {useCallback, useContext, useEffect, useState} from "react";
import { useHttp } from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";

export const DetailPage = () => {
    const { token, userId } = useContext(AuthContext)
    const { request, loading } = useHttp();
    const [detail, setDetail ] = useState(null);

    const getDetail = useCallback(async () => {
        try {
            const fetched = await request('/api/detail', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setDetail(fetched);
        } catch (e) {

        }
    }, [token, request]);

    debugger;
    const currentDetail = detail && detail.find(item =>
        item.owner === userId
    );

    useEffect(() => {
        getDetail() ;
    }, [getDetail])

    if(loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && detail && (
                <>
                    <h2>Details</h2>
                    <p>Name: {currentDetail.name}</p>
                    <p>Surname: {currentDetail.surname}</p>
                    <p>Date: {currentDetail.date} </p>
                </>
            )}

        </>
    )
}
