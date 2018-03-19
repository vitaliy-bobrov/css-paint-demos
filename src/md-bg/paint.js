class MaterialBackgroundPaint {
  paint(ctx, geom) {
    ctx.fillStyle = '#2f2f2f';
    ctx.fillRect(0, 0, geom.width, geom.height);

    ctx.translate(-geom.width * 0.2, geom.height / 2);
    ctx.rotate(-45 * Math.PI / 180);
    ctx.restore();
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 10;
    ctx.fillRect(0, geom.height * 0.3, geom.width, geom.height * 1.2);

    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 5;
    ctx.fillStyle = '#434343';
    ctx.fillRect(
      geom.width * 0.7,
      geom.height * 0.6,
      geom.width,
      geom.height * 1.2
    );

    ctx.shadowOffsetY = 0;
    ctx.fillStyle = '#2b2b2b';
    ctx.fillRect(0, geom.height * 0.6, geom.width * 0.8, geom.height * 1.2);

    ctx.shadowBlur = 60;
    ctx.shadowOffsetX = 20;
    ctx.fillRect(0, -geom.height * 0.2, geom.width * 0.5, geom.height * 2);

    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.fillStyle = '#434343';
    ctx.fillRect(
      -geom.width * 0.15,
      geom.height * 0.3,
      geom.width * 0.2,
      geom.height * 1.2
    );

    ctx.fillStyle = '#2f2f2f';
    ctx.fillRect(
      -geom.width * 0.1,
      geom.height * 0.4,
      geom.width * 0.08,
      geom.height * 1.2
    );
  }
}

registerPaint('material-bg', MaterialBackgroundPaint);
