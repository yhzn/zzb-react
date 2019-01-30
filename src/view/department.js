import React, { Component } from 'react';
import {Header} from '../component/header'
import Swiper from 'swiper'
import treatment from '../image/treatment-banner.gif'
import visit from '../image/visit-banner.gif'
import patientJpg from '../image/patient-banner.gif'
import operation from '../image/operation-banner.png'
import sick from '../image/sick-banner.gif'
import summary from '../image/summary-banner.gif'
import examinationBanner from '../image/examination-banner.png'
import examinationIcon from '../image/examination-icon.png'
import tBanner from '../image/treatment-banner.png'
import tIcon from '../image/treatment-icon.png'
import treatmentIcon from '../image/treatment-icon.gif'
import visitIcon from '../image/visit-icon.gif'
import patientIcon from '../image/patient-icon.gif'
import operationIcon from '../image/operation-icon.gif'
import sickIcon from '../image/sick-icon.gif'
import summaryIcon from '../image/summary-icon.gif'
import {transferData} from "../tools/transfer";
import {baseUrl} from "../tools/environment";

import {Loading,MessageBox} from 'element-react'

export class Department extends Component {
    constructor (props) {
        super(props);
        this.state={
            date:null,
            emergencyTreatment:{},
            outpatient:{},
            inHospital:{},
            selectionDate:{},
            examination:{},
            emTreatment:{},
            surgerySummary:{},
            patient:{},
            loading:true,

        }
    }
    componentDidMount () {
        fetch(`${baseUrl}home/sysj?time=${this.props.match.params.date}`,{
            method:"get",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",

            }
        })
            .then((response) => {
                this.setState({loading:false});
                if(response.status===200){
                    return response.json()
                }else{
                    MessageBox.alert("数据加载异常");
                }
            })
            .then((data)=>{
                this.setState({
                    date:data.date,
                    emergencyTreatment:data.emergencyTreatment,
                    outpatient:data.outpatient,
                    inHospital:data.inHospital,
                    selectionDate:data.selectionDate,
                    examination:data.examination,
                    emTreatment:data.emTreatment,
                    surgerySummary:data.surgerySummary,
                    patient:data.patient,
                })
                new Swiper(this.refs.swiperContainer, {
                    autoplay: false,//可选选项，自动滑动
                    loop:true,
                    initialSlide: transferData.swiper.page,
                })
            })
            .catch(()=>{
                this.setState({loading:false});
                MessageBox.alert("数据加载失败");
            })
    }
    render () {
        const {date,emergencyTreatment,outpatient,inHospital,selectionDate,examination,emTreatment,surgerySummary,patient,loading} = this.state;
        return (
            <section className="department">
                <Header title="数据模块"/>
                <section className="container" ref="swiperContainer">
                        <section className="swiper-wrapper">
                            <section className="swiper-slide">
                                <section>
                                    <img src={treatment} alt=""/>
                                </section>
                                <section>
                                    <p>{date}</p>
                                     <dl>
                                         <dt>
                                             <img src={treatmentIcon} alt=""/>
                                         </dt>
                                         <dd>
                                             <strong>{emergencyTreatment.total}({emergencyTreatment.paediatricsTotal})</strong><span>全院人次（儿科）</span>
                                         </dd>
                                     </dl>
                                    <ul className="cleanfix">
                                        <li>
                                            <p><strong>{emergencyTreatment.HQ}</strong></p>
                                            <p><strong>({emergencyTreatment.HQPaediatrics})</strong></p>
                                            <p>总院（儿科）</p>
                                        </li>
                                        <li>
                                            <p><strong>{emergencyTreatment.NY}</strong></p>
                                            <p><strong>({emergencyTreatment.NYPaediatrics})</strong></p>
                                            <p>南院（儿科）</p>
                                        </li>
                                        <li>
                                            <p><strong>{emergencyTreatment.JA}</strong></p>
                                            <p><strong>({emergencyTreatment.JAPaediatrics})</strong></p>
                                            <p>吉安（儿科）</p>
                                        </li>

                                    </ul>
                                </section>
                            </section>
                            <section className="swiper-slide">
                                <section>
                                    <img src={visit} alt=""/>
                                </section>
                                <section>
                                    <p>{date}</p>
                                    <dl>
                                        <dt>
                                            <img src={visitIcon} alt=""/>
                                        </dt>
                                        <dd>
                                            <strong>{outpatient.total}({outpatient.paediatricsTotal})</strong><span>全院人次（儿科）</span>
                                        </dd>
                                    </dl>
                                    <ul className="cleanfix">
                                        <li>
                                            <p><strong>{outpatient.HQ}</strong></p>
                                            <p><strong>({outpatient.HQPaediatrics})</strong></p>
                                            <p>总院（儿科）</p>
                                        </li>
                                        <li>
                                            <p><strong>{outpatient.NY}</strong></p>
                                            <p><strong>({outpatient.NYPaediatrics})</strong></p>
                                            <p>南院（儿科）</p>
                                        </li>
                                        <li>
                                            <p><strong>{outpatient.JA}</strong></p>
                                            <p><strong>({outpatient.JAPaediatrics})</strong></p>
                                            <p>吉安（儿科）</p>
                                        </li>

                                    </ul>
                                </section>

                            </section>
                            <section className="swiper-slide">
                                <section>
                                    <img src={patientJpg} alt=""/>
                                </section>
                                <section>
                                    <p>{date}</p>
                                    <dl>
                                        <dt>
                                            <img src={patientIcon} alt=""/>
                                        </dt>
                                        <dd>
                                            <strong>{inHospital.total}</strong><span>全院人数</span>
                                        </dd>
                                    </dl>
                                    <ul className="cleanfix">
                                        <li>
                                            <p><strong>{inHospital.HQ}</strong></p>
                                            <p>总院人数</p>
                                        </li>
                                        <li>
                                            <p><strong>{inHospital.NY}</strong></p>
                                            <p>南院人数</p>
                                        </li>
                                        <li>
                                            <p><strong>{inHospital.JA}</strong></p>
                                            <p>吉安人数</p>
                                        </li>

                                    </ul>
                                </section>

                            </section>
                            <section className="swiper-slide">
                                <section>
                                    <img src={examinationBanner} alt=""/>
                                </section>
                                <section>
                                    <p>{date}</p>
                                    <dl>
                                        <dt>
                                            <img src={examinationIcon} alt=""/>
                                        </dt>
                                        <dd>
                                            <strong>{examination.total}</strong><span>全院人数</span>
                                        </dd>
                                    </dl>
                                    <ul className="cleanfix">
                                        <li>
                                            <p><strong>{examination.HQ}</strong></p>
                                            <p>总院人数</p>
                                        </li>
                                        <li>
                                            <p><strong>{examination.NY}</strong></p>
                                            <p>南院人数</p>
                                        </li>
                                        <li>
                                            <p><strong>{examination.JA}</strong></p>
                                            <p>吉安人数</p>
                                        </li>

                                    </ul>
                                </section>

                            </section>
                            <section className="swiper-slide">
                                <section>
                                    <img src={operation} alt=""/>
                                </section>
                                <section>
                                    <p>{date}</p>
                                    <dl>
                                        <dt>
                                            <img src={operationIcon} alt=""/>
                                        </dt>
                                        <dd>
                                            <strong>{selectionDate.total}</strong><span>全院人数</span>
                                        </dd>
                                    </dl>
                                    <ul className="cleanfix">
                                        <li>
                                            <p><strong>{selectionDate.HQ}</strong></p>
                                            <p>总院人数</p>
                                        </li>
                                        <li>
                                            <p><strong>{selectionDate.NY}</strong></p>
                                            <p>南院人数</p>
                                        </li>
                                        <li>
                                            <p><strong>{selectionDate.JA}</strong></p>
                                            <p>吉安人数</p>
                                        </li>

                                    </ul>
                                </section>

                            </section>
                            <section className="swiper-slide">
                                <section>
                                    <img src={tBanner} alt=""/>
                                </section>
                                <section>
                                    <p>{date}</p>
                                    <dl>
                                        <dt>
                                            <img src={tIcon} alt=""/>
                                        </dt>
                                        <dd>
                                            <strong>{emTreatment.total}</strong><span>全院人数</span>
                                        </dd>
                                    </dl>
                                    <ul className="cleanfix">
                                        <li>
                                            <p><strong>{emTreatment.HQ}</strong></p>
                                            <p>总院人数</p>
                                        </li>
                                        <li>
                                            <p><strong>{emTreatment.NY}</strong></p>
                                            <p>南院人数</p>
                                        </li>
                                        <li>
                                            <p><strong>{emTreatment.JA}</strong></p>
                                            <p>吉安人数</p>
                                        </li>

                                    </ul>
                                </section>

                            </section>
                            <section className="swiper-slide">
                                <section>
                                    <img src={sick} alt=""/>
                                </section>
                                <section>
                                    <p>{date}</p>
                                    <dl>
                                        <dt>
                                            <img src={sickIcon} alt=""/>
                                        </dt>
                                        <dd>
                                            <strong>{patient.total}</strong><span>全院人数</span>
                                        </dd>
                                    </dl>
                                    <ul className="cleanfix">
                                        <li>
                                            <p><strong>{patient.HQ}</strong></p>
                                            <p>总院人数</p>
                                        </li>
                                        <li>
                                            <p><strong>{patient.NY}</strong></p>
                                            <p>南院人数</p>
                                        </li>
                                        <li>
                                            <p><strong>{patient.JA}</strong></p>
                                            <p>吉安人数</p>
                                        </li>

                                    </ul>
                                </section>

                            </section>
                            <section className="swiper-slide">
                                <section>
                                    <img src={summary} alt=""/>
                                </section>
                                <section>
                                    <p>{date}</p>
                                    <dl>
                                        <dt>
                                            <img src={summaryIcon} alt=""/>
                                        </dt>
                                        <dd>
                                            <strong>{surgerySummary.total}</strong><span>全院人数</span>
                                        </dd>
                                    </dl>
                                    <ul className="cleanfix">
                                        <li>
                                            <p><strong>{surgerySummary.HQ}</strong></p>
                                            <p>总院人数</p>
                                        </li>
                                        <li>
                                            <p><strong>{surgerySummary.NY}</strong></p>
                                            <p>南院人数</p>
                                        </li>
                                        <li>
                                            <p><strong>{surgerySummary.JA}</strong></p>
                                            <p>吉安人数</p>
                                        </li>
                                    </ul>
                                </section>
                            </section>

                        </section>
                </section>
                {
                    loading && <Loading text="数据加载中" loading={true} fullscreen={true}/>
                }
            </section>
        )
    }
}