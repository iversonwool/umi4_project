import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import * as echarts from 'echarts' 
import demoimg from '@/assets/yay.jpg'
import { exportPDF } from '@/utils/pdfUtil'
import { useManualFn } from '@/hooks/func'

const HelloWorld = forwardRef(function HelloWorld(props, ref) {
  const divRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  
  useImperativeHandle(ref, () => divRef.current, )


  useEffect(()=> {
    const instance = echarts.init(chartRef.current)
    instance.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    })
  }, [])
  useEffect(() => {
    console.log("chartRef.current?.offsetWidth", chartRef.current?.offsetWidth)
    console.log("chartRef.current?.style.width", chartRef.current?.style.width)
  })
  return (
    <div ref={divRef} style={{textAlign: 'center'}}>
      <h2>test pdf component</h2>
      <img src={demoimg}  />

      <div ref={chartRef} style={{height: 1900, padding: 3}} />
      <h2>test pdf component</h2>
      <img src={demoimg}  />

    </div>
  )
})


const Pdfpg = () => {
  const cRef = useRef()
  const {loading, run} = useManualFn(exportPDF)
  const onExport = () => {
    run('pdfdemo', cRef.current)
  }
  console.log('loading', loading)
  return (
    <div>
      pdf playground
      <HelloWorld ref={cRef} />
      <button onClick={onExport}>导出pdf文件</button>
    </div>
  )
}

export default Pdfpg