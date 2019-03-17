import React, { Component } from 'react';
import githubLogo from './GitHub-Mark-32px.png'

class Footer extends Component {
    state = { showCredits: false }
    render() {
        let showCredits = this.state.showCredits
        return (
            <div style={{ textAlign: "center" }}>
                <br /><br /><br /><hr /><br /><br />

                <a href="https://github.com/kitti-katy/radix-visualization-tool" target="_blank" > <img src={githubLogo} /><br />
                    kitti-katy</a>
                <br /><br />
                {!showCredits && <a style={{ color: 'blue', cursor: 'pointer' }} onClick={() => this.setState({ showCredits: !showCredits })}> <u>Credits</u> </a>}
                {showCredits &&
                    <div >Main Icon made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"
                        title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0"
                            target="_blank">CC 3.0 BY</a>
                    </div>
                }
            </div>
        );
    }
}

export default Footer;


