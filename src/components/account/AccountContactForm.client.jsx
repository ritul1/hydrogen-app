import React, { useState } from "react";



export function AccountContactForm() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    async function btnSubmit() {
        const accountContact = await callContactApi({
            name,
            email,
            message
        })
        if (accountContact.error) {
            console.log(accountContact.error)
            return;
        }

    }

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"></link>
            <section className="contact_us">
                <div className="container" style={{ marginLeft: "400px" }}>
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="contact_inner">
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="contact_form_inner">
                                            <div className="contact_field">
                                                <h3>Contatc Us</h3>
                                                <p>Feel Free to contact us any time. We will get back to you as soon as we can!.</p>
                                                <input type="text" className="form-control form-group" placeholder="Name" value={name} onChange={(event) => {setName(event.target.value) }} />
                                                <input type="text" className="form-control form-group" placeholder="Email" value={email} onChange={(event) => {setEmail(event.target.value) }} />
                                                <textarea className="form-control form-group" placeholder="Message" value={message} onChange={(event) => {setMessage(event.target.value) }}></textarea>
                                                <button className="contact_form_submit" onClick={btnSubmit}>Send</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="right_conatct_social_icon d-flex align-items-end">
                                            <div className="socil_item_inner d-flex">
                                                <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
                                                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="contact_info_sec">
                                    <h4>Contact Info</h4>
                                    <div className="d-flex info_single align-items-center">
                                        <i className="fas fa-headset"></i>
                                        <span>+911724102617</span>
                                    </div>
                                    <div className="d-flex info_single align-items-center">
                                        <i className="fas fa-envelope-open-text"></i>
                                        <span>sunil@aronwebsolutions.com</span>
                                    </div>
                                    <div className="d-flex info_single align-items-center">
                                        <i class="fas fa-map-marked-alt"></i>
                                        <span>1000+ Travel partners and 65+ Service city across India, USA, Canada & UAE</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="map_sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="map_inner">
                                <h4>Find Us on Google Map</h4>
                                <div className="map" style={{ marginLeft: "192px" }}>
                                    <iframe style={{width:"531px",height:"200px"}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.2528133920396!2d76.68870901546202!3d30.711292393716008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee5655555555%3A0x126706be8e96bfa4!2sAron%20Web%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1665488206682!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export async function callContactApi({
    name,
    email,
    message
}) {
    try {
        const res = await fetch(`/account/contact`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, message }),
        });

        if (res.status === 200) {
            console.log(res.status)
            return {};
        } else {
            console.log('res.json', res.json)
            return res.json();

        }
    } catch (error) {
        return {
            error: error.toString(),
        };
    }
}