// let AMap = null;
import AMapLoader from '@amap/amap-jsapi-loader'
// import {} from 
// import react from 'reac'
// import L from '@types/amap-js-api'
// import s from '@types/amap-js-api'

interface AMapInitConfig {
  plugins?: string[]; //插件列表
    // 是否加载 AMapUI，缺省不加载
  AMapUI?: {
      version?: string; // AMapUI 缺省 1.1
      plugins?: string[]; // 需要加载的 AMapUI ui插件
  };
  // 是否加载 Loca， 缺省不加载
  Loca?: {
      version?: string; // Loca 版本，缺省 1.3.2
  };
}

export function loadAMapAsync(options?: AMapInitConfig): Promise<void>  {
  
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve()
    } else {
      // const script = document.createElement('script');
      // script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=0e1108abb8eadf5384bcfd0db7be2813'
      // script.onload = () => {
      //   resolve()
      // }
      // document.head.append(script)
      AMapLoader.load({
        key: '0e1108abb8eadf5384bcfd0db7be2813',
        version: '1.4.5',
        ...options
      }).then(() => {
        resolve()
      })
    }
  })
}