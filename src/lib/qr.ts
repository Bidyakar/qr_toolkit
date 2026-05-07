export function downloadQR(
id: string,
format: 'png' | 'svg',
filename: string = 'qrcode')
{
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  const svg = document.getElementById(id) as unknown as SVGSVGElement;

  if (format === 'png' && canvas) {
    const pngUrl = canvas.
    toDataURL('image/png').
    replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${filename}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } else if (format === 'svg' && svg) {
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `${filename}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  }
}