import { useEffect } from "react";
import AMapGuard from "@/components/AMapGuard";

function Demo(props) {
  const {AMap} = props
  return <div>hee</div>
}

const AMapPlayground = () => {

  

  console.log('window', window.AMap)
  return (
    <AMapGuard component={Demo}>
      
    </AMapGuard>
  );
};

export default AMapPlayground;
