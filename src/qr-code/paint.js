import { qrcode } from './qr-code.js';

class QRCodePainter {
  static get inputProperties() {
    return [
      '--qr-link',
      '--qr-level',
      '--qr-mode'
    ];
  }

  paint(ctx, geom, props) {
    const link = props.get('--qr-link').toString() || '';
    const level = props.get('--qr-level').toString().trim() || 'L';
    const mode = parseInt(props.get('--qr-mode').toString(), 10) || 0;
    const qr = qrcode(mode, level);
    qr.addData(link);
    qr.make();

    const cellSize = Math.min(geom.width, geom.height) / qr.getModuleCount();
    qr.renderTo2dContext(ctx, cellSize);
  }
}

registerPaint('qr-code', QRCodePainter);
