import React from 'react';
import './index.css';
import dollar_sign from '../../../assets/images/dollar_sign.png';

const PriceLevel = ({value}) => {

  if (value === null) {
    return (<div></div>)
  }

  const colors = ['#c4ffcf', '#91d89e', '#61bf72', '#3a914a']

  const styles = colors.map(
    (c, i) => value >= i + 1
    ? {
      'backgroundColor': c
    }
    : {
      'border': '1px solid gray',
      'opacity': 0.42,
      'backgroundColor': '#ddd'
    })

  return (<div className="info-element">
    <img src={dollar_sign} alt="icon"/>
    <div className="price-tag">
      {styles.map((style, i) => (<div key={i} className="levels" style={style}></div>))}
    </div>
  </div>)
}

export default PriceLevel
