import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';

/**
 * https://baike.baidu.com/item/A4%E7%BA%B8/5080411
 * A4纸 210mm x 29.7mm
 * 
 * https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Values_and_units
 * 1in = 2.54cm = 96px = 72pt
 * 1pt = 1/72th of 1in
 */
const A4_WIDTH = 21 / 2.54 * 72
const A4_HEIGHT = 29.7 / 2.54 * 72
console.log(A4_WIDTH,A4_HEIGHT)
/**
 * 导出PDF 
 * @param {导出后的文件名} filename 
 * @param {要导出的dom节点：react使用ref} ele 
 */
export const exportPDF = async (filename, ele) => {
  // 生成pdf 类似于打印，对应到真是世界的像素点 及物理像素
  // 根据dpi放大，防止图片模糊
  const scale = window.devicePixelRatio > 1 ? window.devicePixelRatio : 2;
  // 下载尺寸 a4 纸 比例
  let pdf = new jsPDF('p', 'pt', 'a4');
  // 逻辑像素
  let width = ele.offsetWidth;
  let height = ele.offsetHeight;

  console.log('height', height)
  console.log('aa', width, height, scale)

  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  var contentWidth = canvas.width;
  var contentHeight = canvas.height;

  console.log('contentWidth', contentWidth, contentHeight)
  //一页pdf显示html页面生成的canvas高度;
  var pageHeight = contentWidth / A4_WIDTH * A4_HEIGHT;
  //未生成pdf的html页面高度
  var leftHeight = contentHeight;
  console.log('leftHeight', leftHeight)
  //页面偏移
  var position = 0;
  //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
  var imgWidth = A4_WIDTH;
  var imgHeight = A4_WIDTH / contentWidth * contentHeight;
  const pdfCanvas = await html2canvas(ele, {
    useCORS: true,
    canvas,
    scale,
    width,
    height,
    x: 0,
    y: 0,
  });
  const imgDataUrl = pdfCanvas.toDataURL();

  // if (height > 14400) { // 超出jspdf高度限制时
  //   const ratio = 14400 / height;
  //   // height = 14400;
  //   width = width * ratio;
  // }

  // 缩放为 a4 大小  pdfpdf.internal.pageSize 
  const pdfWidth = pdf.internal.pageSize.getWidth()
  console.log('pdfWidth',pdfWidth)
  height = height * pdfWidth / width;
  width = pdfWidth;
  if (leftHeight < pageHeight) {
    pdf.addImage(imgDataUrl, 'png', 0, 0, imgWidth, imgHeight);
  } else {    // 分页
    while (leftHeight > 0) {
      pdf.addImage(imgDataUrl, 'png', 0, position, imgWidth, imgHeight)
      leftHeight -= pageHeight;
      position -= A4_HEIGHT;
      //避免添加空白页
      if (leftHeight > 0) {
        pdf.addPage();
      }
    }
  }
  // 导出下载 
  await pdf.save(`${filename}.pdf`);
}