import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200
    };
  }

  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size: size,
      rotate: this.state.rotate ? this.state.rotate : 0
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  imageDelete() {
    console.log('image');
    this.props.deleteImage(this.props.dto);
  }

  rotate() {
    if (!this.state.rotate) this.setState({ rotate: 90 });
    else {
      this.setState({ rotate: (this.state.rotate + 90) % 360 })
    }
    console.log(this.state);
  }

  expand() {
    this.setState({ fullscreen: !this.state.fullscreen });
    console.log(this.state.fullscreen);
  }

  _checkIsFullScreen() {
    return this.state.fullscreen ? 'image-root fullscreen': 'image-root';
  }


  render() {
    return (
      <div
        ref="image"
        className={this._checkIsFullScreen()}
        style={{
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: this.state.size + 'px',
          height: this.state.size + 'px',
          transform: `rotate(${this.state.rotate}deg)`
        }}
      >
        <div>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={this.rotate.bind(this)} />
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={this.imageDelete.bind(this)} />
          <FontAwesome className="image-icon" name="expand" title="expand" onClick={this.expand.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Image;
