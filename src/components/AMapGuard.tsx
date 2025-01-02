import React,{PropsWithChildren, useEffect, useState} from 'react'
// import AMapLoader from '@amap/amap-jsapi-loader'
import { loadAMapAsync } from '@/utils/amap'
// window._AMapSecurityConfig = {
//   securityJsCode: "fbb75a3d57ac91768ca45bab9ec2295b",
//   serviceHost: "http://localhost/_AMapService"
// };
enum LoadStatus {
  NOT_LOADED,
  LOADING,
  LOADED_SUCCESS,
  LOADED_FAIL
}

type GuardProps = {
  component: React.ComponentType<any>
  props?: any;
}

const AMapGuard:React.FC<GuardProps> = (props) => {

  
  const {component:Component} = props

  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.NOT_LOADED)

  useEffect(() => {
    async function init() {

      try {
        setLoadStatus(LoadStatus.LOADING)

        const AMap = await loadAMapAsync()
        setLoadStatus(LoadStatus.LOADED_SUCCESS)

      } catch (error) {
        console.log('error', error)
        setLoadStatus(LoadStatus.LOADED_FAIL)
      }
    }
    init()
  }, [])

  return (
    <>
      {loadStatus === LoadStatus.LOADING || loadStatus === LoadStatus.NOT_LOADED
        ? 'Map Loading...'
        : LoadStatus.LOADED_SUCCESS === loadStatus
          ? <Component AMap={AMap} {...props} />
          : 'Map Loaded Error!'}
    </>
  )
}

export default AMapGuard