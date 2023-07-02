import React from 'react'
import "./Story.scss"

export default function Story() {
    return (
        <div className="storysContainer" id="storysContainer">
            <div className="Story">
                <div className="storyDetail" >
                    <div className="imgStory">
                        <img src="../image/storys/story1.jpg" alt="" />
                    </div>
                    <div className="titleStory">
                        <h3 style={{fontWeight : "600"}}>Who we are ? </h3>
                        <h5>With over 21 years of combined experience in service and hospitality industries, venue coordination, wedding planning, and floral design, our team can offer you a well-designed, well-balanced event. We’re so excited to work closely with you and your vendors to bring your vision to life! We can’t wait to hear all about your plans and wedding dreams.</h5>
                    </div>
                </div>
                <div className="storyDetail">
                    <div  className="titleStory">
                        <h3 style={{fontWeight : "600"}}>Bouquets & Personal Flowers</h3>
                        <h5>Rosie’s is the perfect place to come relax and enjoy the space during evening hours. It's been an integral part of our lives for 16 years,  and we feel truly blessed to have such a relationship with such a little gem of green space. Our new and shiny design studio on Pecan has been our home now for five years.</h5>
                    </div>
                    <div  className="imgStory" style={{paddingLeft:"100px"}}>
                        <img src="../image/storys/story2.jpg" alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}
