import React, { useEffect, useRef, useState } from 'react'
import rough from 'roughjs'
export const RoughDivider: React.FC<any> = ({className='',stroke='#d9e2ec',strokeWidth=0.8,roughness=1.2})=>{
  const canvasRef=useRef<HTMLCanvasElement>(null);const containerRef=useRef<HTMLDivElement>(null);const [width,setWidth]=useState(0)
  useEffect(()=>{const u=()=>containerRef.current&&setWidth(containerRef.current.getBoundingClientRect().width);u();const o=new ResizeObserver(u);if(containerRef.current)o.observe(containerRef.current);return()=>o.disconnect()},[])
  useEffect(()=>{if(!canvasRef.current||!width)return;const c=canvasRef.current;const dpr=window.devicePixelRatio||1;c.width=width*dpr;c.height=16*dpr;c.style.width=width+'px';c.style.height='16px';const ctx=c.getContext('2d');if(!ctx)return;ctx.setTransform(1,0,0,1,0,0);ctx.scale(dpr,dpr);ctx.clearRect(0,0,width,16);rough.canvas(c).line(0,8,width,8,{stroke,strokeWidth,roughness})},[width,stroke,strokeWidth,roughness])
  return <div ref={containerRef} className={`w-full ${className}`}><canvas ref={canvasRef} className="w-full"/></div>
}
