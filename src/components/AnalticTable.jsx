import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { getSimplifiedDate } from '../helper/index';

function AnalticTable({ addObj, sortObj }) {
    const [data, setData] = useState([]);
    const [ads, setads] = useState([]);

    // get ads info
    useEffect(() => {
        getData();
        getAds();
    }, []);

    // change table whil matrix col sequence changed
    useEffect(() => {
        changeTable();
    }, [sortObj]);

    // change table
    function changeTable() {
        const TableHeading = document.querySelectorAll('.table-heading');
        const TableRows = document.querySelectorAll('.table-rows');

        let s_index, e_index;

        TableHeading.forEach((heading, idx) => {
            if (heading.firstChild.getAttribute('id') === sortObj.from_col_name) {
                s_index = idx;
            }
            if (heading.firstChild.getAttribute('id') === sortObj.to_col_name) {
                e_index = idx;
            }
        });

        if (s_index != undefined && e_index != undefined) {
            let itemOne = TableHeading[s_index].firstChild;
            let itemTwo = TableHeading[e_index].firstChild;

            let itemRowOne = document.querySelectorAll(`#${sortObj.from_col_name}`);
            let itemRowTwo = document.querySelectorAll(`#${sortObj.to_col_name}`);

            for (let i = 2; i < itemRowTwo.length; i++) {
                let item1 = itemRowOne[i];
                let item2 = itemRowTwo[i];

                let old_td_attr = item2.getAttribute('id');
                let old_textContent = item2.textContent;

                item2.removeAttribute('id');
                item2.setAttribute('id', item1.getAttribute('id'));
                item2.textContent = item1.textContent;

                item1.removeAttribute('id');
                item1.setAttribute('id', old_td_attr);
                item1.textContent = old_textContent;
            }

            TableHeading[s_index].appendChild(itemTwo);
            TableHeading[e_index].appendChild(itemOne);
        }
    }

    // get ads data
    const getData = async () => {
        const { data } = await Axios.get(`https://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03`);
        setData(data.data);
    };

    // get ads
    const getAds = async () => {
        const { data } = await Axios.get(`http://go-dev.greedygame.com/v3/dummy/apps`);
        setads(data.data);
    }

    // get ads name
    const getAdsName = (id) => {
        let name = "";
        ads.forEach(ad => {
            if (ad.app_id === id) {
                name = ad.app_name;
                return name;
            }
        })
        return name;
    }


    // get fill rate
    function getSimpleFillRate(req, res) {
        let val = req / res * 100;
        return val.toFixed(2);
    }

    // get CTR
    function getCTR(clicks, impressions) {
        let val = clicks / impressions * 100
        return val.toFixed(2);
    }


    return (
        <div className="Table-container">
            <table>
                <tr>
                    <th className="table-heading">
                        <div id="date-true">
                            <svg width={20} height={20} fill="#707070" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3.6 3.6a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-.352.848L14.4 13.697V18a1.2 1.2 0 0 1-.352.848l-2.4 2.4A1.2 1.2 0 0 1 9.6 20.4v-6.703L3.952 8.048A1.2 1.2 0 0 1 3.6 7.2V3.6Z" clipRule="evenodd" />
                            </svg>
                            <p className="title">Date</p>
                            <p className="value">7</p>
                        </div>
                    </th>
                    <th className="table-heading">
                        <div id="app-true">
                            <svg width={20} height={20} fill="#707070" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3.6 3.6a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-.352.848L14.4 13.697V18a1.2 1.2 0 0 1-.352.848l-2.4 2.4A1.2 1.2 0 0 1 9.6 20.4v-6.703L3.952 8.048A1.2 1.2 0 0 1 3.6 7.2V3.6Z" clipRule="evenodd" />
                            </svg>
                            <p className="title">App</p>
                            <p className="value">420</p>
                        </div>
                    </th>
                    <th className="table-heading" >
                        <div id="click-true">

                            <svg width={20} height={20} fill="#707070" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3.6 3.6a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-.352.848L14.4 13.697V18a1.2 1.2 0 0 1-.352.848l-2.4 2.4A1.2 1.2 0 0 1 9.6 20.4v-6.703L3.952 8.048A1.2 1.2 0 0 1 3.6 7.2V3.6Z" clipRule="evenodd" />
                            </svg>
                            <p className="title">Clicks</p>
                            <p className="value">2.15M</p>
                        </div>
                    </th>
                    <th className="table-heading" >
                        <div id="ad_request-true">
                            <svg width={20} height={20} fill="#707070" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3.6 3.6a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-.352.848L14.4 13.697V18a1.2 1.2 0 0 1-.352.848l-2.4 2.4A1.2 1.2 0 0 1 9.6 20.4v-6.703L3.952 8.048A1.2 1.2 0 0 1 3.6 7.2V3.6Z" clipRule="evenodd" />
                            </svg>
                            <p className="title">Requests</p>
                            <p className="value">3.5M</p>
                        </div>
                    </th>
                    <th className="table-heading" >
                        <div id="ad_response-true">
                            <svg width={20} height={20} fill="#707070" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3.6 3.6a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-.352.848L14.4 13.697V18a1.2 1.2 0 0 1-.352.848l-2.4 2.4A1.2 1.2 0 0 1 9.6 20.4v-6.703L3.952 8.048A1.2 1.2 0 0 1 3.6 7.2V3.6Z" clipRule="evenodd" />
                            </svg>
                            <p className="title">Response</p>
                            <p className="value">1.4M</p>
                        </div>
                    </th>
                    <th className="table-heading" >
                        <div id="impress-true">
                            <svg width={20} height={20} fill="#707070" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3.6 3.6a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-.352.848L14.4 13.697V18a1.2 1.2 0 0 1-.352.848l-2.4 2.4A1.2 1.2 0 0 1 9.6 20.4v-6.703L3.952 8.048A1.2 1.2 0 0 1 3.6 7.2V3.6Z" clipRule="evenodd" />
                            </svg>
                            <p className="title">impression</p>
                            <p className="value">52K</p>
                        </div>
                    </th>
                    <th className="table-heading">
                        <div id="revenue-true">
                            <svg width={20} height={20} fill="#707070" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3.6 3.6a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-.352.848L14.4 13.697V18a1.2 1.2 0 0 1-.352.848l-2.4 2.4A1.2 1.2 0 0 1 9.6 20.4v-6.703L3.952 8.048A1.2 1.2 0 0 1 3.6 7.2V3.6Z" clipRule="evenodd" />
                            </svg>
                            <p className="title">Revenue</p>
                            <p className="value">$36,513</p>
                        </div>
                    </th>
                    <th className="table-heading" >
                        <div id="fill_rate-true">
                            <svg width={20} height={20} fill="#707070" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3.6 3.6a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-.352.848L14.4 13.697V18a1.2 1.2 0 0 1-.352.848l-2.4 2.4A1.2 1.2 0 0 1 9.6 20.4v-6.703L3.952 8.048A1.2 1.2 0 0 1 3.6 7.2V3.6Z" clipRule="evenodd" />
                            </svg>
                            <p className="title">Fill Rate</p>
                            <p className="value">99.54%</p>
                        </div>
                    </th>
                    <th className="table-heading" >
                        <div id="ctr-true">
                            <svg width={20} height={20} fill="#707070" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3.6 3.6a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-.352.848L14.4 13.697V18a1.2 1.2 0 0 1-.352.848l-2.4 2.4A1.2 1.2 0 0 1 9.6 20.4v-6.703L3.952 8.048A1.2 1.2 0 0 1 3.6 7.2V3.6Z" clipRule="evenodd" />
                            </svg>
                            <p className="title">CTR</p>
                            <p className="value">1.33%</p>
                        </div>
                    </th>
                </tr>
                {
                    data && data.map((d, idx) => {
                        return (
                            <tr key={idx} className="table-rows">
                                <td id="date-true">{getSimplifiedDate(d.date)}</td>
                                <td id="app-true">{getAdsName(d.app_id)}</td>
                                <td id="click-true">{d.clicks}</td>
                                <td id="ad_request-true">{d.requests}</td>
                                <td id="ad_response-true">{d.responses}</td>
                                <td id="impress-true">{d.impressions}</td>
                                <td id="revenue-true">${d.revenue.toFixed(2)}</td>
                                <td id="fill_rate-true">{getSimpleFillRate(d.requests, d.responses)}%</td>
                                <td id="ctr-true">{getCTR(d.clicks, d.impressions)}%</td>
                            </tr>
                        )
                    })
                }

            </table>
        </div>
    )
}

export default AnalticTable;
