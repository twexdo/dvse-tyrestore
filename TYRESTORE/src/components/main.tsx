import * as React from "react"

import "./main.scss"


class Main extends React.Component {

    render() {
        return (
            <div id="first-div">
                <div id="second-div">

                    <div className="wrapper">
                        <div className="container">

                            <header>
                                <div id="logo"></div>
                                <h3>Tirestore -by Stef Vasile Adrian</h3>
                                <div id="cart"><span id="products">0</span></div>
                            </header>

                            <main>
                                <section className="vehicles">
                                    <h4 className="vehicles-title"><span className="vehicle-icon"></span>Vehicles</h4>
                                    <div className="table" id="vehicle">
                                    <div className="row">
                                        <div>Manufacturer</div>
                                        <div>Model</div>
                                        <div>Year</div>
                                        <div>Color</div>
                                        <div>&nbsp;</div>
                                    </div>
                                    <div className="row">
                                        <div>bmw</div>
                                        <div>2</div>
                                        <div>1992</div>
                                        <div>Red</div>
                                        <div><button>Select</button></div>
                                    </div>
                                    <div className="row">
                                        <div>audi</div>
                                        <div>3</div>
                                        <div>2000</div>
                                        <div>Black</div>
                                        <div><button>Select</button></div>
                                    </div>
                                    </div>
                                </section>
                                <section className="tire">
                                    <h4 className="tire-title"><span className="tire-icon"></span>Vehicles</h4>
                                    <div className="table" id="tire">
                                    <div className="row">
                                        <div>Manufacturer</div>
                                        <div>Model</div>
                                        <div>Year</div>
                                        <div>Color</div>
                                        <div>&nbsp;</div>
                                    </div>
                                    <div className="row">
                                        <div>bmw</div>
                                        <div>2</div>
                                        <div>1992</div>
                                        <div>Red</div>
                                        <div><button>Select</button></div>
                                    </div>
                                    <div className="row">
                                        <div>audi</div>
                                        <div>3</div>
                                        <div>2000</div>
                                        <div>Black</div>
                                        <div><button>Select</button></div>
                                    </div>
                                    </div>
                                </section>
                               
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Main