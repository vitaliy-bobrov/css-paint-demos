import { qr } from './wasm_qr.js';

class QRCodePainter {
  static get inputProperties() {
    return [
      '--qr-link',
    ];
  }

  paint(ctx, geom, props) {
    const link = props.get('--qr-link').toString() || '';
    const qrStr = qr(link);

    console.log(qrStr);
  }
}

registerPaint('qr-code', QRCodePainter);
