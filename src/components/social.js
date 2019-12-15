import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import facebook from '../assets/facebook.svg';
import github from '../assets/github.svg';
import twitter from '../assets/twitter.svg';

const styles = StyleSheet.create({
  icon: {
    opacity: 0.7,
    marginRight: 10,
    transition: 'all 250ms ease-in-out',
    cursor: 'pointer',
    ':hover': {
      opacity: 1
    }
  }
})

function Icon({ src, url, alt }) {
  return (
    <a href={url} className={css(styles.icon)} target="_blank">
      <img src={src} alt={alt} />
    </a>
  )
}


export default () => (
  <div>
    <Icon
      src={facebook}
      url='https://www.facebook.com/joey.jiron'
    />
    <Icon
      src={github}
      url='https://github.com/joeyjiron06/clock-timer'
    />
    <Icon
      src={twitter}
      url='https://twitter.com/joeyjiron06'
    />
  </div>
)