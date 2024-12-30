import { loadAMapAsync } from "@/utils/amap";
import { useEffect } from "react";

const AMapPlayground = () => {

  useEffect(() => {
    (async () => {
      await loadAMapAsync()
      console.log('---', window.AMap)
    })()
  },  [])
  return (
    <div>
      <p>This is umi docs.</p>
    </div>
  );
};

export default AMapPlayground;
