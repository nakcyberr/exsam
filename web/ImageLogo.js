import React from 'react';
import logo from './logo.svg';

import './styles/index.scss'

const styles = {
    height: '130px'
};

class ImageLogo extends React.Component {
    
    render() {
        const { isSpiner } = this.props
        return <img style={styles} className={isSpiner ? 'logo-spin':''} src={logo} alt="MyLogo"  />
    }
}

ImageLogo.defaultProps = {
    isSpiner: false,
}

export default ImageLogo;
