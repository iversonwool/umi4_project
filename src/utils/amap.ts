// let AMap = null;
export function loadAMapAsync(): Promise<void>  {

  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve()
    } else {
      const script = document.createElement('script');
      script.src = 'https://webapi.amap.com/maps?v=2.0&key=0e1108abb8eadf5384bcfd0db7be2813'
      script.onload = () => {
        resolve()
      }
      document.head.append(script)
    }
  })
}