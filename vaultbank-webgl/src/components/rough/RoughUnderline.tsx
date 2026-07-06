import React, { useEffect, useRef, useState } from 'react'
import rough from 'roughjs'
export const RoughUnderline: React.FC<any> = ({children,stroke='#f0b429',strokeWidth=2.5,roughness=1.5,className='',offset=4})=>{
  const textRef=useRef<HTMLSpanElement>(null);const canvasRef=useRef<HTMLCanvasElement>(null);const [w,setW]=useState(0)
  useEffect(()=>{if(textRef.current)setW(textRef.current.offsetWidth)},[children])
  useEffect(()=>{if(!canvasRef.current||!w)return;const c=canvasRef.current;const dpr=window.devicePixelRatio||1;c.width=(w+10)*dpr;c.height=14*dpr;c.style.width=w+10+'px';c.style.height='14px';const ctx=c.getContext('2d');if(!ctx)return;ctx.setTransform(1,0,0,1,0,0);ctx.scale(dpr,dpr);ctx.clearRect(0,0,w+10,14);rough.canvas(c).line(0,6,w,6,{stroke,strokeWidth,roughness})},[w,stroke,strokeWidth,roughness])
  return <span className={`relative inline-block ${className}`}><span ref={textRef}>{children}</span><canvas ref={canvasRef} className="pointer-events-none absolute left-0" style={{bottom:-offset}}/></span>
}
